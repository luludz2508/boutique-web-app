"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Products page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Something went wrong!
          </CardTitle>
          <CardDescription>
            There was an error loading the products
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-mono text-muted-foreground">
              {error.message || "Unknown error"}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <a href="/test-db">Test Database Connection</a>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Troubleshooting steps:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Check if your{" "}
                <code className="bg-muted px-1 rounded">.env.local</code> file
                exists
              </li>
              <li>Verify Supabase credentials are correct</li>
              <li>
                Test connection at{" "}
                <code className="bg-muted px-1 rounded">/test-db</code>
              </li>
              <li>Check browser console for more details</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

