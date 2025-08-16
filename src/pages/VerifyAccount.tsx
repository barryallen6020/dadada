import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LogoFull from '@/components/common/LogoFull';
const VerifyAccount = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate verification process
    setTimeout(() => {
      if (verificationCode === '123456' || verificationCode.length === 6) {
        setIsVerified(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('Invalid verification code. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };
  const handleResendCode = () => {
    setError('');
    // Simulate resend logic
    alert('Verification code sent to your email!');
  };
  if (isVerified) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deskhive-skyblue/20 to-deskhive-orange/20">
        <Card className="w-full max-w-md glass-nav border-white/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-deskhive-navy">Account Verified!</h2>
                <p className="text-deskhive-darkgray mt-2">
                  Your account has been successfully verified. Redirecting to dashboard...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deskhive-skyblue/20 to-deskhive-orange/20 p-4 bg-slate-50">
      <Card className="w-full max-w-md glass-nav border-white/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <LogoFull />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-deskhive-navy">Verify Your Account</CardTitle>
            <CardDescription className="text-deskhive-darkgray">
              We've sent a verification code to your email address. Please enter it below to activate your account.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          

          {error && <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>}

          <form onSubmit={handleVerification} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-deskhive-navy">Verification Code</Label>
              <Input id="code" type="text" placeholder="Enter 6-digit code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} maxLength={6} className="text-center text-lg tracking-widest" required />
            </div>

            <Button type="submit" className="w-full bg-deskhive-navy hover:bg-deskhive-navy/90" disabled={isLoading || verificationCode.length !== 6}>
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <button onClick={handleResendCode} className="text-sm text-deskhive-orange hover:text-deskhive-orange/80 underline">
              Didn't receive the code? Resend
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-deskhive-darkgray hover:text-deskhive-navy">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default VerifyAccount;