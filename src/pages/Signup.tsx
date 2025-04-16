import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { organizations } from "@/data/workspaces";
import LoadingDisplay from "@/components/common/LoadingDisplay";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationCode: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const [orgError, setOrgError] = useState("");

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

    if (name === "organizationCode") {
      // Check if organization code exists
      const orgExists = organizations.some(org => 
        org.id.toLowerCase() === value.toLowerCase()
      );
      
      if (value && !orgExists) {
        setOrgError("Organization not found. Please check the code.");
      } else {
        setOrgError("");
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
    
    if (formData.organizationCode && orgError) {
      toast({
        title: "Invalid organization",
        description: "The organization code you entered doesn't exist.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    try {
      // Get organization if code provided
      let userOrg = null;
      if (formData.organizationCode) {
        userOrg = organizations.find(org => 
          org.id.toLowerCase() === formData.organizationCode.toLowerCase()
        );
      }
      
      // Determine user role - if it's a special admin code, make them admin
      const isAdmin = formData.organizationCode === "admin123"; // Special admin code for testing
      
      // In a real application, you would send this data to a backend
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          role: isAdmin ? "admin" : "employee",
          organizationCode: formData.organizationCode || null
        }));
        
        // Only set current organization if organization code was provided
        if (userOrg) {
          localStorage.setItem('currentOrganizationId', userOrg.id);
        }
        
        toast({
          title: "Account created successfully",
          description: `Welcome to DeskHive, ${formData.fullName}!`,
        });
        
        // Redirect to the appropriate dashboard based on role
        if (isAdmin) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1500);
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

  if (isLoading) {
    return <LoadingDisplay />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-deskhive-skyblue to-white">
        <div className="w-full max-w-md p-8 bg-white/90 rounded-lg shadow-xl backdrop-blur-sm border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-deskhive-navy">Sign Up</h1>
            <p className="text-deskhive-darkgray mt-2">Join DeskHive to book workspaces</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organizationCode">Organization Code (Optional)</Label>
              <Input
                id="organizationCode"
                name="organizationCode"
                type="text"
                placeholder="e.g., alx, microsoft, etc."
                value={formData.organizationCode}
                onChange={handleChange}
                className={orgError ? "border-red-500" : ""}
              />
              {orgError ? (
                <p className="text-sm text-red-500">{orgError}</p>
              ) : (
                <p className="text-xs text-deskhive-darkgray/70">
                  Enter your organization's code if you have one, otherwise leave blank to browse public workspaces
                </p>
              )}
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
              
              {/* Password strength indicator */}
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
            
            <Button 
              type="submit" 
              className="w-full btn-primary h-11 bg-gradient-to-r from-deskhive-navy to-deskhive-royal hover:opacity-90 transition-opacity"
              disabled={isLoading || !!passwordError || !!orgError}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-deskhive-darkgray text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-deskhive-royal hover:underline font-medium">
                Log in
              </Link>
            </p>
            <p className="text-deskhive-darkgray/70 text-xs mt-2">
              Need to create an organization?{" "}
              <Link to="/register" className="text-deskhive-royal hover:underline">
                Register your organization
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
