"use client";

import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      className="w-full flex items-center justify-between p-2"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
    >
      <Link href="/">
        <Image
          src="/logo-black.jpg"
          alt="logo"
          width={150}
          height={5}
          className="dark:invert"
        />
      </Link>
      <div className="flex px-5 space-x-2 items-center">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </motion.div>
  );
};

export default Header;
