import mongoose, { Schema, Document } from "mongoose";

// Traveler sub-schema
const TravelerSchema = new Schema({
  type: {
    type: String,
    enum: ["Adult", "Senior", "Children", "Seat Infants", "Lap Infants"],
    required: true,
  },
  count: { type: Number, default: 0 },
  ageRange: { type: String },
});

// Flight leg sub-schema (for multi-city trips)
const FlightLegSchema = new Schema({
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  date: { type: Date, required: true },
});

// Main Flight schema
const FlightSchema = new Schema({
  type: {
    type: String,
    enum: ["Round Trip", "One Way", "Multi-City"],
    required: true,
  },
  departure: {
    type: String,
    required: function (this: any) {
      return this.type !== "Multi-City";
    },
  },
  arrival: {
    type: String,
    required: function (this: any) {
      return this.type !== "Multi-City";
    },
  },
  departDate: {
    type: Date,
    required: function (this: any) {
      return this.type !== "Multi-City";
    },
  },
  returnDate: { type: Date }, // Only for Round Trip
  multiCityLegs: {
    type: [FlightLegSchema],
    required: function (this: any) {
      return this.type === "Multi-City";
    },
  },
  travelers: [TravelerSchema],
  totalTravelers: { type: Number, required: true },
  bookingDetails: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export interface IFlight extends Document {
  type: "Round Trip" | "One Way" | "Multi-City";
  departure?: string;
  arrival?: string;
  departDate?: Date;
  returnDate?: Date;
  multiCityLegs?: Array<{
    departure: string;
    arrival: string;
    date: Date;
  }>;
  travelers: Array<{
    type: "Adult" | "Senior" | "Children" | "Seat Infants" | "Lap Infants";
    count: number;
    ageRange?: string;
  }>;
  totalTravelers: number;
  bookingDetails: {
    name: string;
    phoneNumber: string;
    email?: string;
  };
  createdAt: Date;
}

const Flight = mongoose.model<IFlight>("Flight", FlightSchema);

export default Flight;
