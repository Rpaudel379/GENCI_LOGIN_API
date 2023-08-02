import express from "express";
import dotenv from "dotenv";
import { authRoute } from "./routes/authRoute.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoute);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server running");
  });
});
