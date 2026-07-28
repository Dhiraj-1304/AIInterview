import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth",authRouter);

const PORT = process.env.PORT || 5000;

const connectDB= async () =>{
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log("MongoDB connected successfully");
  }).catch((err)=>{
    console.log("MongoDB connection failed",err);
  })
}


app.get('/',(req,res)=>{
  res.send("Hello from AI Resume Builder");
});
const startServer = async () => {
  try {
    connectDB();
    app.listen(PORT,()=>{
    console.log(`Server is running on port : http://localhost:${PORT}`);
    })
  }catch(err){
    console.log("Error starting server:", err.message);
  }
}
startServer();