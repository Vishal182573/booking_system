import type { Request, Response } from "express";
import Flight from "../models/flights";
import type { IFlight } from "../models/flights";

export const bookFlight = async (req: Request, res: Response) => {
  try {
    const flightData: IFlight = req.body;
    const newFlight = new Flight(flightData);
    await newFlight.save();
    res.status(201).json(newFlight);
  } catch (error) {
    res.status(400).json({ message: "Error booking flight", error });
  }
};

export const getFlightById = async (req: Request, res: Response) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: "Flight booking not found" });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(400).json({ message: "Error fetching flight booking", error });
  }
};
