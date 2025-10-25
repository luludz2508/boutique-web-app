/**
 * Products API Route
 * 
 * GET /api/products - Fetch all products
 * Query params:
 *   - brand: Filter by brand
 *   - type: Filter by product type
 *   - search: Search keyword
 *   - featured: Get featured products only
 */

import { NextResponse } from 'next/server';
import { 
  getAllProducts, 
  getProductsByBrand, 
  getProductsByType, 
  searchProducts,
  getFeaturedProducts 
} from '@/lib/db/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const brand = searchParams.get('brand');
  const type = searchParams.get('type');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');

  try {
    let products;

    if (featured === 'true') {
      products = await getFeaturedProducts();
    } else if (brand) {
      products = await getProductsByBrand(brand);
    } else if (type) {
      products = await getProductsByType(type);
    } else if (search) {
      products = await searchProducts(search);
    } else {
      products = await getAllProducts();
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}


