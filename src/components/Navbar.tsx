"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <nav>
        <h1 className="text-3xl font-bold">Staff Details</h1>
        <br />
        <button
          onClick={() => router.push("/AddStaff")} // Redirect to AddStaff page
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Staff
        </button>
      </nav>
    </div>
  );
}
