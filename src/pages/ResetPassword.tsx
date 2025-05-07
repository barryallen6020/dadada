import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Save, Loader2, Eye, EyeOff } from "lucide-react";
import LogoFull from "@/components/common/LogoFull";
import { Card, CardContent } from "@/components/ui/card";
import { resetPassword, getCurrentUser } from "@/services/authService";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the reset token from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("token");

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

  // Check if token is present
  useEffect(() => {
    if (!resetToken) {
      toast.error("The password reset link is invalid or has expired. Please request a new one.");
      navigate('/forgot-password');
    }
  }, [resetToken, navigate]);

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
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
    
    if (strength < 3) {
      setPasswordError("Password is too weak");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    if (passwordStrength < 3) {
      setPasswordError("Password is too weak. It should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.");
      return;
    }
    
    if (!resetToken) {
      toast.error("Reset token is missing. Please use the link from your email.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await resetPassword(formData.password, resetToken);
      
      if (result.success) {
        toast.success("Your password has been reset successfully. You can now log in with your new password.");
        navigate('/login');
      } else {
        toast.error(result.message || "There was an error resetting your password. The link may have expired.");
      }
    } catch (error) {
      toast.error("There was an error resetting your password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center mb-8">
          <LogoFull />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Reset Your Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new password for your account
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input 
                    id="password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="New password" 
                    required 
                    value={formData.password} 
                    onChange={handleChange} 
                    className={passwordError && formData.password ? "border-red-500" : ""}
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {formData.password && (
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        passwordStrength < 3 ? "bg-red-500" : 
                        passwordStrength < 4 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                )}
                
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"} 
                    placeholder="Confirm new password" 
                    required 
                    value={formData.confirmPassword} 
                    onChange={handleChange}
                    className={passwordError && formData.confirmPassword ? "border-red-500" : ""}
                  />
                </div>
                
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-deskhive-navy hover:bg-deskhive-navy/90 flex items-center justify-center gap-2"
                disabled={isLoading || !!passwordError}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Reset Password
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <Link to="/login" className="text-gray-600 hover:text-gray-900 inline-flex items-center text-sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
