import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import choresRouter from "./routes/chores.js";
import groceriesRouter from "./routes/groceries.js";
import groupsRouter from "./routes/groups.js";
import receiptRouter from "./routes/receipt.js";
import recipeRouter from "./routes/recipe.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const db_uri = process.env.DB_URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect Routes
app.use("/users", usersRouter);
app.use("/calendar", eventsRouter);
app.use("/chores", choresRouter);
app.use("/groceries", groceriesRouter);
app.use("/groups", groupsRouter);
app.use("/receipt", receiptRouter);
app.use("/recipes", recipeRouter);

// Connect Database
async function connectDB() {
  try {
    await mongoose.connect(db_uri, clientOptions);
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export { app, connectDB };
