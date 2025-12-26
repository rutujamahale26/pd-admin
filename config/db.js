import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;



// mongodb+srv://rutujamahale26_db_user:n2jVY5KSAGUZFh2r@cluster0.qppvt0x.mongodb.net/?appName=Cluster0