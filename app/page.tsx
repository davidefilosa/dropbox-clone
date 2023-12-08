"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const variants = {
  hidden: { opacity: 0, y: 25 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 25 },
};

const variants_bg = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Home() {
  const [clicked, setClicked] = useState(false);
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <main>
        <motion.div
          key="bg"
          className="flex flex-col md:flex-row items-center bg-[#1E1919] dark:bg-slate-800"
          variants={variants_bg}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="p-10 flex flex-col bg-[#282929] dark:bg-slate-800 text-white spacey-y-5">
            <motion.h1
              key="title"
              className="text-5xl font-bold"
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ duration: 1 }}
            >
              Welcome to FileHive.
              <br />
              <br /> Storing everything you and your business needs. All in one
              place.
            </motion.h1>
            <motion.p
              className="pb-20"
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ duration: 1 }}
              key="subtitle"
            >
              FileHive is a robust file management system designed for secure
              storage and organization. It offers customizable features for
              categorizing and managing files efficiently. With strict access
              controls and cross-platform functionality, it ensures data remains
              protected while allowing seamless access across devices.
            </motion.p>
            <motion.div
              key="callToAction"
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{ duration: 1, delay: 0.75 }}
            >
              <Link
                href="/dashboard"
                className="flex p-5 w-fit bg-[#0074d9] hover:bg-[#0074d9]/80 transition"
              >
                Try it for free! <ArrowRight className="ml-10 " />
              </Link>
            </motion.div>
          </div>
          <motion.div
            key="video"
            className="bg-[#1E1919] dark:bg-slate-800 h-full p-10"
            variants={variants_bg}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ duration: 2, delay: 0.5 }}
          >
            <video autoPlay muted className="rounded-lg" loop>
              <source src="/video-home.mp4" type="video/mp4" />
              Your browser does not support video tag.
            </video>
          </motion.div>
        </motion.div>
        <motion.p
          key="disclaimerTitle"
          className="text-center font-bold text-xl pt-5"
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ duration: 1 }}
        >
          Disclaimer
        </motion.p>
        <motion.p
          className="text-center font-light p-2"
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ duration: 1 }}
          key="disclaimer"
        >
          FileHive is a project developed solely for educational purposes and to
          showcase coding skills. It is not associated with any real company or
          commercial entity. Users are advised that any files uploaded or shared
          on this platform are solely their responsibility. The creator of
          FileHive holds no liability for the content, usage, or consequences
          related to the files shared within this demonstration. Users are
          encouraged to use this platform responsibly and understand that any
          actions taken with their uploaded files are their own responsibility.
        </motion.p>
      </main>
    </AnimatePresence>
  );
}
