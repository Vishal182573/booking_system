"use client"
import { FaPlane, FaHotel, FaCar, FaTag, FaUserAlt, FaRegCheckCircle, FaPhoneAlt, FaInfoCircle, FaPhone } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TravelSearch from "@/components/form/booking_form";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IMG1, IMG2, IMG3 } from "../../public";

const Navbar = () => (
  <nav className="bg-gradient-to-r from-blue-700 to-blue-900 p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white">TravelEase</h1>
      <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-700">
        <FaPhone className="mr-2" />
        <span>000-800-050-3540</span>
      </Button>
    </div>
  </nav>
);

const DestinationCard = ({ title, image, price }: { title: string; image: any, price: string }) => (
  <Card className="overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="relative h-48">
      {/* Remove legacy props like layout and objectFit */}
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
    <CardContent className="p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{price}</p>
    </CardContent>
  </Card>
);


const PopularDestinations = () => (
  <section className="my-12 px-4">
    <h2 className="text-3xl font-bold mb-6 text-center">Popular Packages</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <DestinationCard title="Paris, France" image={IMG1} price="299" />
      <DestinationCard title="Tokyo, Japan" image={IMG2} price="799" />
      <DestinationCard title="New York, USA" image={IMG3} price="349" />
      <DestinationCard title="Sydney, Australia" image={IMG1} price="899" />
    </div>
  </section>
);

const WhyChooseUs = () => (
  <section className="bg-gray-100 py-12 px-4">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Why Choose TravelEase</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { text: "Best Price Guarantee", icon: FaRegCheckCircle },
          { text: "Easy Booking Process", icon: FaInfoCircle },
          { text: "24/7 Customer Support", icon: FaPhoneAlt },
          { text: "Flexible Cancellation", icon: FaRegCheckCircle },
        ].map((feature, index) => (
          <Card key={index} className="text-center shadow-lg p-6 hover:bg-blue-50 transition-colors duration-300">
            <CardHeader className="flex flex-col items-center">
              <feature.icon size={40} className="text-blue-700 mb-4" />
              <h3 className="font-semibold text-lg">{feature.text}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">We offer {feature.text.toLowerCase()} for your peace of mind.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-bold text-lg mb-4">About Us</h3>
        <p className="text-gray-300">TravelEase is an award-winning travel assistance platform, offering affordable travel solutions. With over 500 airlines to choose from, we are committed to making your journey seamless and enjoyable.</p>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
        <p className="text-gray-300">Need help booking? Our agents are ready!</p>
        <p className="font-bold mt-2 text-blue-300">Call us 24/7 at 000-800-050-3540</p>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-4">Awards</h3>
        <ul className="space-y-2 text-gray-300">
          <li>American Business Awards</li>
          <li>Stevie Awards for Sales & Customer Service</li>
        </ul>
      </div>
    </div>
  </footer>
);

interface CarouselProps {
  images: any[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, [images.length]); // Dependency array includes `images.length`

  return (
    <div className="relative w-full h-screen">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Find Your Perfect Trip</h1>
          <p className="text-xl mb-8">Search deals on hotels, homes, and much more...</p>
          <TravelSearch />
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const carouselImages = [IMG1,IMG2,IMG3]; // Adjust paths as needed

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Carousel images={carouselImages} />
        <div className="container mx-auto py-12">
          <PopularDestinations />
          <WhyChooseUs />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;