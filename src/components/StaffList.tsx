import React from 'react'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import RemovBtn from './RemovBtn'

const getStaffs=async()=>{
    try{
        const res=await fetch('http:/localhost:3000/api',{
            cache:'no-store',
        });

        if(!res.ok){
            throw new Error("Failed to fetch data")
        }
        return res.json();
    }
    catch(error){  
        console.error("Error fetching staff data:", error);
    }
}

const StaffList = async() => {

    const {staffs}=await getStaffs();

  return (
    <div>
        {staffs.map((staff:any)=>(
            <div key={staff._id} className="p-4 border border-white-300 rounded-lg shadow-md bg-black mb-4">
                <h3 className="font-semibold text-xl">{staff.name}</h3><br/>

                
                <p><strong>EId:</strong> {staff.EId}</p>
                <p><strong>Email:</strong> {staff.email}</p>
                <p><strong>Age:</strong> {staff.age}</p>
                <p><strong>Role:</strong> {staff.role}</p>
                <p><strong>JoinAt:</strong> {staff.joinDate}</p>
                <p><strong>Qualification:</strong> {staff.qualification}</p>
                <p><strong>Salary:</strong> {staff.salary}</p>
                <p><strong>Tax:</strong> {staff.tax}</p>
                <p><strong>Total Salary:</strong> {staff.salary - staff.tax }</p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-3">
                    <RemovBtn id={staff._id}/>
                    <Link href={`/editDetails/${staff._id}`} className="text-blue-500 hover:text-blue-700">
                        <HiPencilAlt size={24} />
                    </Link>
                </div>
            </div>
        ))}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    
   

    {/* Repeat the above <div> for more employees */}
</div>


    </div>
  )
}

export default StaffList