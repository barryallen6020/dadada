import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Search, Rocket, Calendar, CreditCard, Wrench, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const faqCategories = [
    {
      name: "Getting Started",
      icon: <Rocket className="h-5 w-5 md:h-6 md:w-6 text-deskhive-orange text-left" />,
      questions: [
        {
          question: "What is DeskHive?",
          answer: "DeskHive is Nigeria's premier workspace management solution designed for modern professionals and businesses. Our platform allows you to discover, book, and manage workspaces efficiently, helping organizations optimize their space utilization and employees find the right workspace for their needs."
        },
        {
          question: "How do I create an account?",
          answer: "Creating a DeskHive account is simple. Click on the 'Sign Up' button in the top right corner of our website, fill in your details, and verify your email address. Once verified, you can start exploring and booking workspaces immediately."
        },
        {
          question: "Is DeskHive available on mobile devices?",
          answer: "Yes, DeskHive is fully responsive and works on all devices. You can access all features directly from your mobile browser without any functionality limitations."
        },
        {
          question: "Can I try DeskHive before purchasing?",
          answer: "Absolutely! We offer a 14-day free trial of our Professional plan, which gives you access to most features. No credit card is required to start your trial. Simply sign up and select the 'Start Free Trial' option."
        }
      ]
    },
    {
      name: "Booking & Reservations",
      icon: <Calendar className="h-5 w-5 md:h-6 md:w-6 text-deskhive-orange text-left" />,
      questions: [
        {
          question: "How far in advance can I book a workspace?",
          answer: "You can book workspaces up to 3 months in advance on our Basic plan, and up to 6 months on our Professional and Enterprise plans. This allows for better planning and ensures you always have the workspace you need when you need it."
        },
        {
          question: "Can I cancel or reschedule my booking?",
          answer: "Yes, you can cancel or reschedule your booking through your DeskHive dashboard. For free cancellations, please ensure you cancel at least 24 hours before your scheduled booking time. Cancellations made less than 24 hours in advance may incur a cancellation fee."
        },
        {
          question: "How do I extend my booking?",
          answer: "To extend your booking, go to 'My Bookings' in your dashboard, find the booking you want to extend, and click on the 'Extend' button. If the space is available for the extended time, your booking will be updated immediately. If not, we'll suggest alternative workspaces."
        },
        {
          question: "Can I book a workspace for someone else?",
          answer: "Yes, as a team administrator, you can book workspaces on behalf of your team members. Simply select the team member during the booking process. They will receive a notification about the booking and it will appear in their calendar."
        }
      ]
    },
    {
      name: "Billing & Pricing",
      icon: <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-deskhive-orange text-left" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit and debit cards (including Visa, Mastercard, and Verve), bank transfers, and mobile money services like Paystack and Flutterwave. For enterprise customers, we also offer invoice-based payments."
        },
        {
          question: "How does billing work?",
          answer: "For monthly and annual subscriptions, you'll be billed automatically at the start of each billing period. For workspace bookings outside your plan, you'll be charged at the time of booking. All transactions are secured with bank-grade encryption."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund. For workspace bookings, refunds are available for cancellations made at least 24 hours in advance."
        },
        {
          question: "What happens if I exceed my plan's booking limit?",
          answer: "If you exceed your plan's booking limit, you'll be charged our standard pay-as-you-go rate for additional bookings. You can always upgrade your plan if you find yourself regularly exceeding your current limits for a more cost-effective solution."
        }
      ]
    },
    {
      name: "Technical Support",
      icon: <Wrench className="h-5 w-5 md:h-6 md:w-6 text-deskhive-orange text-left" />,
      questions: [
        {
          question: "How can I get technical support?",
          answer: "You can reach our technical support team via email at support@deskhive.ng, through the live chat on our website, or by calling our customer service line at +234 800 123 4567. Our support team is available Monday to Friday, 8am to 6pm WAT."
        },
        {
          question: "Is there a user guide available?",
          answer: "Yes, we have a comprehensive user guide available in our Help Center. It covers all aspects of using DeskHive, from creating an account to managing bookings and generating reports. You can access it at any time from the 'Help' section in your dashboard."
        },
        {
          question: "Do you offer onboarding for new users?",
          answer: "Yes, we offer personalized onboarding sessions for new users, especially for teams and enterprise customers. These sessions can be scheduled with our customer success team and are tailored to your specific needs and use cases."
        },
        {
          question: "How do I report a bug or issue?",
          answer: "To report a bug or technical issue, please contact our support team with details of the problem, including steps to reproduce it, screenshots if applicable, and your device and browser information. This helps us resolve the issue more quickly."
        }
      ]
    },
    {
      name: "Account Management",
      icon: <User className="h-5 w-5 md:h-6 md:w-6 text-deskhive-orange text-left" />,
      questions: [
        {
          question: "How do I update my profile information?",
          answer: "You can update your profile information by logging into your account, clicking on your profile picture in the top right corner, and selecting 'Profile Settings'. From there, you can edit your personal information, change your password, and update your notification preferences."
        },
        {
          question: "Can I have multiple users under one account?",
          answer: "Yes, our Professional and Enterprise plans support team accounts with multiple users. As an account administrator, you can add team members, assign them roles, and manage their permissions. Each team member will have their own login credentials."
        },
        {
          question: "How do I reset my password?",
          answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account by going to 'Profile Settings' and selecting 'Delete Account'. Please note that this action is irreversible and will permanently remove all your data from our system. If you have an active subscription, you'll need to cancel it before deleting your account."
        }
      ]
    }
  ];

  // Filter questions based on search query
  const filteredCategories = faqCategories.map(category => {
    return {
      ...category,
      questions: category.questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
  }).filter(category => category.questions.length > 0);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(categoryName.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      // Add offset for fixed header
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-10 pt-28 md:pt-32 md:py-16 px-2 md:px-8 bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deskhive-navy mb-4 md:mb-6 animate-fade-in">
                Frequently Asked Questions
              </h1>
              <p className="text-base md:text-lg text-deskhive-darkgray/80 mb-6 md:mb-10 animate-fade-in">
                Find answers to common questions about DeskHive's workspace management platform.
              </p>
              
              <div className="relative max-w-xl mx-auto animate-fade-in">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 md:h-5 md:w-5 text-deskhive-darkgray/50" />
                </div>
                <Input
                  type="text"
                  className="glass-input w-full pl-10 focus:ring-deskhive-navy/30"
                  placeholder="Search FAQ questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Categories */}
        <section className="py-10 md:py-16 px-2 md:px-8 bg-white">
          <div className="container mx-auto">
            {/* Category buttons - horizontal scrollable on mobile */}
            <div className="overflow-x-auto pb-4 mb-8 md:mb-16 -mx-2 px-2 md:px-0 md:overflow-visible">
              <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 w-max md:w-auto md:max-w-6xl mx-auto">
                {faqCategories.map((category, index) => (
                  <button 
                    key={index}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`glass-card p-3 md:p-6 text-center hover:shadow-lg transition-all duration-300 flex flex-col items-center min-w-[120px] md:min-w-0 ${
                      activeCategory === category.name ? 'ring-2 ring-deskhive-orange/50' : ''
                    }`}
                  >
                    <div className="bg-deskhive-skyblue/50 p-2 md:p-3 rounded-full mb-2 md:mb-3">
                      {category.icon}
                    </div>
                    <h3 className="text-sm md:text-base font-medium text-deskhive-navy">{category.name}</h3>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {searchQuery && filteredCategories.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-deskhive-darkgray">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery('')}
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                </div>
              )}
              
              {(searchQuery ? filteredCategories : faqCategories).map((category, categoryIndex) => (
                <div 
                  key={categoryIndex} 
                  id={category.name.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-10 md:mb-16 scroll-mt-24"
                >
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="bg-deskhive-skyblue/50 p-2 rounded-full mr-3">
                      {category.icon}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-deskhive-navy">
                      {category.name}
                    </h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`item-${categoryIndex}-${faqIndex}`} 
                        className="glass-card border border-gray-100 shadow-sm"
                      >
                        <AccordionTrigger className="text-base md:text-lg font-medium text-deskhive-navy px-4 md:px-6 py-3 md:py-4 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base text-deskhive-darkgray/80 px-4 md:px-6 pb-4 md:pb-6 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Still Have Questions */}
        <section className="py-10 md:py-16 px-2 md:px-8 bg-deskhive-skyblue">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center glass-card p-4 md:p-10 shadow-md">
              <h2 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-3 md:mb-6">Still Have Questions?</h2>
              <p className="text-base md:text-lg text-deskhive-darkgray/80 mb-6 md:mb-8">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button asChild variant="default" className="btn-primary">
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5">
                  <a href="mailto:support@deskhive.ng">Email Us</a>
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

export default FAQ;
