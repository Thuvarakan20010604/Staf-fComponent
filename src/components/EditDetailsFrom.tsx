"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

interface EditDetailsProps {
  id: string;
  name: string;
  EId: string;
  email: string;
  age: number;
  role: string;
  joinDate: string;
  qualification: string;
  salary: number;
  tax: number;
}

const EditDetailsFrom: React.FC<EditDetailsProps> = ({
  id,
  name,
  EId,
  email,
  age,
  role,
  joinDate,
  qualification,
  salary,
  tax,
}) => {
  // Local state to handle form values
  const [formData, setFormData] = useState({
    name,
    EId,
    email,
    age,
    role,
    joinDate,
    qualification,
    salary,
    tax,
  });
const router =useRouter();
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update staff details");
      }
      router.push("/");

      alert("Staff details updated successfully!");
    } catch (error) {
      console.error("Error updating staff details:", error);
      alert("Error updating staff details. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-black shadow-md rounded-lg border border-slate-300"
      >
        <h2 className="text-xl font-semibold mb-4 text-white">
          Employee Details
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium text-white">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter name"
          />
        </div>

        {/* Employee ID */}
        <div className="mb-4">
          <label className="block font-medium text-white">Employee ID</label>
          <input
            type="text"
            name="EId"
            value={formData.EId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter EID"
            disabled
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block font-medium text-white">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter age"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter email"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block font-medium text-white">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter role"
          />
        </div>

        {/* Join Date */}
        <div className="mb-4">
          <label className="block font-medium text-white">Join Date</label>
          <input
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Qualification */}
        <div className="mb-4">
          <label className="block font-medium text-white">Qualification</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter qualification"
          />
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block font-medium text-white">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter salary"
          />
        </div>

        {/* Tax */}
        <div className="mb-4">
          <label className="block font-medium text-white">Tax (%)</label>
          <input
            type="number"
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter tax percentage"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Staff Details
        </button>
      </form>
    </div>
  );
};

export default EditDetailsFrom;
