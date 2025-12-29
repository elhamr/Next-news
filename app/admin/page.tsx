"use client";

import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
    const router = useRouter();
    const {user, isAuthenticated} = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if(!isAuthenticated || user?.role !== "admin"){
            router.replace("/log-in");
        }
    }, [isAuthenticated,user,router]);

    return(
        <h1 className="text-x1 p-10">Admin Dashboard</h1>
    )
}