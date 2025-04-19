
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Check } from "lucide-react";
import LogoFull from "@/components/common/LogoFull";
import { Card, CardContent } from "@/components/ui/card";
import { authService } from "@/services/authService";
import { LoadingDisplay } from "@/components/common/LoadingDisplay";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authService.forgotPassword(email);
      
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Reset email sent",
          description: "Check your inbox for password reset instructions",
        });
      } else {
        toast({
          title: "Request failed",
          description: result.message || "Please check your email and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Request failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-2xl font-semibold text-gray-900">
            {isSubmitted ? "Check your email" : "Reset your password"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isSubmitted
              ? `We've sent a password reset link to ${email}`
              : "Enter your email and we'll send you instructions to reset your password"}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                
                <p className="text-gray-700">
                  If an account exists with this email, you'll receive instructions to reset your password shortly.
                </p>
                
                <p className="text-sm text-gray-600 mt-4">
                  Don't see the email? Check your spam folder or try again.
                </p>

                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try another email
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Send Reset Instructions
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mt-6 text-sm">
          <Link to="/login" className="text-deskhive-royal hover:underline">
            Back to Login
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

export default ForgotPassword;
