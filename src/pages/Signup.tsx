import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, CheckCircle2, Building } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { organizations } from "@/data/workspaces";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { signUp, signUpWithOrg, checkEmailExists, getCurrentUser } from "@/services/authService";
import LogoFull from "@/components/common/LogoFull";
import { Card, CardContent } from "@/components/ui/card";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOrgSignup = searchParams.get('type') === 'organization';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(isOrgSignup ? "organization" : "individual");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    orgName: "",
    orgDomain: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    try {
      const user = getCurrentUser();
      if (user) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
      // Clear any potentially corrupted data
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }, [navigate]);

  // Add effect to handle URL parameter changes
  useEffect(() => {
    if (isOrgSignup) {
      setActiveTab("organization");
    }
  }, [isOrgSignup]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "password") {
      checkPasswordStrength(value);
    }
    
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }

    if (name === "email") {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  // Check if email exists when email field loses focus
  const handleEmailBlur = async () => {
    if (formData.email && !emailError) {
      setIsCheckingEmail(true);
      try {
        const result = await checkEmailExists(formData.email);
        if (result.success && result.data?.exists) {
          setEmailError("This email is already registered. Please use a different email or login.");
        }
      } catch (error) {
        console.error("Error checking email:", error);
      } finally {
        setIsCheckingEmail(false);
      }
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
    
    if (formData.confirmPassword && formData.confirmPassword !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    if (emailError) {
      toast({
        title: "Invalid email",
        description: emailError,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      let result;
      
      if (activeTab === "individual") {
        // Regular user signup
        result = await signUp(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password
        );
      } else {
        // Organization signup
        result = await signUpWithOrg(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password,
          formData.orgName,
          formData.orgDomain
        );
      }
      
      if (result.success) {
        toast({
          title: "Account created successfully",
          description: `Welcome to DeskHive, ${formData.firstName}!`,
        });
        
        // Redirect to login page
        navigate("/login");
      } else {
        toast({
          title: "Registration failed",
          description: result.message || "An error occurred during registration. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getDescriptionText = () => {
    return activeTab === "organization" 
      ? "Create a workspace for your team"
      : "Join DeskHive to book workspaces";
  };

  if (isLoading) {
    return <LoadingDisplay />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-deskhive-skyblue to-white">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center mb-8">
          <LogoFull />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-deskhive-navy">Sign Up</h1>
          <p className="mt-2 text-sm text-deskhive-darkgray/80">
            {getDescriptionText()}
          </p>
          </div>
          
        <Card className="bg-white/90 backdrop-blur-sm border border-white/20">
          <CardContent className="pt-6">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="individual">Individual</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
            </TabsList>
          
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
              {isCheckingEmail && (
                <p className="text-blue-500 text-sm mt-1">Checking email availability...</p>
              )}
            </div>
            
            {activeTab === "organization" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    name="orgName"
                    type="text"
                    placeholder="My Organization"
                    required={activeTab === "organization"}
                    value={formData.orgName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orgDomain">Organization Domain</Label>
                  <Input
                    id="orgDomain"
                    name="orgDomain"
                    type="text"
                    placeholder="example.com"
                    required={activeTab === "organization"}
                    value={formData.orgDomain}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
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
              
              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-600">Password strength:</div>
                    <div className="text-sm">
                      {passwordStrength === 0 && "Very weak"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Medium"}
                      {passwordStrength === 3 && "Strong"}
                      {passwordStrength === 4 && "Very strong"}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength === 0 ? 'bg-red-500' : passwordStrength === 1 ? 'bg-orange-500' : passwordStrength === 2 ? 'bg-yellow-500' : passwordStrength === 3 ? 'bg-green-500' : 'bg-emerald-500'}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                  <ul className="mt-2 text-xs space-y-1 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle2 className={`h-3 w-3 mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`} />
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className={`h-3 w-3 mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`} />
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className={`h-3 w-3 mr-1 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`} />
                      At least one number
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className={`h-3 w-3 mr-1 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`} />
                      At least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="agreeToTerms"
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
            
            <Button
              type="submit"
              className="w-full bg-deskhive-navy hover:bg-deskhive-navy/90"
              disabled={!!passwordError || isCheckingEmail}
            >
              Create Account
            </Button>
          </form>
            </Tabs>
          </CardContent>
        </Card>
          
        <div className="text-center mt-6">
          <p className="text-sm text-deskhive-darkgray">
              Already have an account?{" "}
            <Link to="/login" className="text-deskhive-royal hover:underline">
                Sign in
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
