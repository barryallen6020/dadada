import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroImage from "@/components/home/HeroImage";
import FeatureCard from "@/components/home/FeatureCard";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import { ChevronRight, Calendar, MapPin, Users, Clock, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return null;
  }

  const testimonials = [
    {
      quote: "Found my perfect workspace through DeskHive. The booking process was seamless and the space exceeded my expectations.",
      name: "Chioma Okafor",
      title: "Remote Software Developer"
    },
    {
      quote: "Managing our co-working spaces has never been easier. DeskHive helps us reach more professionals looking for flexible workspaces.",
      name: "Oluwaseun Adeleke",
      title: "Workspace Manager, Tech Hub Lagos"
    },
    {
      quote: "The interactive floor plans and real-time availability features make it so easy to find and book the right workspace.",
      name: "Amara Nwachukwu",
      title: "Freelance Consultant"
    },
    {
      quote: "DeskHive has helped us increase our workspace occupancy by connecting us with professionals seeking flexible work environments.",
      name: "Ibrahim Mohammed",
      title: "Business Owner, Creative Hub Abuja"
    },
    {
      quote: "The platform's rating system helps maintain high standards. I always find quality workspaces that match my needs.",
      name: "Ngozi Eze",
      title: "Digital Nomad"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="relative bg-gradient-to-b from-deskhive-skyblue to-white overflow-hidden pt-44 md:pt-44 pb-16 md:pb-24 px-4 md:px-8 lg:px-16">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/e4637799-cdf0-41b0-af2b-8393e9f28fe0.png')] opacity-5 bg-center bg-no-repeat bg-contain"></div>
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
              <div className="flex-1 animate-fade-in">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-deskhive-navy mb-6 md:mb-8 leading-tight">
                  Discover and Book Your Perfect <span className="text-deskhive-orange">Workspace</span>
                </h1>
                <p className="text-base md:text-lg text-deskhive-darkgray/80 mb-8 md:mb-10 max-w-2xl">
                  Connect with quality workspaces across Nigeria. Whether you're looking for a desk or managing a workspace, 
                  DeskHive makes it simple to find, book, and manage flexible work environments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-10">
                  <Link to="/register">
                    <Button className="btn-primary h-12 px-8 text-base w-full sm:w-auto">
                      Find Workspace <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="h-12 px-8 text-base border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 w-full sm:w-auto">
                      List Your Space
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-sm md:text-base text-deskhive-darkgray">Trusted by 100+ workspaces and thousands of users across Nigeria</p>
                  <div className="h-px bg-deskhive-coolgray flex-1 max-w-[100px]"></div>
                </div>
              </div>
              <div className="flex-1 animate-slide-up w-full max-w-md lg:max-w-none mx-auto lg:mx-0 mt-8 lg:mt-0">
                <HeroImage />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-deskhive-navy mb-3 md:mb-4">Everything You Need</h2>
              <p className="text-base md:text-lg text-deskhive-darkgray/80 max-w-2xl mx-auto">
                A comprehensive platform for both workspace seekers and providers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard 
                icon={<MapPin className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} 
                title="Find Nearby Spaces" 
                description="Discover quality workspaces near you with detailed information and real user reviews." 
              />
              <FeatureCard 
                icon={<Calendar className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} 
                title="Easy Booking" 
                description="Book your workspace instantly with our seamless reservation system." 
              />
              <FeatureCard 
                icon={<Users className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} 
                title="Community Access" 
                description="Connect with other professionals and join thriving workspace communities." 
              />
              <FeatureCard 
                icon={<Clock className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} 
                title="Flexible Duration" 
                description="Book by the hour, day, or month - whatever suits your working style." 
              />
              <FeatureCard 
                icon={<Check className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} 
                title="Verified Spaces" 
                description="All workspaces are verified to ensure quality and reliability." 
              />
              <FeatureCard 
                icon={<Calendar className="h-6 w-6 md:h-8 md:w-8 text-deskhive-orange" />} 
                title="Smart Management" 
                description="Powerful tools for workspace owners to manage bookings and facilities." 
              />
            </div>
          </div>
        </section>

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
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 opacity-20">
                      {Array.from({length: 24}).map((_, i) => <div key={i} className="border border-deskhive-navy/20 rounded-sm"></div>)}
                    </div>
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

        <section className="bg-deskhive-navy text-white py-12 md:py-20 px-4 md:px-8 lg:px-16">
          <div className="container mx-auto">
            <div className="glass-gradient p-6 md:p-12 text-center rounded-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to Optimize Your Workspace?</h2>
              <p className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">Step into the future of workspace management with DeskHive</p>
              <Link to="/register">
                <Button className="btn-secondary h-10 md:h-12 px-6 md:px-8 text-sm md:text-base">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
