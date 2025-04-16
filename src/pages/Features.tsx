import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeatureCard from "@/components/home/FeatureCard";
import { Button } from "@/components/ui/button";
import { 
  CalendarCheck, 
  MapPin, 
  Bell, 
  LineChart, 
  Users, 
  CreditCard,
  Video,
  Smartphone,
  CalendarClock
} from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      icon: <CalendarCheck size={36} className="text-deskhive-orange" />,
      title: "Easy Booking System",
      description: "Book workspaces with a few clicks through our intuitive calendar interface. Filter by location, amenities, and availability."
    },
    {
      icon: <MapPin size={36} className="text-deskhive-orange" />,
      title: "Interactive Floor Plans",
      description: "Navigate workspaces visually with our detailed interactive floor plans showing real-time availability."
    },
    {
      icon: <Bell size={36} className="text-deskhive-orange" />,
      title: "Smart Notifications",
      description: "Receive timely reminders about your bookings, changes to reservations, and important updates."
    },
    {
      icon: <LineChart size={36} className="text-deskhive-orange" />,
      title: "Usage Analytics",
      description: "Gain insights into workspace utilization patterns with detailed analytics and reporting tools."
    },
    {
      icon: <Users size={36} className="text-deskhive-orange" />,
      title: "Team Collaboration",
      description: "Coordinate with team members by viewing shared calendars and booking group workspaces."
    },
    {
      icon: <CreditCard size={36} className="text-deskhive-orange" />,
      title: "Flexible Payment Options",
      description: "Pay for bookings using multiple payment methods including credit cards and mobile money."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Video size={28} className="text-deskhive-royal" />,
      title: "Integration with Meeting Tools",
      description: "Seamlessly connect with Zoom, Google Meet, and other video conferencing tools."
    },
    {
      icon: <Smartphone size={28} className="text-deskhive-royal" />,
      title: "Mobile Application",
      description: "Access all features on the go with our responsive mobile application."
    },
    {
      icon: <CalendarClock size={28} className="text-deskhive-royal" />,
      title: "Calendar Sync",
      description: "Sync your bookings with Google Calendar, Outlook, and other calendar applications."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Added more top padding for floating navbar */}
        <section className="py-12 pt-28 md:pt-32 md:pb-20 px-4 md:px-8 bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deskhive-navy mb-4 md:mb-6 animate-fade-in">
                Powerful Features for Modern Workspace Management
              </h1>
              <p className="text-base md:text-lg text-deskhive-darkgray/80 mb-8 md:mb-10 animate-fade-in">
                Discover how DeskHive helps you optimize your workspace usage, boost productivity, and improve collaboration.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 animate-fade-in">
                <Button asChild variant="default" className="btn-primary">
                  <Link to="/register">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 mt-3 sm:mt-0">
                  <Link to="/contact">Request Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Features Grid - Improved responsiveness */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-deskhive-navy text-center mb-8 md:mb-12">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {mainFeatures.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section - Improved responsiveness */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-deskhive-skyblue">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-deskhive-navy text-center mb-8 md:mb-12">
              How DeskHive Works
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-12 md:mb-16">
                <div className="w-full md:w-1/2 glass-card p-6 h-48 md:h-64 flex items-center justify-center">
                  <span className="text-4xl md:text-6xl font-bold text-deskhive-orange">1</span>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-bold text-deskhive-navy mb-3 md:mb-4">Browse Available Workspaces</h3>
                  <p className="text-sm md:text-base text-deskhive-darkgray/80">
                    Use our intuitive interface to explore available workspaces. Filter by location, 
                    type, amenities, and time to find the perfect spot for your needs.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-center mb-12 md:mb-16">
                <div className="w-full md:w-1/2 glass-card p-6 h-48 md:h-64 flex items-center justify-center">
                  <span className="text-4xl md:text-6xl font-bold text-deskhive-orange">2</span>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-bold text-deskhive-navy mb-3 md:mb-4">Book with a Few Clicks</h3>
                  <p className="text-sm md:text-base text-deskhive-darkgray/80">
                    Select your preferred workspace, choose your date and time, and confirm your booking 
                    in seconds. Our streamlined process makes workspace booking effortless.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                <div className="w-full md:w-1/2 glass-card p-6 h-48 md:h-64 flex items-center justify-center">
                  <span className="text-4xl md:text-6xl font-bold text-deskhive-orange">3</span>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-bold text-deskhive-navy mb-3 md:mb-4">Check-in and Enjoy</h3>
                  <p className="text-sm md:text-base text-deskhive-darkgray/80">
                    Arrive at your booked workspace at the scheduled time. Use our mobile app or 
                    reception desk for a smooth check-in process. Then focus on what matters most: your work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Features - Improved responsiveness */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-deskhive-navy text-center mb-8 md:mb-12">
              Additional Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="glass-card p-5 md:p-6 text-center relative">
                  <div className="absolute top-3 right-3">
                    <span className="bg-deskhive-orange text-white text-xs px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <div className="flex justify-center mb-3 md:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-deskhive-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-deskhive-darkgray/80">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section - Improved responsiveness */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-deskhive-navy text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Optimize Your Workspace?</h2>
              <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8">
                Join thousands of Nigerian businesses already using DeskHive to manage their workspaces efficiently.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button asChild variant="default" className="bg-deskhive-orange hover:bg-deskhive-orange/90 text-white">
                  <Link to="/register">Get Started for Free</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-deskhive-navy hover:bg-white/10 mt-3 sm:mt-0">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
