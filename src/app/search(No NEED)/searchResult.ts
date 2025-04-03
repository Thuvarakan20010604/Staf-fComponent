import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Staffs from "@/models/StaffModels";

const MONGODB_URI = "mongodb://localhost:27017/Olir";

// Ensure MongoDB is connected only once
async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any);
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    // Get search query from request
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("q") || "";

    if (!searchTerm) {
      return NextResponse.json({ error: "No search term provided" }, { status: 400 });
    }

    // Search MongoDB
    const results = await Staffs.find({
      name: { $regex: searchTerm, $options: "i" } // Case-insensitive search
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error searching staff:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
