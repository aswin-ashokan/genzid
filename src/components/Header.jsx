"use client"
import React from "react";
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const Header = () => {
  const pathname = usePathname()
  return (
    <header className=".mx-auto lg:px-10 px-6 w-full flex justify-between text-white py-2 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] lugrasimo-regular">
      <div className="">
        <Link href="/"><h1 className="text-3xl">GenZid</h1></Link>
      </div>
      <div className="flex gap-6 text-lg items-center">
          <Link className={`link ${pathname === '/signin' ? 'active': ''}`} href="/signin">Signin</Link>
          <Link className={`link ${pathname === '/signup' ? 'active': ''}`} href="/signup">Signup</Link>
      </div>
    </header>
  );
};

export default Header;
