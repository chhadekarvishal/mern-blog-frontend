"use client";
import React from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { removeToken } from "@/utils/authToken";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";

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
        <div className="flex space-x-4 items-center">
          <NavLink href="/" text="Blogs" />
          <NavLink href="/" text="About" />
          {/* <NavLink href="/auth/signup" text="Signup" /> */}
          {isAuthenticated ? (
            <>
              <NavLink href="/" text="Profile" />
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
          <div>
            <ThemeSwitcher />
          </div>
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
