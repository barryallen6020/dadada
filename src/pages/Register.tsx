import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationCode: "",
    plan: "starter",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");

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
    
    if (name === "organizationName" && !formData.organizationCode) {
      const suggestedCode = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 12);
      
      setFormData((prev) => ({ ...prev, organizationCode: suggestedCode }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, plan: value }));
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

  const nextStep = () => {
    if (step === 1) {
      if (!formData.organizationName || !formData.organizationCode || !formData.plan) {
        toast({
          title: "Missing information",
          description: "Please fill in all organization details to continue.",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
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
    
    setIsLoading(true);
    
    try {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        role: "admin",
        organization: {
          name: formData.organizationName,
        }
      }));
      
      toast({
        title: "Organization registered successfully",
        description: `${formData.organizationName} has been created.`,
      });
      
      navigate("/admin");
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

  const renderStepIndicator = () => {
    return (
      <div className="mb-6">
        <Progress value={step === 1 ? 50 : 100} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-deskhive-darkgray/70">
          <div className={step >= 1 ? "font-semibold text-deskhive-navy" : ""}>
            Organization Information
          </div>
          <div className={step >= 2 ? "font-semibold text-deskhive-navy" : ""}>
            Admin Account Setup
          </div>
        </div>
      </div>
    );
  };

  const renderOrganizationStep = () => {
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="organizationName">Organization Name</Label>
          <Input
            id="organizationName"
            name="organizationName"
            type="text"
            placeholder="Acme Corporation"
            required
            value={formData.organizationName}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="organizationCode">Organization Code (URL Identifier)</Label>
          <Input
            id="organizationCode"
            name="organizationCode"
            type="text"
            placeholder="acme"
            required
            value={formData.organizationCode}
            onChange={handleChange}
          />
          <p className="text-xs text-deskhive-darkgray/70">
            This will be used in your URL: deskhive.com/hub/{formData.organizationCode || "yourcode"}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="plan">Select Plan</Label>
          <Select defaultValue={formData.plan} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starter">Starter (Free)</SelectItem>
              <SelectItem value="pro">Pro (₦77,487/month)</SelectItem>
              <SelectItem value="business">Business (₦235,625/month)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-deskhive-darkgray/70">
            You can change your plan anytime. View our <Link to="/pricing" className="text-deskhive-royal hover:underline">pricing details</Link>.
          </p>
        </div>

        <Button 
          type="button" 
          className="w-full btn-primary h-11 mt-6" 
          onClick={nextStep}
        >
          Continue
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </>
    );
  };

  const renderAdminAccountStep = () => {
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@yourcompany.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 hover:text-deskhive-darkgray"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded-full ${
                    passwordStrength >= level
                      ? passwordStrength === 1
                        ? "bg-red-500"
                        : passwordStrength === 2
                        ? "bg-orange-500"
                        : passwordStrength === 3
                        ? "bg-yellow-500"
                        : "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-deskhive-darkgray/70">
              {passwordStrength === 0 && "Enter a strong password"}
              {passwordStrength === 1 && "Weak password"}
              {passwordStrength === 2 && "Moderate password"}
              {passwordStrength === 3 && "Good password"}
              {passwordStrength === 4 && "Strong password"}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={passwordError ? "border-red-500 pr-10" : "pr-10"}
            />
            {formData.confirmPassword && !passwordError && (
              <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
            )}
          </div>
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
        </div>

        <div className="flex items-start space-x-2 my-4">
          <Checkbox 
            id="terms" 
            onCheckedChange={handleCheckboxChange}
            checked={formData.agreeToTerms}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm text-deskhive-darkgray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-deskhive-royal hover:underline">
                Terms of Service
              </Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-deskhive-royal hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <Button 
            type="button" 
            variant="outline"
            className="flex-1"
            onClick={prevStep}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            type="submit" 
            className="flex-1 btn-primary"
            disabled={isLoading || !!passwordError}
          >
            {isLoading ? "Creating..." : "Create Organization"}
          </Button>
        </div>
      </>
    );
  };

  if (isLoading) {
    return <LoadingDisplay />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-deskhive-skyblue to-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-deskhive-navy">Register Your Organization</h1>
            <p className="mt-2 text-gray-600">Create a workspace for your team</p>
          </div>
          
          <div className="bg-white/90 rounded-lg shadow-xl backdrop-blur-sm border border-white/20 p-8">
            <div className="flex items-center gap-4 mb-6">
              <Link 
                to="/" 
                className="text-deskhive-darkgray hover:text-deskhive-navy flex items-center gap-2"
              >
                <ChevronLeft className="h-5 w-5" />
                Back to home
              </Link>
            </div>
            
            {renderStepIndicator()}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && renderOrganizationStep()}
              {step === 2 && renderAdminAccountStep()}
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-deskhive-darkgray text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-deskhive-royal hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
