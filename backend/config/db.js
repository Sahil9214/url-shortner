import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const dbRun = await mongoose.connect(process.env.MONGO_URI);
    return dbRun;
  } catch (error) {
    throw new Error(error);
  }
};

export default connectDb;
