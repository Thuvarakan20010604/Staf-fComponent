"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="bg-gray-900 text-white py-4 shadow-md">
      <nav className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between px-15 py-4 bg-black shadow-md rounded-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-200">Staff Details</h1>

        {/* Button */}
        <button
          onClick={() => router.push("/AddStaff")} // Redirect to AddStaff page
          className="mt-3 sm:mt-0 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-300 transition duration-300 shadow-md"
        >
          Add Staff
        </button>
      </nav>
    </div>
  );
}
