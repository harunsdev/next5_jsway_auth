import mongoose from "mongoose";

export default function connectToMongoDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully..");
    });

    connection.on("error", (err) => {
      console.log("MongoDB Connection Error", +err);
    });
  } catch (error) {
    console.log(
      "Ups ! Something went wrong with MongoDB connection..." + error
    );
  }
}
