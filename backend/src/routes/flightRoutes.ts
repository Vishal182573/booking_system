import express from "express";
import { bookFlight, getFlightById } from "../controlllers/flightController";

const router = express.Router();

router.post("/book", bookFlight);
router.get("/:id", getFlightById);

export default router;
