
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, HelpCircle, X, Building2, Lock, Globe, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Pricing = () => {
  const [billingAnnually, setBillingAnnually] = useState(true);

  const plans = [
    {
      name: "Public Organization",
      description: "For organizations that want to be discoverable",
      price: "10%",
      priceDescription: "per booking",
      features: [
        "Publicly visible and searchable",
        "Any user can view and book workspaces",
        "You set booking prices",
        "10% platform fee per booking",
        "Unlimited bookings per week",
        "Unlimited organization members",
        "Basic analytics dashboard",
        "Email support",
      ],
      limitations: [],
      icon: <Globe className="h-6 w-6 mb-2 text-deskhive-navy" />,
      mostPopular: true,
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      type: "public",
    },
    {
      name: "Private Organization",
      description: "For organizations requiring custom plans",
      price: "Custom",
      priceDescription: "based on usage",
      features: [
        "Not publicly visible or searchable",
        "Users join by invitation only",
        "Custom subscription pricing",
        "No per-booking fees",
        "Booking volume cap (custom)",
        "Member cap (custom)",
        "Advanced analytics dashboard",
        "Priority email & chat support",
        "Dedicated account manager",
      ],
      limitations: [],
      icon: <Lock className="h-6 w-6 mb-2 text-deskhive-navy" />,
      mostPopular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      type: "private",
    },
  ];

  const toggleBilling = () => {
    setBillingAnnually(!billingAnnually);
  };

  // Example private org plans (will be shown in the enterprise section)
  const privatePlans = [
    {
      name: "Small Team",
      bookingCap: 50,
      memberCap: 100,
      monthlyPrice: 49900,
    },
    {
      name: "Mid-Size",
      bookingCap: 100,
      memberCap: 200,
      monthlyPrice: 89900,
    },
    {
      name: "Enterprise",
      bookingCap: "Unlimited",
      memberCap: "Unlimited",
      monthlyPrice: "Custom",
    }
  ];

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-deskhive-navy mb-6 animate-fade-in">
                Two Flexible Business Models
              </h1>
              <p className="text-xl text-deskhive-darkgray/80 mb-6 animate-fade-in">
                Choose how your organization manages workspaces on the DeskHive platform.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center glass-card px-4 py-2 border border-white/30">
                  <Globe className="h-5 w-5 mr-2 text-deskhive-navy" />
                  <span className="font-medium">Public Organizations</span>
                  <Badge className="ml-2">10% per booking</Badge>
                </div>
                <div className="flex items-center glass-card px-4 py-2 border border-white/30">
                  <Lock className="h-5 w-5 mr-2 text-deskhive-navy" />
                  <span className="font-medium">Private Organizations</span>
                  <Badge variant="outline" className="ml-2">Subscription</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Plans */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-deskhive-navy text-center mb-12">Choose Your Organization Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`glass-card p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${
                    plan.mostPopular ? 'border-deskhive-orange ring-2 ring-deskhive-orange/20 relative' : ''
                  }`}
                >
                  {plan.mostPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-deskhive-orange text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    {plan.icon}
                    <h3 className="text-2xl font-bold text-deskhive-navy mb-2">{plan.name}</h3>
                    <p className="text-deskhive-darkgray/70">{plan.description}</p>
                  </div>
                  
                  <div className="mb-6 text-center">
                    <span className="text-4xl font-bold text-deskhive-navy">
                      {plan.price}
                    </span>
                    <span className="text-deskhive-darkgray/70 ml-1">
                      {plan.priceDescription}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check size={18} className="text-deskhive-success mr-2 mt-1 flex-shrink-0" />
                        <span className="text-deskhive-darkgray">{feature}</span>
                      </li>
                    ))}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={`limit-${limitIndex}`} className="flex items-start text-deskhive-darkgray/60">
                        <X size={18} className="text-deskhive-darkgray/40 mr-2 mt-1 flex-shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Button
                      asChild
                      variant={plan.buttonVariant}
                      className={`w-full ${
                        plan.buttonVariant === "default" 
                          ? "btn-primary" 
                          : "border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5"
                      }`}
                    >
                      <Link to={plan.buttonText === "Contact Sales" ? "/contact" : "/register"}>
                        {plan.buttonText}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Private Organization Plans Section */}
        <section className="section-padding bg-deskhive-skyblue">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto glass-card p-10">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-deskhive-navy mb-4">Private Organization Plans</h2>
                <p className="text-deskhive-darkgray/80 max-w-3xl mx-auto">
                  Tailored subscriptions for organizations that need complete control over their workspace management
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {privatePlans.map((plan, index) => (
                  <Card key={index} className="glass bg-white/60 border-white/30">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-deskhive-navy mb-4">{plan.name}</h3>
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-deskhive-navy">
                          {typeof plan.monthlyPrice === 'number' ? formatPrice(plan.monthlyPrice) : plan.monthlyPrice}
                        </p>
                        <p className="text-sm text-deskhive-darkgray/70">per month</p>
                      </div>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-deskhive-orange" />
                          <span>
                            <strong>{plan.bookingCap}</strong> bookings/month
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-deskhive-orange" />
                          <span>
                            <strong>{plan.memberCap}</strong> member cap
                          </span>
                        </li>
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5"
                        asChild
                      >
                        <Link to="/contact">
                          Contact Sales
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-deskhive-darkgray/80 mb-4">
                  Need a custom solution? Contact our sales team for a personalized plan.
                </p>
                <Button asChild variant="default" className="btn-primary">
                  <Link to="/contact">Schedule a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Add-ons (Coming Soon) Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <Badge variant="outline" className="mb-4">Coming Soon</Badge>
              <h2 className="text-3xl font-bold text-deskhive-navy mb-4">Premium Add-ons</h2>
              <p className="text-deskhive-darkgray/80 max-w-2xl mx-auto">
                Enhance your organization's workspace management with our upcoming premium features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 border border-white/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-deskhive-skyblue/30 rounded-lg">
                    <Users className="h-6 w-6 text-deskhive-navy" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-deskhive-navy mb-2">AI Workspace Insights</h3>
                    <p className="text-deskhive-darkgray/80 mb-4">
                      Advanced analytics dashboard that predicts booking trends, peak hours, and user behavior to help optimize your workspace layout and pricing.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <Check size={16} className="text-deskhive-success mr-2" />
                        <span>Weekly usage reports</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <Check size={16} className="text-deskhive-success mr-2" />
                        <span>Popular booking times analysis</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <Check size={16} className="text-deskhive-success mr-2" />
                        <span>Booking no-show rate tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 border border-white/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-deskhive-skyblue/30 rounded-lg">
                    <Globe className="h-6 w-6 text-deskhive-navy" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-deskhive-navy mb-2">Interactive Maps Feature</h3>
                    <p className="text-deskhive-darkgray/80 mb-4">
                      Visualize your workspace layout with interactive maps, helping users easily find and book the perfect space for their needs.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <Check size={16} className="text-deskhive-success mr-2" />
                        <span>Visual floor plans</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <Check size={16} className="text-deskhive-success mr-2" />
                        <span>Real-time availability indicators</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <Check size={16} className="text-deskhive-success mr-2" />
                        <span>Amenity location mapping</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-deskhive-navy text-center mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-2">What's the difference between Public and Private organizations?</h3>
                  <p className="text-deskhive-darkgray/80">
                    Public organizations are discoverable by all users, who can book workspaces with a 10% platform fee per booking. 
                    Private organizations are invite-only, not publicly visible, and operate on subscription plans with booking and member caps.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-2">How do I set pricing for my workspaces?</h3>
                  <p className="text-deskhive-darkgray/80">
                    Public organization admins can set their own workspace pricing through the admin dashboard. 
                    For each booking, DeskHive deducts a 10% service fee, and the rest goes to your organization.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-2">How do Private organization subscriptions work?</h3>
                  <p className="text-deskhive-darkgray/80">
                    Private organizations pay a subscription fee based on their booking volume and member cap needs. 
                    Users don't pay booking fees - instead, the organization pays for the entire service directly. 
                    Contact our sales team for custom pricing.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-2">Can I change my organization type later?</h3>
                  <p className="text-deskhive-darkgray/80">
                    Yes, you can switch between Public and Private organization types by contacting our support team. 
                    Note that this may require adjustments to your billing and user management setup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-deskhive-navy text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Start Managing Your Organization's Workspaces</h2>
              <p className="text-lg text-white/80 mb-8">
                Join organizations across Nigeria already optimizing their workspace management with DeskHive.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="default" className="bg-deskhive-orange hover:bg-deskhive-orange/90 text-white">
                  <Link to="/register">Create Your Organization</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">Schedule a Demo</Link>
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

export default Pricing;
