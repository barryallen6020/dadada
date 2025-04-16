
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-deskhive-orange" />,
      title: "Our Location",
      details: "23 Kofo Abayomi Street, Victoria Island, Lagos, Nigeria",
      action: null
    },
    {
      icon: <Phone className="h-6 w-6 text-deskhive-orange" />,
      title: "Phone Number",
      details: "+234 800 123 4567",
      action: {
        text: "Call Us",
        href: "tel:+2348001234567"
      }
    },
    {
      icon: <Mail className="h-6 w-6 text-deskhive-orange" />,
      title: "Email Address",
      details: "info@deskhive.ng",
      action: {
        text: "Email Us",
        href: "mailto:info@deskhive.ng"
      }
    },
    {
      icon: <Clock className="h-6 w-6 text-deskhive-orange" />,
      title: "Office Hours",
      details: "Monday - Friday: 8am - 6pm",
      details2: "Saturday: 9am - 1pm",
      action: null
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-deskhive-navy mb-6 animate-fade-in">
                Get in Touch
              </h1>
              <p className="text-xl text-deskhive-darkgray/80 mb-10 animate-fade-in">
                Have questions about DeskHive? Our team is here to help you.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information Cards */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {contactInfo.map((item, index) => (
                <Card key={index} className="glass-card border-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-deskhive-navy/5 p-3 rounded-full mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-deskhive-navy mb-2">{item.title}</h3>
                      <p className="text-deskhive-darkgray/80 mb-1">{item.details}</p>
                      {item.details2 && <p className="text-deskhive-darkgray/80 mb-4">{item.details2}</p>}
                      {item.action && (
                        <a
                          href={item.action.href}
                          className="text-deskhive-royal font-medium hover:text-deskhive-navy transition-colors"
                        >
                          {item.action.text}
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Form and Map */}
        <section className="section-padding bg-deskhive-skyblue">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Contact Form */}
                <div className="w-full lg:w-1/2 glass-card p-8">
                  <div className="flex items-center mb-6">
                    <MessageSquare className="h-6 w-6 text-deskhive-orange mr-3" />
                    <h2 className="text-2xl font-bold text-deskhive-navy">Send Us a Message</h2>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="glass-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} className="glass-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+234 800 123 4567" {...field} className="glass-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company Ltd." {...field} className="glass-input" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="How can we help you?" {...field} className="glass-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please describe how we can help you..." 
                                className="glass-input min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" variant="default" className="btn-primary w-full">
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </div>
                
                {/* Map */}
                <div className="w-full lg:w-1/2 glass-card p-8 flex flex-col">
                  <h2 className="text-2xl font-bold text-deskhive-navy mb-6">Find Us on the Map</h2>
                  <div className="flex-grow rounded-lg overflow-hidden bg-white/50 h-[400px] flex items-center justify-center">
                    <div className="text-center p-6">
                      <p className="text-deskhive-darkgray/80 mb-4">Interactive map will be displayed here</p>
                      <p className="text-sm text-deskhive-darkgray/60">
                        Our office is located in the heart of Victoria Island, Lagos's premier business district
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Support Options */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-deskhive-navy mb-12">We're Here to Help</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-6">
                  <div className="bg-deskhive-navy/5 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-7 w-7 text-deskhive-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-3">Live Chat</h3>
                  <p className="text-deskhive-darkgray/80 mb-4">
                    Chat with our support team in real-time during business hours.
                  </p>
                  <Button variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 w-full">
                    Start Chat
                  </Button>
                </div>
                
                <div className="glass-card p-6">
                  <div className="bg-deskhive-navy/5 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-7 w-7 text-deskhive-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-3">Email Support</h3>
                  <p className="text-deskhive-darkgray/80 mb-4">
                    Send us an email and we'll respond within 24 hours.
                  </p>
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 w-full"
                  >
                    <a href="mailto:support@deskhive.ng">Email Us</a>
                  </Button>
                </div>
                
                <div className="glass-card p-6">
                  <div className="bg-deskhive-navy/5 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-7 w-7 text-deskhive-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-3">Phone Support</h3>
                  <p className="text-deskhive-darkgray/80 mb-4">
                    Call us directly for immediate assistance during business hours.
                  </p>
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5 w-full"
                  >
                    <a href="tel:+2348001234567">Call Now</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
