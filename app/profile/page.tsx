"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { updateProfile } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/log-in");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  const [email, setEmail] = useState(user.email);
  const [favorites, setFavorites] = useState(user.favorites);

  const saveHandler = () => {
    dispatch(updateProfile({ email, favorites }));
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Edit Profile</h1>

      <Input value={email} onChange={(e) => setEmail(e.target.value)} />

      <Button onClick={saveHandler}>Save</Button>
    </div>
  );
}
