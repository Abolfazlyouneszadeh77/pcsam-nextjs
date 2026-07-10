"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import React from "react";

const ProfileBtn = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    startTransition(() => {
      router.push("/profile");
    });
  };

  return (
    <>
      <Link
        href="/profile"
        onClick={handleClick}
        className="p-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-[0px_2px_5px_0_rgba(0,0,0,0.2)] dark:hover:bg-gray-800 transition-all ease-in-out duration-200"
      >
        <FaUser size="20px" />
      </Link>

      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}
    </>
  );
};

export default ProfileBtn;
