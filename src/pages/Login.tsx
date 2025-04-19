import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import LoadingDisplay from "@/components/common/LoadingDisplay";
import LogoFull from "@/components/common/LogoFull";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    try {
      // In a real application, you would send this data to a backend
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({
          name: "John Doe",
          email: formData.email,
          role: "employee",
        }));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${formData.email}!`,
        });
        
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
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
          <h1 className="text-2xl font-semibold text-gray-900">Sign in to DeskHive</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and password to access your account
          </p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
              </div>

              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-sm text-deskhive-royal hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-deskhive-navy hover:bg-deskhive-navy/90"
              >
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between mt-6 text-sm">
          <Link to="/signup" className="text-deskhive-royal hover:underline">
            Create an account
          </Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
