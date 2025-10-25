/**
 * Database Connection Test Page
 * Visit /test-db to verify your Supabase connection
 */

import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Database,
  Image as ImageIcon,
  Package,
} from "lucide-react";

export default async function TestDBPage() {
  const results = {
    connection: false,
    products: 0,
    variants: 0,
    images: 0,
    errors: [] as string[],
  };

  try {
    // Test 1: Check connection
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    if (productsError) {
      results.errors.push(`Products: ${productsError.message}`);
    } else {
      results.connection = true;
    }

    // Test 2: Count products
    const { count: productCount, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (countError) {
      results.errors.push(`Count products: ${countError.message}`);
    } else {
      results.products = productCount || 0;
    }

    // Test 3: Count variants
    const { count: variantCount } = await supabase
      .from("product_variants")
      .select("*", { count: "exact", head: true });

    results.variants = variantCount || 0;

    // Test 4: Count images
    const { count: imageCount } = await supabase
      .from("product_images")
      .select("*", { count: "exact", head: true });

    results.images = imageCount || 0;
  } catch (error) {
    results.errors.push(
      `Fatal error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Database Connection Test</h1>
        <p className="text-muted-foreground">
          Testing connection to Supabase and checking data integrity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {results.connection ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <span className="text-lg font-semibold text-green-500">
                    Connected
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-500" />
                  <span className="text-lg font-semibold text-red-500">
                    Failed
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Products Count */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{results.products}</div>
            <p className="text-sm text-muted-foreground">
              Total products in database
            </p>
          </CardContent>
        </Card>

        {/* Variants Count */}
        <Card>
          <CardHeader>
            <CardTitle>Product Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{results.variants}</div>
            <p className="text-sm text-muted-foreground">
              Total product variants
            </p>
          </CardContent>
        </Card>

        {/* Images Count */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Product Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{results.images}</div>
            <p className="text-sm text-muted-foreground">
              Total product images
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Environment Variables */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Environment Configuration</CardTitle>
          <CardDescription>Checking your .env.local settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">NEXT_PUBLIC_SUPABASE_URL</span>
            <Badge
              variant={
                process.env.NEXT_PUBLIC_SUPABASE_URL ? "default" : "destructive"
              }
            >
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
            <Badge
              variant={
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                  ? "default"
                  : "destructive"
              }
            >
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">SUPABASE_SERVICE_ROLE_KEY</span>
            <Badge
              variant={
                process.env.SUPABASE_SERVICE_ROLE_KEY ? "default" : "secondary"
              }
            >
              {process.env.SUPABASE_SERVICE_ROLE_KEY
                ? "Set"
                : "Not Set (Optional)"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Errors */}
      {results.errors.length > 0 && (
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Errors Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.errors.map((error, index) => (
                <li
                  key={index}
                  className="text-sm text-red-600 flex items-start gap-2"
                >
                  <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {results.connection && results.errors.length === 0 && (
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">
                  Everything looks good!
                </h3>
                <p className="text-sm text-green-700">
                  Your database is connected and has {results.products} products
                  with {results.variants} variants and {results.images} images.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Ready to View Products?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Your database is set up! Check out these pages:
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              View Products
            </a>
            <a
              href="/api/products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              API Response
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

