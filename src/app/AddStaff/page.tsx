"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


const AddStaffDetails = () => {
   
    const [name, setName] = useState("");
    const [EId, setEid] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(18);
    const [role, setRole] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [qualification, setQualification] = useState("");
    const [salary, setSalary] = useState(0);
    const [tax, setTax] = useState(0);

    const router=useRouter();

const handleSubmit=async(e:any)=>{
    e.preventDefault();
    if(!name || !EId || !email || !age || !role || !joinDate || !qualification || !salary || !tax)
    {
        alert("Please fill all the fields")
        return;
    }
    
    try {
        const res = await fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, EId, email, age, role, joinDate, qualification, salary, tax }),
        });
        if(res.ok){
            router.push("/");
        }else{
            throw new Error("Failed to add staff");
        }
    } 
    
    catch (error) {
        console.error("Error adding staff:", error);
    }
}

  return (
    <div>

    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-black shadow-md rounded-lg border border-slate-300">

    <h2 className="text-xl font-semibold mb-4">Employee Details</h2>

    {/* Name */}
    <div className="mb-4">
        <label className="block font-medium">Name</label>
        <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter name" onChange={(e)=>{
            setName(e.target.value)
        }}
        value={name}/>
    </div>

    {/* Employee ID */}
    <div className="mb-4">
        <label className="block font-medium">Employee ID</label>
        <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter EID" onChange={(e)=>{
            setEid(e.target.value)
        }}
        value={EId}/>
    </div>

    {/* Age */}
    <div className="mb-4">
        <label className="block font-medium">Age</label>
        <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter age" onChange={(e)=>{
            setAge(Number(e.target.value))
        }}
        value={age}/>
    </div>

    {/* Email */}
    <div className="mb-4">
        <label className="block font-medium">Email</label>
        <input type="email" className="w-full p-2 border rounded-md" placeholder="Enter email" onChange={(e)=>{
            setEmail(e.target.value)
        }}
        value={email}/>
    </div>

    {/* Role */}
    <div className="mb-4">
        <label className="block font-medium">Role</label>
        <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter role" onChange={(e)=>{
            setRole(e.target.value)
        }}
        value={role} />
    </div>

    {/* Join Date */}
    <div className="mb-4">
        <label className="block font-medium">Join Date</label>
        <input type="date" className="w-full p-2 border rounded-md" onChange={(e)=>{
            setJoinDate(e.target.value)
        }}
        value={joinDate}/>
    </div>

    {/* Qualification */}
    <div className="mb-4">
        <label className="block font-medium">Qualification</label>
        <input type="text" className="w-full p-2 border rounded-md" placeholder="Enter qualification" onChange={(e)=>{
            setQualification(e.target.value)
        }}
        value={qualification}/>
    </div>

    {/* Salary */}
    <div className="mb-4">
        <label className="block font-medium">Salary</label>
        <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter salary" onChange={(e)=>{
            setSalary(Number(e.target.value))
        }}
        value={salary}/>
    </div>

    {/* Tax */}
    <div className="mb-4">
        <label className="block font-medium">Tax (%)</label>
        <input type="number" className="w-full p-2 border rounded-md" placeholder="Enter tax percentage" onChange={(e)=>{
            setTax(Number(e.target.value))
        }}
        value={tax}/>
    </div>

    {/* Submit Button */}
    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-blue-600">
        Add  New Staff
    </button>
</form>

    </div>
  )
}

export default AddStaffDetails