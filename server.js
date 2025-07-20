import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

// Allowed origins for CORS
const allowedOrigins = [
  'https://your-frontend.vercel.app', // <-- Replace with your actual Vercel frontend URL
  'http://localhost:3000'            // For local development
];

// ES module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white
  );
});
