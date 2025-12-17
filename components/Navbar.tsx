"use client";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import Image from "next/image";


interface NavbarProps {
  centerLogo?: boolean;
  showAuthButtons?: boolean;
}

const Navbar : React.FC<NavbarProps> = ({
  centerLogo = false,
  showAuthButtons = true,
}) => (

    <nav className={`flex items-center px-6 py-4 border-b ${centerLogo ? "justify-center" : "justify-between"}`}>
        
        {/*  logo */}
         <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="RapidWire Logo"
              width={50}
              height={50}
              priority
            />
        {/* <span className="text-xl font-bold">RapidWire</span> */}
        </Link>

        {/* log in and sign up bottom 
        and i used props for using Navbar in Dynamic mode*/ }
        {!centerLogo && showAuthButtons &&(
          <div className="flex gap-3">

              <Button asChild variant="outline">
                  <Link href={"/log-in"}>Log In</Link>
              </Button>

              <Button asChild>
                  <Link href={"/sign-up"}>Sign up</Link>
              </Button>

          </div>
        )}

    </nav>
);


export default Navbar
