"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemovBtn from "./RemovBtn";
import Navbar from "./Navbar";
import { motion } from 'framer-motion';

// Tooltip component
const Tooltip = ({ text }: { text: string }) => (
  <div className="absolute bottom-full mb-2 hidden group-hover:flex px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap z-10">
    {text}
  </div>
);

const getStaffs = async () => {
  try {
    const res = await fetch("http://localhost:3000/api", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching staff data:", error);
    return { staffs: [] };
  }
};

const StaffList = () => {
  const [staffs, setStaffs] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredStaffs, setFilteredStaffs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getStaffs();
      setStaffs(data.staffs);
      setFilteredStaffs(data.staffs);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = staffs.filter((staff) =>
      staff.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchInput, staffs]);

  return (
    <div className="p-4 relative">
      <Navbar />
      <br />

      {/* Search Bar with Tooltip */}
      <div className="mb-4 flex items-center relative group w-[50%]">
        <Tooltip text="Search staff by name" />
        <input
          type="text"
          className="w-full h-10 p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-white-500"
          placeholder="Search staff..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <br />

      {loading ? (
        <div className="text-center text-gray-500 text-xl animate-pulse">
          Loading staff details...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStaffs.length > 0 ? (
            filteredStaffs.map((staff, index) => (
              <motion.div
                key={staff._id}
                className="relative p-4 border border-gray-300 rounded-md shadow-sm bg-black text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-white hover:text-black"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-3xl">{staff.name}</h3>
                <br />
                <p><strong>EId:</strong> {staff.EId}</p>
                <p><strong>Email:</strong> {staff.email}</p>
                <p><strong>Age:</strong> {staff.age}</p>
                <p><strong>Role:</strong> {staff.role}</p>
                <p><strong>JoinAt:</strong> {staff.joinDate}</p>
                <p><strong>Qualification:</strong> {staff.qualification}</p>
                <p><strong>Salary:</strong> {staff.salary}</p>
                <p><strong>Tax:</strong> {staff.tax}</p>
                <p><strong>Total Salary:</strong> {staff.salary - staff.tax}</p>

                {/* Action Buttons with Tooltips */}
                <div className="flex justify-between items-center mt-3">

                  {/* Remove Button with Tooltip */}
                  <div className="relative group">
                    <Tooltip text="Delete this staff member" />
                    <RemovBtn id={staff._id} />
                  </div>

                  {/* Edit Button with Tooltip */}
                  <div className="relative group">
                    <Tooltip text="Edit staff details" />
                    <Link href={`/editDetails/${staff._id}`} className="text-blue-500 hover:text-blue-700">
                      <HiPencilAlt size={24} />
                    </Link>
                  </div>

                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No matching staff found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffList;
