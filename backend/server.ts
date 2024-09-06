import express from "express";
import flightRoutes from "./src/routes/flightRoutes";
import { connectDatabase } from "./src/utils/db";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Routes
app.use("/api/flights", flightRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
