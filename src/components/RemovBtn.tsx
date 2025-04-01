"use client"
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

const RemovBtn: React.FC<{ id: string }> = ({ id }) => {
  const router=useRouter();
  const removeStaff=async()=>{
    const confirmed=confirm("Are you sure?");

    if(confirmed){
      const res=await fetch(`http://localhost:3000/api?id=${id}`, {
        method: "DELETE"
      });
      if(res.ok)
      {
        router.refresh();
      }
      
    }
  };

  return (
    <button onClick={removeStaff} className="text-red-400 hover:text-red-600 transition-colors duration-200">
        <HiOutlineTrash size={24} />
    </button>
  )
}

export default RemovBtn