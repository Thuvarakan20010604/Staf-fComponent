"use client";

import React, { useState } from "react";
import RemovBtn from "@/components/RemovBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const SearchInput = () => {
  const [searchItem, setSearchItem] = useState<string>(""); // Controlled input
  const [result, setResult] = useState<any[]>([]); // Store search results
  const [error, setError] = useState<string>("");

  async function getResult() {
    if (!searchItem.trim()) return; // Prevent empty searches

    try {
      const res = await fetch(`/api/search?q=${searchItem}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to fetch results");
      }
    } catch (err) {
      setError("Server error, please try again");
      console.error(err);
    }
  }

  return (
    <div>
      <div className="text-center m-5">
        {/* Input with onChange */}
        <input
            type="text"
            name="search"
            id="search"
            className="shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline"
            placeholder="Search ..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
        />

         {/* Button calls getResult() */}
            <button
                className="mt-2 p-2 text-black bg-white hover:cursor-pointer rounded"
                onClick={getResult}
            >
                    <strong>SEARCH</strong>
            </button>
    </div>


      {/* Display search results */}
      <div className="text-center">
        {error && <p className="text-red-500">{error}</p>}
        {result.length > 0 ? (
          <ul className="mt-4">
            {result.map((staff: any, index: number) => (
             <div key={staff._id} className="p-2 w-64 border border-white-300 rounded-md shadow-sm bg-black">

             <h3 className="font-semibold text-xl">{staff.name}</h3><br/>

             <div className="text-left">
             <p><strong>EId:</strong> {staff.EId}</p>
             <p><strong>Email:</strong> {staff.email}</p>
             <p><strong>Age:</strong> {staff.age}</p>
             <p><strong>Role:</strong> {staff.role}</p>
             <p><strong>JoinAt:</strong> {staff.joinDate}</p>
             <p><strong>Qualification:</strong> {staff.qualification}</p>
             <p><strong>Salary:</strong> {staff.salary}</p>
             <p><strong>Tax:</strong> {staff.tax}</p>
             <p><strong>Total Salary:</strong> {staff.salary - staff.tax }</p>
             </div>

             {/* Action Buttons */}
             <div className="flex justify-between items-center mt-3">
                 <RemovBtn id={staff._id}/>
                 <Link href={`/editDetails/${staff._id}`} className="text-blue-500 hover:text-blue-700">
                     <HiPencilAlt size={24} />
                 </Link>
             </div>
         </div>
            ))}
          </ul>
        ) : (
          <p className="text-white">Staff List</p>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
