import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Mail, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@components/ui/alert";
import { useState } from "react";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { loginSchema } from "@schemas/auth";
import { login } from "@services/auth";

export const Route = createFileRoute("/(auth)/login/")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      console.error("Login error", error);
      // Set error message to display to the user
      setLoginError(
        error.message ||
          "Failed to sign in. Please check your credentials and try again."
      );
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setLoginError(""); // Clear any previous errors
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="py-6 px-8 border-b bg-background">
        <Link to="/" className="text-xl font-bold">
          Rolodex
        </Link>
      </header>

      <main className="container max-w-md py-12">
        <Card>
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loginError && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              className="pl-9"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              className="pl-9"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    mutation.isPending
                  }
                >
                  {mutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Create one
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
