import { NextResponse } from 'next/server';
import connectMongodb from '@/libs/mongodb';
import Staffs from '@/models/StaffModels';
import { NextRequest } from 'next/server';

export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params; // Use context.params instead of destructuring directly
        console.log("API Received ID:", id);

        if (!id || id.length !== 24) { // Validate ObjectId length
            return NextResponse.json({ error: "Invalid Staff ID" }, { status: 400 });
        }

        await connectMongodb();
        const staff = await Staffs.findById(id);

        if (!staff) {
            return NextResponse.json({ error: "Staff not found" }, { status: 404 });
        }

        return NextResponse.json({ staffs: staff });
    } catch (error) {
        console.error("Error fetching staff details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = context.params;

        if (!id || id.length !== 24) {
            return NextResponse.json({ error: "Invalid Staff ID" }, { status: 400 });
        }

        await connectMongodb();
        const body = await request.json();

        const updatedStaff = await Staffs.findByIdAndUpdate(id, body, { new: true });

        if (!updatedStaff) {
            return NextResponse.json({ error: "Staff not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Staff updated successfully", staff: updatedStaff });
    } catch (error) {
        console.error("Error updating staff details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
