
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeatureCard from "@/components/home/FeatureCard";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock,
  Check,
  Star
} from "lucide-react";

const Features = () => {
  const userFeatures = [
    {
      icon: <MapPin size={36} className="text-deskhive-orange" />,
      title: "Smart Location Search",
      description: "Find nearby workspaces or explore options in specific areas. Filter by location, amenities, and price."
    },
    {
      icon: <Calendar size={36} className="text-deskhive-orange" />,
      title: "Instant Booking",
      description: "Book your preferred workspace instantly with our real-time availability system and secure payment."
    },
    {
      icon: <Users size={36} className="text-deskhive-orange" />,
      title: "Community Access",
      description: "Connect with professionals, join workspace communities, and expand your network."
    },
    {
      icon: <Star size={36} className="text-deskhive-orange" />,
      title: "Verified Reviews",
      description: "Read authentic reviews from real users to make informed decisions about workspaces."
    },
    {
      icon: <Clock size={36} className="text-deskhive-orange" />,
      title: "Flexible Bookings",
      description: "Choose from hourly, daily, or monthly booking options to match your work schedule."
    },
    {
      icon: <Check size={36} className="text-deskhive-orange" />,
      title: "Quality Guarantee",
      description: "Every workspace is verified to ensure it meets our quality and safety standards."
    }
  ];

  const providerFeatures = [
    {
      icon: <Calendar size={28} className="text-deskhive-royal" />,
      title: "Booking Management",
      description: "Efficiently manage reservations, check-ins, and workspace availability in real-time."
    },
    {
      icon: <Users size={28} className="text-deskhive-royal" />,
      title: "Customer Insights",
      description: "Access detailed analytics about workspace usage and user preferences."
    },
    {
      icon: <Star size={28} className="text-deskhive-royal" />,
      title: "Reputation Building",
      description: "Build your brand with verified reviews and ratings from satisfied users."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 pt-28 md:pt-32 md:pb-20 px-4 md:px-8 bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deskhive-navy mb-4 md:mb-6 animate-fade-in">
                The Complete Workspace Platform
              </h1>
              <p className="text-base md:text-lg text-deskhive-darkgray/80 mb-8 md:mb-10 animate-fade-in">
                Whether you're searching for the perfect workspace or managing your properties, 
                DeskHive provides all the tools you need for success.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 animate-fade-in">
                <Button asChild variant="default" className="btn-primary">
                  <Link to="/register">Start Your Journey</Link>
                </Button>
                <Button asChild variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 mt-3 sm:mt-0">
                  <Link to="/contact">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* User Features Grid */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-deskhive-navy text-center mb-4">
              For Workspace Seekers
            </h2>
            <p className="text-center text-deskhive-darkgray/80 mb-12 max-w-2xl mx-auto">
              Find and book your ideal workspace with powerful features designed for professionals like you
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {userFeatures.map((feature, index) => (
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

        {/* Provider Features */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-deskhive-skyblue">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-deskhive-navy text-center mb-4">
              For Workspace Providers
            </h2>
            <p className="text-center text-deskhive-darkgray/80 mb-12 max-w-2xl mx-auto">
              Powerful tools to manage and grow your workspace business
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {providerFeatures.map((feature, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="bg-deskhive-navy/5 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-3 text-center">{feature.title}</h3>
                  <p className="text-deskhive-darkgray/80 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-deskhive-navy mb-6">Ready to Get Started?</h2>
              <p className="text-deskhive-darkgray/80 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied users and workspace providers on DeskHive
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="default" className="btn-primary">
                  <Link to="/register">Find a Workspace</Link>
                </Button>
                <Button asChild variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5">
                  <Link to="/register?type=provider">List Your Space</Link>
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
