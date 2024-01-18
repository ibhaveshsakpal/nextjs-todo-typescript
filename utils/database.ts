import mongoose from "mongoose";

let isConnected = false;

export const ConnectDB = async () => {
  let MONGO_URI = process.env.MONGO_URI || "";
  if (isConnected) {
    console.log("MongoDB is already running!");
    return;
  }
  if (!MONGO_URI) {
    console.log("MONGO_URI not found!");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "Users",
    });

    isConnected = true;
    console.log("MongoDB is connected!");
  } catch (error: any) {
    console.log(error);
  }
};
