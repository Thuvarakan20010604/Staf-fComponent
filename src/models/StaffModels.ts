import mongoose,{ Document, Schema } from "mongoose";

const staffSchema = new Schema({
    name: { type: String, required: true },
    EId: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    joinDate: { type: Date, required: true },
    qualification: { type: String, required: true },
    salary: { type: Number, required: true },
    tax: { type: Number, required: true }
});

const Staffs=mongoose.models.Staffs || mongoose.model("Staffs", staffSchema);
export default Staffs;