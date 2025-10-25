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
    <div className="min-h-screen bg-neutral-900 text-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto border-red-500 bg-neutral-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              Có lỗi xảy ra!
            </CardTitle>
            <CardDescription className="text-neutral-300">
              Không thể tải danh sách sản phẩm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-neutral-700 rounded-lg">
              <p className="text-sm font-mono text-neutral-300">
                {error.message || "Lỗi không xác định"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={reset} className="bg-primary-600 hover:bg-primary-700 text-white">
                Thử lại
              </Button>
              <Button variant="outline" asChild className="bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700">
                <a href="/test-db">Kiểm tra kết nối cơ sở dữ liệu</a>
              </Button>
            </div>

            <div className="text-sm text-neutral-400">
              <p className="font-semibold mb-2 text-neutral-200">Các bước khắc phục:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Kiểm tra file{" "}
                  <code className="bg-neutral-700 px-1 rounded text-neutral-200">.env.local</code> có tồn tại
                </li>
                <li>Xác minh thông tin Supabase chính xác</li>
                <li>
                  Kiểm tra kết nối tại{" "}
                  <code className="bg-neutral-700 px-1 rounded text-neutral-200">/test-db</code>
                </li>
                <li>Kiểm tra console trình duyệt để biết thêm chi tiết</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

