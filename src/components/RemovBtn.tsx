"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const RemovBtn: React.FC<{ id: string }> = ({ id }) => {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (refresh) {
      // Reload the page when 'refresh' state changes to true
      window.location.reload(); // This will reload the entire page
    }
  }, [refresh]);

  const removeStaff = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
    setRefresh(true); // Set refresh to true to trigger page reload
  };

  return (
    <button
      onClick={removeStaff}
      className="text-white-400 hover:text-red-600 transition-colors duration-200"
    >
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemovBtn;
