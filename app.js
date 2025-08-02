import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log(process.env.MONGO_URI);

console.log("App started")

// Updated CORS configuration
app.use(cors({
  origin: 'http://localhost:5177',
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'], // Added common HTTP methods
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

export default app;
