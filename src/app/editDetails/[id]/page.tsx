import EditDetailsFrom from '@/components/EditDetailsFrom';
import React from 'react';

const getStaffDetails = async (id: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Staff Data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching staff details:", error);
    return null;
  }
};

async function EditDetails({ params }: any) {
  const { id } = params;
  console.log("id : ", id);

  const staffData = await getStaffDetails(id);

  if (!staffData || !staffData.staffs) {
    return <div>Error fetching staff details. Please try again later.</div>;
  }

  const { name, EId, email, age, role, joinDate, qualification, salary, tax } = staffData.staffs;

  return (
    <div>
      <EditDetailsFrom
        id={id}
        name={name}
        EId={EId}
        email={email}
        age={age}
        role={role}
        joinDate={joinDate}
        qualification={qualification}
        salary={salary}
        tax={tax}
      />
    </div>
  );
}

export default EditDetails;
