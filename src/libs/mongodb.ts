import mongoose from "mongoose";

const connectMongodb= async()=>{
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }
       await mongoose.connect(process.env.MONGODB_URI);
    }catch(err){
        console.log(err)
    }
}


export default connectMongodb;