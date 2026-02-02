"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const error = searchParams.get("error");
  
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(
    error === "auth_callback_error" ? "Authentication failed. Please try again." : null
  );

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setFormError(null);

    if (redirectTo) {
      formData.set("redirect", redirectTo);
    }

    const result = await login(formData);
    
    if (result?.error) {
      setFormError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your Match_Research account
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {formError && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {formError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link href="/join" className="text-primary hover:underline">
              Join now
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Suspense
        fallback={
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Loading...</CardDescription>
            </CardHeader>
          </Card>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
