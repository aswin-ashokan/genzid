import React from "react";
import 'tailwindcss'

const Footer = () => {
  return (
    <footer className=".mx-auto px-4 fixed bottom-0 w-full text-white p-2 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <p className="text-center text-sm">&copy;{new Date().getFullYear()} Aswin.M.A. All rights reserved</p>
    </footer>
  );
};

export default Footer;
