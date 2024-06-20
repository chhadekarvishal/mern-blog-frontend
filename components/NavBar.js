"use client";
import React from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { removeToken } from "@/utils/authToken";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/auth/login");
    removeToken();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <span className="text-white text-xl font-bold">EZZY Blog</span>
          </Link>
        </div>
        <div className="flex space-x-4">
          <NavLink href="/blogs" text="Blogs" />
          <NavLink href="/contact" text="About" />
          {/* <NavLink href="/auth/signup" text="Signup" /> */}
          {isAuthenticated ? (
            <>
              <NavLink href="/profile" text="Profile" />
              <button
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink href="/auth/login" text="Login" />
              <NavLink href="/auth/signup" text="Signup" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, text }) => {
  return (
    <Link href={href}>
      <span className="text-white hover:text-gray-300">{text}</span>
    </Link>
  );
};

export default NavBar;
