
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import LogoFull from "@/components/common/LogoFull";
import { Card, CardContent } from "@/components/ui/card";
import { authService } from "@/services/authService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("individual");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const [individualForm, setIndividualForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const [orgForm, setOrgForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    orgName: "",
    orgDomain: "",
  });

  const handleIndividualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIndividualForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrgForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIndividualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please agree to the Terms of Service and Privacy Policy",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await authService.signup({
        firstName: individualForm.firstName,
        lastName: individualForm.lastName,
        email: individualForm.email,
        password: individualForm.password,
      });

      if (result.success) {
        toast({
          title: "Registration successful!",
          description: "Your account has been created. Please check your email for verification.",
        });
        
        // Auto login after signup
        const loginResult = await authService.login({
          email: individualForm.email,
          password: individualForm.password,
        });
        
        if (loginResult.success) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } else {
        // Type check for message property
        const errorMessage = 'message' in result ? result.message : "Please try again.";
        toast({
          title: "Registration failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please agree to the Terms of Service and Privacy Policy",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await authService.signupWithOrg({
        firstName: orgForm.firstName,
        lastName: orgForm.lastName,
        email: orgForm.email,
        password: orgForm.password,
        orgName: orgForm.orgName,
        orgDomain: orgForm.orgDomain,
      });

      if (result.success) {
        toast({
          title: "Registration successful!",
          description: "Your organization account has been created. Please check your email for verification.",
        });
        
        // Auto login after signup
        const loginResult = await authService.login({
          email: orgForm.email,
          password: orgForm.password,
        });
        
        if (loginResult.success) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      } else {
        // Type check for message property
        const errorMessage = 'message' in result ? result.message : "Please try again.";
        toast({
          title: "Registration failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <LoadingDisplay />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center mb-8">
          <LogoFull />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Join DeskHive to find and book workspaces
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="organization">Organization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="individual">
                <form onSubmit={handleIndividualSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        required
                        value={individualForm.firstName}
                        onChange={handleIndividualChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        value={individualForm.lastName}
                        onChange={handleIndividualChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email address"
                      required
                      value={individualForm.email}
                      onChange={handleIndividualChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (minimum 8 characters)"
                        required
                        minLength={8}
                        value={individualForm.password}
                        onChange={handleIndividualChange}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreed} 
                      onCheckedChange={(checked) => setAgreed(checked as boolean)} 
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link to="/terms-of-service" className="text-deskhive-royal hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy-policy" className="text-deskhive-royal hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={!agreed}>
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="organization">
                <form onSubmit={handleOrgSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orgFirstName">First Name</Label>
                      <Input
                        id="orgFirstName"
                        name="firstName"
                        placeholder="First Name"
                        required
                        value={orgForm.firstName}
                        onChange={handleOrgChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="orgLastName">Last Name</Label>
                      <Input
                        id="orgLastName"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        value={orgForm.lastName}
                        onChange={handleOrgChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="orgEmail">Email</Label>
                    <Input
                      id="orgEmail"
                      name="email"
                      type="email"
                      placeholder="Email address"
                      required
                      value={orgForm.email}
                      onChange={handleOrgChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="orgPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="orgPassword"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (minimum 8 characters)"
                        required
                        minLength={8}
                        value={orgForm.password}
                        onChange={handleOrgChange}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      name="orgName"
                      placeholder="Organization Name"
                      required
                      value={orgForm.orgName}
                      onChange={handleOrgChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="orgDomain">Organization Domain</Label>
                    <Input
                      id="orgDomain"
                      name="orgDomain"
                      placeholder="example.com"
                      required
                      value={orgForm.orgDomain}
                      onChange={handleOrgChange}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="orgTerms" 
                      checked={agreed} 
                      onCheckedChange={(checked) => setAgreed(checked as boolean)} 
                    />
                    <label
                      htmlFor="orgTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link to="/terms-of-service" className="text-deskhive-royal hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy-policy" className="text-deskhive-royal hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={!agreed}>
                    Create Organization
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between mt-6 text-sm">
          <div>
            Already have an account?{" "}
            <Link to="/login" className="text-deskhive-royal hover:underline">
              Sign in
            </Link>
          </div>
          <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
