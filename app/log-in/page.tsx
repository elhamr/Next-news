"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/app/store/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (email === "admin@test.com" && password === "123456") {
      dispatch(
        loginSuccess({
          user: {
            email,
            favorites: [],
            role:"admin", 
          },
          token: "fake-jwt-token",
        })
      );
      router.push("/admin");
      
    } else {
      dispatch(
        loginSuccess({
          user: {
            email,
            favorites:[],
            role:"user",
          },
          token:"user-token",
        })
      );
      router.push("/")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        className="absolute top-4 left-4"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
