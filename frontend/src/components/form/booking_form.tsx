"use client"
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ChevronDown, PlusCircle, MinusCircle } from "lucide-react";
import { format } from "date-fns";

interface Traveler {
  type: string;
  count: number;
  ageRange: string;
}

const TravelSearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("flights");
  const [tripType, setTripType] = useState<string>("roundTrip");
  const [departDate, setDepartDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [travelers, setTravelers] = useState<Traveler[]>([
    { type: "Adult", count: 1, ageRange: "(18-64)" },
    { type: "Senior", count: 0, ageRange: "(65+)" },
    { type: "Child", count: 0, ageRange: "(2-15)" },
    { type: "Seat Infant", count: 0, ageRange: "(under 2)" },
    { type: "Lap Infant", count: 0, ageRange: "(under 2)" },
  ]);
  const [hotelRooms, setHotelRooms] = useState([{ adults: 2, children: 0 }]);
  const [showTravelersPopover, setShowTravelersPopover] = useState(false);
  const [showHotelRoomsPopover, setShowHotelRoomsPopover] = useState(false);
  const [carPickupDate, setCarPickupDate] = useState<Date | undefined>();
  const [carDropoffDate, setCarDropoffDate] = useState<Date | undefined>();
  const [carPickupTime, setCarPickupTime] = useState<string>("10:00 AM");
  const [carDropoffTime, setCarDropoffTime] = useState<string>("10:00 AM");

  const updateTraveler = (index: number, increment: boolean) => {
    setTravelers(prev => prev.map((traveler, i) => 
      i === index ? { ...traveler, count: Math.max(0, traveler.count + (increment ? 1 : -1)) } : traveler
    ));
  };

  const totalTravelers = travelers.reduce((sum, traveler) => sum + traveler.count, 0);

  const updateHotelRoom = (index: number, field: 'adults' | 'children', value: number) => {
    setHotelRooms(prev => prev.map((room, i) => 
      i === index ? { ...room, [field]: Math.max(0, value) } : room
    ));
  };

  const addHotelRoom = () => {
    setHotelRooms(prev => [...prev, { adults: 1, children: 0 }]);
  };

  const removeHotelRoom = (index: number) => {
    setHotelRooms(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white text-black shadow-lg rounded-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="flights" className="flex items-center">
            <span className="mr-2">✈️</span> Flights
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center">
            <span className="mr-2">🏨</span> Hotels
          </TabsTrigger>
          <TabsTrigger value="cars" className="flex items-center">
            <span className="mr-2">🚗</span> Cars
          </TabsTrigger>
        </TabsList>

        {/* Flights Tab */}
        <TabsContent value="flights">
          <RadioGroup
            value={tripType}
            onValueChange={setTripType}
            className="flex space-x-4 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="roundTrip" id="roundTrip" />
              <Label htmlFor="roundTrip">Round Trip</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oneWay" id="oneWay" />
              <Label htmlFor="oneWay">One Way</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiCity" id="multiCity" />
              <Label htmlFor="multiCity">Multi-City</Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="DEL - New Delhi IGI, India" defaultValue="DEL" />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="Anywhere" />
            </div>
            <div>
              <Label>Depart</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!departDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departDate ? format(departDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={setDepartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {tripType === "roundTrip" && (
              <div>
                <Label>Return</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!returnDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          <div className="mb-4">
            <Label>Travelers</Label>
            <Popover open={showTravelersPopover} onOpenChange={setShowTravelersPopover}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {totalTravelers} Traveler{totalTravelers !== 1 ? 's' : ''}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  {travelers.map((traveler, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{traveler.type} {traveler.ageRange}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateTraveler(index, false)}
                          disabled={traveler.count === 0}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span>{traveler.count}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateTraveler(index, true)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button onClick={() => setShowTravelersPopover(false)} className="w-full">
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full">
            Search Flights
          </Button>
        </TabsContent>

        {/* Hotels Tab */}
        <TabsContent value="hotels">
          {/* Hotel Search Inputs */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="hotelDestination">Destination</Label>
              <Input id="hotelDestination" placeholder="City or Hotel Name" />
            </div>
            <div>
              <Label>Check-in Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!departDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {departDate ? format(departDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={departDate}
                    onSelect={setDepartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Check-out Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!returnDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Hotel Room Selector */}
          <div className="mb-4">
            <Label>Rooms & Travelers</Label>
            <Popover open={showHotelRoomsPopover} onOpenChange={setShowHotelRoomsPopover}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {hotelRooms.length} Room{hotelRooms.length > 1 ? "s" : ""}, {totalTravelers} Traveler{totalTravelers > 1 ? "s" : ""}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  {hotelRooms.map((room, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Room {index + 1}</span>
                        {index > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeHotelRoom(index)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Adults</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateHotelRoom(index, 'adults', hotelRooms[index].adults - 1)}
                            disabled={hotelRooms[index].adults === 1}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span>{hotelRooms[index].adults}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateHotelRoom(index, 'adults', hotelRooms[index].adults + 1)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Children</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateHotelRoom(index, 'children', hotelRooms[index].children - 1)}
                            disabled={hotelRooms[index].children === 0}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span>{hotelRooms[index].children}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateHotelRoom(index, 'children', hotelRooms[index].children + 1)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addHotelRoom} className="w-full">
                    Add Room
                  </Button>
                  <Button onClick={() => setShowHotelRoomsPopover(false)} className="w-full">
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full">
            Search Hotels
          </Button>
        </TabsContent>

        {/* Cars Tab */}
        <TabsContent value="cars">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="carPickupLocation">Pick-up Location</Label>
              <Input id="carPickupLocation" placeholder="City, Airport, or Address" />
            </div>
            <div>
              <Label htmlFor="carDropoffLocation">Drop-off Location</Label>
              <Input id="carDropoffLocation" placeholder="Same as Pick-up" />
            </div>
            <div>
              <Label>Pick-up Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!carPickupDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {carPickupDate ? format(carPickupDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={carPickupDate}
                    onSelect={setCarPickupDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Drop-off Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!carDropoffDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {carDropoffDate ? format(carDropoffDate, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={carDropoffDate}
                    onSelect={setCarDropoffDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Pick-up Time</Label>
              <Select value={carPickupTime} onValueChange={setCarPickupTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Drop-off Time</Label>
              <Select value={carDropoffTime} onValueChange={setCarDropoffTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Search Cars
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TravelSearch;
