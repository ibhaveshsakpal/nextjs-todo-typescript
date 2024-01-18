import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-tl from-cyan-500 to-cyan-800 text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/check-list.png" className="h-8" alt="Todo Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            To Do
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
