"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";


const page = () => {
    const router = useRouter();

  return (
    <>
    <Navbar centerLogo showAuthButtons={false}/>
    
    <div className="min-h-screen flex items-center justify-center">
        

        <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="absolute top-4 left-4">
            <ArrowLeft className="h-5 w-5" />
        </Button>

        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <Input placeholder="Full Name" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button className="w-full">Create Account</Button>

                {/* <Button className="w-full">
                    <Link href={"/"}>Back</Link>
                </Button> */}

            </CardContent>
        </Card>
    </div>
    </>
  )
}

export default page
