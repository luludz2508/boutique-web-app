-- 003_admin.sql — admin page: specs, slug redirects, audit log, transactional save, read-only anon.
-- Safe to run more than once.

-- ── Columns ────────────────────────────────────────────────────────────────
alter table products add column if not exists specs jsonb not null default '[]'::jsonb;
alter table products add column if not exists admin_edited_at timestamptz;
alter table product_variants add column if not exists admin_edited_at timestamptz;

-- ── Old URLs of renamed products ───────────────────────────────────────────
create table if not exists product_slug_redirects (
  old_slug text primary key,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists idx_slug_redirects_product on product_slug_redirects(product_id);

-- ── Who changed what ───────────────────────────────────────────────────────
create table if not exists admin_audit (
  id bigserial primary key,
  at timestamptz not null default now(),
  email text not null,
  action text not null,
  product_id uuid,
  changes jsonb not null default '{}'::jsonb
);
create index if not exists idx_admin_audit_product on admin_audit(product_id, at desc);

-- ── Row level security: the anon key can only read what the shop shows ─────
alter table products enable row level security;
alter table product_variants enable row level security;
alter table product_images enable row level security;
alter table product_attributes enable row level security;
alter table product_certificates enable row level security;
alter table categories enable row level security;
alter table product_slug_redirects enable row level security;
alter table admin_audit enable row level security;

drop policy if exists "read published products" on products;
create policy "read published products" on products
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "read variants of published products" on product_variants;
create policy "read variants of published products" on product_variants
  for select to anon, authenticated
  using (exists (select 1 from products p where p.id = product_id and p.status = 'published'));

drop policy if exists "read images of published products" on product_images;
create policy "read images of published products" on product_images
  for select to anon, authenticated
  using (exists (select 1 from products p where p.id = product_id and p.status = 'published'));

drop policy if exists "read attributes of published products" on product_attributes;
create policy "read attributes of published products" on product_attributes
  for select to anon, authenticated
  using (exists (select 1 from products p where p.id = product_id and p.status = 'published'));

drop policy if exists "read certificates of published products" on product_certificates;
create policy "read certificates of published products" on product_certificates
  for select to anon, authenticated
  using (exists (select 1 from products p where p.id = product_id and p.status = 'published'));

drop policy if exists "read categories" on categories;
create policy "read categories" on categories
  for select to anon, authenticated
  using (true);

drop policy if exists "read slug redirects" on product_slug_redirects;
create policy "read slug redirects" on product_slug_redirects
  for select to anon, authenticated
  using (true);

-- admin_audit: no policies → only the service role can read or write it.
-- No insert/update/delete policies anywhere → browser writes are refused.

-- ── Concurrency token: newest change to the product or any of its variants ─
create or replace function public.admin_product_version(p_id uuid)
returns timestamptz
language sql stable
set search_path = public
as $$
  select greatest(
    (select updated_at from products where id = p_id),
    (select max(updated_at) from product_variants where product_id = p_id)
  );
$$;

-- ── Save a whole product in one transaction ────────────────────────────────
-- payload: { id?, expected_updated_at?, email,
--            product: { name_vi, slug, product_type, status, featured, excerpt_vi, description_vi, specs },
--            variants: [{ id?, option1_value, price, compare_at_price, sku, inventory_quantity, track_inventory }],
--            image_order: [image uuid] }
create or replace function public.admin_save_product(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid := nullif(payload->>'id', '')::uuid;
  v_expected timestamptz := nullif(payload->>'expected_updated_at', '')::timestamptz;
  p jsonb := payload->'product';
  v_variants jsonb := coalesce(payload->'variants', '[]'::jsonb);
  v_images jsonb := coalesce(payload->'image_order', '[]'::jsonb);
  v_new_slug text := p->>'slug';
  v_old_slug text := null;
  v_current_slug text;
  v_version timestamptz;
  v_option1_name text;
  v_keep uuid[];
  v_ids uuid[] := '{}';
  v jsonb;
  v_vid uuid;
  i int;
begin
  if v_new_slug is null or v_new_slug = '' then
    raise exception 'slug is required';
  end if;
  if jsonb_array_length(v_variants) = 0 then
    raise exception 'at least one variant is required';
  end if;

  if v_id is not null then
    select slug into v_current_slug from products where id = v_id for update;
    if not found then
      raise exception 'product % not found', v_id;
    end if;
    -- lock the variants too, so an inline price edit can't slip in between check and write
    perform 1 from product_variants where product_id = v_id for update;

    v_version := admin_product_version(v_id);
    if v_expected is not null and v_version > v_expected then
      return jsonb_build_object('conflict', true, 'updated_at', v_version);
    end if;

    if v_current_slug <> v_new_slug then
      v_old_slug := v_current_slug;
      insert into product_slug_redirects (old_slug, product_id)
        values (v_old_slug, v_id)
        on conflict (old_slug) do nothing;
    end if;
    delete from product_slug_redirects where old_slug = v_new_slug;

    update products set
      name_vi = p->>'name_vi',
      slug = v_new_slug,
      product_type = nullif(p->>'product_type', ''),
      status = (p->>'status')::product_status,
      featured = coalesce((p->>'featured')::boolean, false),
      excerpt_vi = nullif(p->>'excerpt_vi', ''),
      description_vi = p->>'description_vi',
      specs = coalesce(p->'specs', '[]'::jsonb),
      admin_edited_at = now()
    where id = v_id;
  else
    delete from product_slug_redirects where old_slug = v_new_slug;
    insert into products (name_vi, slug, product_type, status, featured, excerpt_vi, description_vi, specs, admin_edited_at)
    values (
      p->>'name_vi',
      v_new_slug,
      nullif(p->>'product_type', ''),
      coalesce(p->>'status', 'draft')::product_status,
      coalesce((p->>'featured')::boolean, false),
      nullif(p->>'excerpt_vi', ''),
      p->>'description_vi',
      coalesce(p->'specs', '[]'::jsonb),
      now()
    )
    returning id into v_id;
  end if;

  -- variants: drop rows no longer in the form, update the rest, insert new ones
  select option1_name into v_option1_name
    from product_variants where product_id = v_id
    order by position limit 1;
  v_option1_name := coalesce(v_option1_name, 'Phiên bản');

  select coalesce(array_agg((e->>'id')::uuid), '{}')
    into v_keep
    from jsonb_array_elements(v_variants) e
    where coalesce(e->>'id', '') <> '';

  delete from product_variants where product_id = v_id and not (id = any (v_keep));

  for i in 0 .. jsonb_array_length(v_variants) - 1 loop
    v := v_variants->i;
    v_vid := nullif(v->>'id', '')::uuid;
    if v_vid is not null then
      update product_variants set
        option1_value = v->>'option1_value',
        price = (v->>'price')::numeric,
        compare_at_price = (v->>'compare_at_price')::numeric,
        sku = nullif(v->>'sku', ''),
        inventory_quantity = (v->>'inventory_quantity')::int,
        track_inventory = coalesce((v->>'track_inventory')::boolean, true),
        position = i,
        admin_edited_at = now()
      where id = v_vid and product_id = v_id;
      if not found then
        raise exception 'variant % does not belong to product %', v_vid, v_id;
      end if;
      v_ids := v_ids || v_vid;
    else
      insert into product_variants (product_id, option1_name, option1_value, price, compare_at_price, sku,
                                    inventory_quantity, track_inventory, position, admin_edited_at)
      values (v_id, v_option1_name, v->>'option1_value', (v->>'price')::numeric, (v->>'compare_at_price')::numeric,
              nullif(v->>'sku', ''), (v->>'inventory_quantity')::int,
              coalesce((v->>'track_inventory')::boolean, true), i, now())
      returning id into v_vid;
      v_ids := v_ids || v_vid;
    end if;
  end loop;

  -- photo order: first photo is the main one
  if jsonb_array_length(v_images) > 0 then
    update product_images set is_primary = false where product_id = v_id;
    for i in 0 .. jsonb_array_length(v_images) - 1 loop
      update product_images
        set position = i, is_primary = (i = 0)
        where id = (v_images->>i)::uuid and product_id = v_id;
    end loop;
  end if;

  return jsonb_build_object(
    'id', v_id,
    'slug', v_new_slug,
    'old_slug', v_old_slug,
    'variant_ids', to_jsonb(v_ids),
    'updated_at', admin_product_version(v_id)
  );
end;
$$;

revoke all on function public.admin_save_product(jsonb) from public, anon, authenticated;
grant execute on function public.admin_save_product(jsonb) to service_role;
revoke all on function public.admin_product_version(uuid) from public, anon, authenticated;
grant execute on function public.admin_product_version(uuid) to service_role;
