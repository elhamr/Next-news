"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { logout } from "@/app/store/authSlice";
import { toggleTheme } from "@/app/store/themeSlice";

interface NavbarProps {
  centerLogo?: boolean;
  showAuthButtons?: boolean;
}

const Navbar : React.FC<NavbarProps> = ({
  centerLogo = false,
  showAuthButtons = true,
}) => {
  const dispatch = useDispatch();
  
  const isDark = useSelector((state: RootState) => state.theme.isDark)
  const handleThemeToggle = () => {
    dispatch(toggleTheme())
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', !isDark ? 'dark' : 'light')
  }
  const {isAuthenticated, user} = useSelector(
    (state: RootState) => state.auth
  );

  return(
    <nav className={`flex items-center px-6 py-4 border-b 
      ${centerLogo ? "justify-center" : "justify-between"}`}>
        
        {/*  logo */}
         <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="RapidWire Logo"
              width={50}
              height={50}
              priority
            />
        </Link>

        {/* log in and sign up bottom 
        and i used props for using Navbar in Dynamic mode*/ }
        {!centerLogo && showAuthButtons &&(
          <>
          <div className="flex gap-3">
          <Button
                  onClick={handleThemeToggle}
                  >
              {isDark ? '☀️' : '🌙'}
               </Button>
            {!isAuthenticated ? (
              <div className="flex gap-3">
 
               
                <Button asChild variant="outline">
                  <Link href="/log-in">Log In</Link>
                </Button>

                <Button asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </div>
            ):(
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/avatar.png"/>
                    <AvatarFallback>
                      {user?.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">

                  <DropdownMenuItem asChild>
                    <Link href="/profile">Edit profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => dispatch(logout())}>

                      Log out
                  </DropdownMenuItem>

                </DropdownMenuContent>

              </DropdownMenu>
            )}
           </div>
          </>
        )}
    </nav>
  );
};


export default Navbar
