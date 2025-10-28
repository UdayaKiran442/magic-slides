import mongoose from 'mongoose';

mongoose.connect(process.env.DATABASE_URL || "");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting database"));
db.once("open", () => console.log("Connected to database"));

