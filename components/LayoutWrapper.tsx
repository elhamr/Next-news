"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/log-in" || pathname === "/sign-up";

  return (
    <>
      <Navbar
        centerLogo={isAuthPage}
        showAuthButtons={!isAuthPage}
      />

      {!isAuthPage && 
            <section className="flex justify-center mt-24">
            <SearchBar />
            </section>
        } 

      {children}
    </>
  );
}
