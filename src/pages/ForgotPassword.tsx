import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send } from "lucide-react";
import LogoFull from "@/components/common/LogoFull";
import { Card, CardContent } from "@/components/ui/card";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const {
    toast
  } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setTimeout(() => {
        toast({
          title: "Password reset email sent",
          description: `A password reset link has been sent to ${email}. Please check your inbox.`
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "Error sending email",
        description: "There was an error sending the password reset email. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center mb-8">
          <LogoFull />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Email address" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>

              <Button type="submit" className="w-full bg-deskhive-navy hover:bg-deskhive-navy/90 flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Send Reset Link
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

export default ForgotPassword;
