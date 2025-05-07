import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, MapPin, Users, Clock, Check } from "lucide-react";
import HeroImage from "@/components/home/HeroImage";
import FeatureCard from "@/components/home/FeatureCard";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
const Home = () => {
  const testimonials = [{
    quote: "DeskHive has revolutionized how we manage our office spaces. The interface is intuitive and the booking process is seamless.",
    name: "Chioma Okafor",
    title: "Operations Manager, Lagos Tech Hub"
  }, {
    quote: "As someone who's always on the move between offices, DeskHive has made it incredibly easy to find and book workspaces.",
    name: "Oluwaseun Adeleke",
    title: "Regional Sales Director, Nexus Solutions"
  }, {
    quote: "The analytics feature has provided valuable insights into how our spaces are utilized, helping us make data-driven decisions.",
    name: "Amara Nwachukwu",
    title: "Facility Manager, Global Finance"
  }, {
    quote: "The interactive floor plan feature is a game-changer for our team coordination. We can easily see who's sitting where.",
    name: "Ibrahim Mohammed",
    title: "Team Lead, Creative Solutions"
  }, {
    quote: "I've used many workspace management tools, but DeskHive stands out with its user-friendly interface and robust features.",
    name: "Ngozi Eze",
    title: "HR Director, Tech Innovations"
  }];
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section - Increased top padding for more space below floating navbar */}
        <section className="relative bg-gradient-to-b from-deskhive-skyblue to-white overflow-hidden pt-44 md:pt-44 pb-16 md:pb-24 px-4 md:px-8 lg:px-16">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/e4637799-cdf0-41b0-af2b-8393e9f28fe0.png')] opacity-5 bg-center bg-no-repeat bg-contain"></div>
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
              <div className="flex-1 animate-fade-in">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-deskhive-navy mb-6 md:mb-8 leading-tight">
                  The Smarter Way to Manage <span className="text-deskhive-orange">Workspaces</span>
                </h1>
                <p className="text-base md:text-lg text-deskhive-darkgray/80 mb-8 md:mb-10 max-w-2xl">
                  Book, manage, and optimize workspaces efficiently with DeskHive - 
                  Nigeria's premier workspace management solution designed for the modern workforce.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10">
                  <Link to="/signup">
                    <Button className="btn-primary h-12 px-8 text-base w-full sm:w-auto">
                      Get Started <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="h-12 px-8 text-base border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 w-full sm:w-auto">
                      Log In
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-sm md:text-base text-deskhive-darkgray">Trusted by 100+ users across Nigeria</p>
                  <div className="h-px bg-deskhive-coolgray flex-1 max-w-[100px]"></div>
                </div>
              </div>
              <div className="flex-1 animate-slide-up w-full max-w-md lg:max-w-none mx-auto lg:mx-0 mt-8 lg:mt-0">
                <HeroImage />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-deskhive-navy mb-3 md:mb-4">Seamless Workspace Management</h2>
              <p className="text-base md:text-lg text-deskhive-darkgray/80 max-w-2xl mx-auto">
                Designed to streamline booking processes and optimize workspace utilization
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard icon={<Calendar className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} title="Easy Booking" description="Book desks, meeting rooms, and event spaces with just a few clicks." />
              <FeatureCard icon={<MapPin className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} title="Interactive Floor Plans" description="Visualize and select workspaces using interactive floor plans." />
              <FeatureCard icon={<Users className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} title="Team Collaboration" description="Coordinate bookings for team meetings and collaborative sessions." />
              <FeatureCard icon={<Clock className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} title="Real-time Availability" description="See workspace availability in real-time and avoid booking conflicts." />
              <FeatureCard icon={<Check className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} title="Automated Reminders" description="Receive automated reminders for upcoming bookings via email." />
              <FeatureCard icon={<Calendar className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} title="Calendar Integration" description="Sync your bookings with your calendar for better scheduling." />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="glass-gradient py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-deskhive-navy mb-3 md:mb-4">What Our Users Say</h2>
              <p className="text-base md:text-lg text-deskhive-darkgray/80 max-w-2xl mx-auto">
                Hear from professionals across Nigeria who use DeskHive daily
              </p>
            </div>
            
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* Interactive Floor Plan Preview Section - Improved Responsiveness */}
        <section className="bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <div className="glass-card rounded-xl p-3 md:p-6 overflow-hidden relative">
                  <div className="aspect-video bg-deskhive-skyblue/30 rounded-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 md:h-12 md:w-12 text-deskhive-navy/40 mx-auto mb-2 md:mb-4" />
                        <p className="text-deskhive-navy/60 font-medium text-sm md:text-base">Interactive Floor Plan</p>
                      </div>
                    </div>
                    {/* Floor plan grid overlay */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 opacity-20">
                      {Array.from({
                      length: 24
                    }).map((_, i) => <div key={i} className="border border-deskhive-navy/20 rounded-sm"></div>)}
                    </div>
                    {/* Sample desk indicators */}
                    <div className="absolute top-[30%] left-[20%] h-3 w-3 md:h-4 md:w-4 bg-green-500 rounded-full"></div>
                    <div className="absolute top-[40%] left-[40%] h-3 w-3 md:h-4 md:w-4 bg-red-500 rounded-full"></div>
                    <div className="absolute top-[60%] left-[70%] h-3 w-3 md:h-4 md:w-4 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-deskhive-navy mb-4">Interactive Floor Plans</h2>
                <p className="text-sm md:text-base text-deskhive-darkgray/80 mb-6">
                  Visualize your workspace in real-time with our interactive floor plans. Easily book desks, meeting rooms, and see availability at a glance.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 md:h-4 md:w-4" />
                    </div>
                    <span className="text-deskhive-darkgray/90 text-sm md:text-base">Visual booking experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 md:h-4 md:w-4" />
                    </div>
                    <span className="text-deskhive-darkgray/90 text-sm md:text-base">Real-time availability updates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-500 flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-3 w-3 md:h-4 md:w-4" />
                    </div>
                    <span className="text-deskhive-darkgray/90 text-sm md:text-base">See who's sitting where</span>
                  </li>
                </ul>
                <Link to="/dashboard">
                  <Button className="glass-button text-sm md:text-base">
                    Explore Floor Plans <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-deskhive-navy text-white py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <div className="glass-gradient p-6 md:p-12 text-center rounded-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to Optimize Your Workspace?</h2>
              <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">Step into the future of workspace management with DeskHive</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="default" className="btn-primary">
                  <Link to="/signup">Find a Workspace</Link>
                </Button>
                <Button asChild variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5">
                  <Link to="/signup?type=organization">List Your Space</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Home;