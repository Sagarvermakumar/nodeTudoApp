import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "nodeJsTodoApp",
    });
    console.log("Database Connected : " + connection.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
