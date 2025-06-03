import React, {useState} from "react";
import {motion} from "framer-motion";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Check, ChevronRight, Mail, MapPin, Calendar, Star, User, Users} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import LogoFull from "@/components/common/LogoFull";
import api from "@/lib/api";


const waitlistSchema = z.object({
    fullName: z.string().min(2, {message: "Full name must be at least 2 characters"}),
    email: z.string().email({message: "Please enter a valid email address"}),
    phoneNumber: z.string().min(10, {message: "Phone number must be at least 10 digits"}),
    companyName: z.string().optional(),
    role: z.string({required_error: "Please select your role"}),
    howHeard: z.string({required_error: "Please select how you heard about us"}),
    promotional: z.boolean().default(true),
    newsletter: z.boolean().default(false),
    // updates: z.boolean().default(true)
});
type WaitlistFormValues = z.infer<typeof waitlistSchema>;
const PreLaunch = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShare = (platform: string) => {
        const url = 'https://deskhive.ng';
        const text = 'Check out DeskHive - Nigeria\'s premier workspace booking and management platform!';

        switch (platform) {
            case 'Twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'LinkedIn':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'WhatsApp':
                window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`, '_blank');
                break;
        }
    };

    const form = useForm<WaitlistFormValues>({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            companyName: "",
            role: "",
            howHeard: "",
            promotional: true,
            newsletter: true,
        }
    });
    const onSubmit = async (values: WaitlistFormValues) => {
        setIsLoading(true);

        try {
            const response = await api.post('waitlist/', form.getValues());
            console.log(response.data);
            setIsSubmitted(true);
            toast.success("You've been added to our waitlist!", {
                description: "We'll notify you when DeskHive launches."
            });
        } catch (error) {
           if (error.response?.status === 409) {
                toast.error("This email has already been registered. Please use a different email.");
            } else {
                toast.error("An error occurred while adding you to the waitlist. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    const containerVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };
    const itemVariants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };
    const gradientVariants = {
        animate: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            transition: {
                repeat: Infinity,
                duration: 15,
                ease: "linear"
            }
        }
    };
    const features = [{
        icon: <Calendar className="h-8 w-8 text-white/80"/>,
        title: "Smart Booking",
        description: "Effortlessly book workspaces with a few clicks"
    }, {
        icon: <MapPin className="h-8 w-8 text-white/80"/>,
        title: "Interactive Floor Plans",
        description: "Visualize and select ideal workspaces in real-time"
    }, {
        icon: <Users className="h-8 w-8 text-white/80"/>,
        title: "Team Management",
        description: "Coordinate teams and manage workspace utilization"
    }];
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-deskhive-navy to-deskhive-royal text-white">
                {/* Animated background gradient */}
                <motion.div className="absolute inset-0 pointer-events-none" style={{
                    background: "linear-gradient(125deg, #022B60 0%, #0056B3 50%, #022B60 100%)",
                    backgroundSize: "200% 200%"
                }} variants={gradientVariants} animate="animate"></motion.div>

                {/* Orbital particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => <div key={i} className="absolute rounded-full bg-white/10" style={{
                        width: `${Math.random() * 12 + 4}px`,
                        height: `${Math.random() * 12 + 4}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 10 + 10}s linear infinite`
                    }}/>)}
                </div>

                {/* Header with logo */}
                <header className="relative z-10 p-6 flex justify-center md:justify-start">
                    <div className="container flex items-center">
                        <LogoFull/>
                    </div>
                </header>

                {/* Main content */}
                <main className="relative z-10 flex-grow flex items-center">
                    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
                                    variants={containerVariants} initial="hidden" animate="visible">
                            {/* Left column: Copy */}
                            <motion.div variants={itemVariants}>
                                <span
                                    className="inline-block border-deskhive-orange border-2 bg-deskhive-orange/40 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 shadow-lg">Coming Soon</span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                    The Future of <span className="text-deskhive-orange">Workspace</span> Management
                                </h1>
                                <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg">
                                    Join the waitlist for exclusive early access to DeskHive - Nigeria's premier
                                    workspace booking and management platform.
                                </p>

                                <div className="space-y-4 mb-8">
                                    {features.map((feature, index) => <motion.div key={index}
                                                                                  className="flex items-start"
                                                                                  variants={itemVariants}>
                                        <div className="mr-4 rounded-lg bg-white/10 p-2">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">{feature.title}</h3>
                                            <p className="text-white/70">{feature.description}</p>
                                        </div>
                                    </motion.div>)}
                                </div>

                                <div className="flex items-center space-x-2 mb-8">
                                    <div className="flex -space-x-3">
                                        <img src="/waitinglist/central.png" alt="Central"
                                             className="w-8 h-8 rounded-full bg-white border-2 border-white/20"/>
                                        <img src="/waitinglist/alx.png" alt="Alx"
                                             className="w-8 h-8 rounded-full border-2 border-white/20"/>
                                    </div>
                                    <p className="text-white/80 text-sm">
                                        Already trusted by forward-thinking organizations
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right column: Form */}
                            <motion.div variants={itemVariants}
                                        className="glass-gradient backdrop-blur-md rounded-xl border border-white/20 p-6 md:p-8 shadow-2xl">
                                {!isSubmitted ? <>
                                    <div className="mb-6">
                                        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                                            Join Our Waitlist
                                        </h2>
                                        <p className="text-white/70">
                                            Be the first to experience DeskHive when we launch
                                        </p>
                                    </div>

                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                            <FormField control={form.control} name="fullName" render={({
                                                                                                       field
                                                                                                   }) => <FormItem>
                                                <FormLabel className="text-white">Full Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-2.5 h-5 w-5 text-white"/>
                                                        <Input placeholder="Your name"
                                                               className="placeholder-white pl-10 bg-white/10 border-white/20 text-white" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>}/>

                                            <FormField control={form.control} name="email" render={({
                                                                                                        field
                                                                                                    }) => <FormItem>
                                                <FormLabel className="text-white">Email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white"/>
                                                        <Input placeholder="you@example.com"
                                                               className="placeholder-white pl-10 bg-white/10 border-white/20 text-white" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>}/>

                                            <FormField
                                                control={form.control}
                                                name="phoneNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white">Phone Number</FormLabel>
                                                        <FormControl>
                                                            <Input className="placeholder-white bg-white/10 border-white/20 text-white"
                                                                   placeholder="07015123450" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField control={form.control} name="companyName" render={({
                                                                                                              field
                                                                                                          }) =>
                                                <FormItem>
                                                    <FormLabel className="text-white">Company Name
                                                        (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your company"
                                                               className="placeholder-white bg-white/10 border-white/20 text-white" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>}/>

                                            <FormField control={form.control} name="role" render={({
                                                                                                       field
                                                                                                   }) => <FormItem>
                                                <FormLabel className="text-white">Your Role</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger
                                                            className="bg-white/10 border-white/20 text-white">
                                                            <SelectValue placeholder="Select your role"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="individual">Individual
                                                            Professional</SelectItem>
                                                        <SelectItem value="team_lead">Team Lead / Manager</SelectItem>
                                                        <SelectItem value="executive">Executive / Director</SelectItem>
                                                        <SelectItem value="admin">Office Admin</SelectItem>
                                                        <SelectItem value="space_provider">Space Provider</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>}/>

                                            <FormField
                                                control={form.control}
                                                name="howHeard"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white">How did you hear about us?</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                                                    <SelectValue placeholder="Select an option" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Radio">Radio</SelectItem>
                                                                <SelectItem value="TV">TV</SelectItem>
                                                                <SelectItem value="Social Media">Social Media</SelectItem>
                                                                <SelectItem value="Friend">Friend</SelectItem>
                                                                <SelectItem value="Other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField control={form.control} name="promotional" render={({
                                                                                                          field
                                                                                                      }) => <FormItem
                                                className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange}
                                                              className="data-[state=checked]:bg-deskhive-orange"/>
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-white">
                                                        Send me updates about DeskHive's launch, features and newsletter
                                                    </FormLabel>
                                                </div>
                                            </FormItem>}/>

                                            <Button type="submit"
                                                    className="w-full bg-deskhive-orange text-white hover:bg-deskhive-orange/90"
                                                    disabled={isLoading}>
                                                {isLoading ? "Processing..." : "Join Waitlist"}
                                                <ChevronRight className="ml-2 h-4 w-4"/>
                                            </Button>
                                        </form>
                                    </Form>

                                    {/* <p className="text-white/50 text-xs mt-4 text-center">
                      By joining, you agree to our {" "}
                      <a href="/terms-of-service" className="underline hover:text-white">Terms of Service</a> and{" "}
                      <a href="/privacy-policy" className="underline hover:text-white">Privacy Policy</a>
                    </p> */}
                                </> : <motion.div initial={{
                                    opacity: 0,
                                    scale: 0.8
                                }} animate={{
                                    opacity: 1,
                                    scale: 1
                                }} className="text-center py-8">
                                    <div
                                        className="w-16 h-16 bg-deskhive-orange rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="h-8 w-8 text-white"/>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">You're on the list!</h3>
                                    <p className="text-white/70 mb-6">
                                        Thank you for joining our waitlist. We'll notify you when DeskHive launches.
                                    </p>
                                    <div className="max-w-sm mx-auto p-4 border border-white/10 rounded-lg">
                                        <p className="text-white/80 mb-2">Share with colleagues</p>
                                        <div className="flex justify-center space-x-4">
                                            {["Twitter", "LinkedIn", "WhatsApp"].map(platform => (
                                                <Button
                                                    key={platform}
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-white/20 text-white bg-white/10 hover:bg-white hover:text-deskhive-navy"
                                                    onClick={() => handleShare(platform)}
                                                >
                                                    {platform}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>}
                            </motion.div>
                        </motion.div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 py-6">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-white/60 text-sm">
                                © 2025 DeskHive. All rights reserved.
                            </p>

                        </div>
                    </div>
                </footer>
            </div>
            <style>
                {`
          input::placeholder,
          textarea::placeholder {
            color: white !important;
            opacity: 0.7;
          }
          
          /* For Microsoft Edge */
          input::-ms-input-placeholder,
          textarea::-ms-input-placeholder {
            color: white !important;
            opacity: 0.7;
          }
          
          /* For Mozilla Firefox */
          input::-moz-placeholder,
          textarea::-moz-placeholder {
            color: white !important;
            opacity: 0.7;
          }
        `}
            </style>
        </>
    );
};
export default PreLaunch;
