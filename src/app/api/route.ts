// Import necessary modules and types
import  connectMongodb  from "@/libs/mongodb"; // Adjust the path as needed
import Staffs from "@/models/StaffModels";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {name, EId, age, email, role, joinDate, qualification, salary, tax} = await request.json();
    await connectMongodb();
    await Staffs.create({
        name, EId, age, email, role, joinDate, qualification, salary, tax   })

    return NextResponse.json({message:"Staff Added Successfully"})
}

export async function GET(request: Request) {
    await connectMongodb();
    const staffs = await Staffs.find({});
    return NextResponse.json({staffs});
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    await connectMongodb();
    await Staffs.findByIdAndDelete(id); // Delete the staff member by ID
    return NextResponse.json({ message: "Staff deleted successfully" });
}