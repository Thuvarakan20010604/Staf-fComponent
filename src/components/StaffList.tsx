"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemovBtn from "./RemovBtn";
import Navbar from "./Navbar";

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
    return { staffs: [] }; // Return empty array if error occurs
  }
};

const StaffList = () => {
  const [staffs, setStaffs] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredStaffs, setFilteredStaffs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStaffs();
      setStaffs(data.staffs);
      setFilteredStaffs(data.staffs); // Initially show all staffs
    };
    fetchData();
  }, []);

  // Filter staff list based on search input
  useEffect(() => {
    const filtered = staffs.filter((staff) =>
      staff.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchInput, staffs]);

  return (
    
    <div className="p-4">
        <Navbar/>
        <br/>
      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <input
            type="text"
            className="w-[50%] h-10 p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-white-500"
        placeholder="Search staff..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
  />
</div>

    <br/>
      {/* Staff List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStaffs.length > 0 ? (
          filteredStaffs.map((staff) => (
            <div
              key={staff._id}
              className="p-4 border border-gray-300 rounded-md shadow-sm bg-black text-white"
            >
              <h3 className="font-semibold text-xl">{staff.name}</h3>
              <p><strong>EId:</strong> {staff.EId}</p>
              <p><strong>Email:</strong> {staff.email}</p>
              <p><strong>Age:</strong> {staff.age}</p>
              <p><strong>Role:</strong> {staff.role}</p>
              <p><strong>JoinAt:</strong> {staff.joinDate}</p>
              <p><strong>Qualification:</strong> {staff.qualification}</p>
              <p><strong>Salary:</strong> {staff.salary}</p>
              <p><strong>Tax:</strong> {staff.tax}</p>
              <p><strong>Total Salary:</strong> {staff.salary - staff.tax}</p>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-3">
                <RemovBtn id={staff._id} />
                <Link href={`/editDetails/${staff._id}`} className="text-blue-500 hover:text-blue-700">
                  <HiPencilAlt size={24} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No matching staff found.</p>
        )}
      </div>
    </div>
  );
};

export default StaffList;
