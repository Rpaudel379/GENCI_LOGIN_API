import express from "express";
import { handleLogin } from "../controller/auth/login.js";

export const authRoute = express.Router();

authRoute.post("/login", handleLogin);
