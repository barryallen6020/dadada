
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import LogoFull from '@/components/common/LogoFull';

const HubManagerLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Test credentials
  const TEST_CREDENTIALS = {
    email: 'hubmanager@example.com',
    password: 'hub123'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (credentials.email === TEST_CREDENTIALS.email && credentials.password === TEST_CREDENTIALS.password) {
        localStorage.setItem('hubManagerToken', 'test-hub-manager-token');
        localStorage.setItem('hubManagerUser', JSON.stringify({
          id: 'hub-manager-1',
          email: 'hubmanager@example.com',
          role: 'HUB_MANAGER',
          name: 'Hub Manager',
          hubId: 'hub-1'
        }));
        
        toast({
          title: "Login successful",
          description: "Welcome to Hub Manager Dashboard"
        });
        navigate('/hubmanager');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deskhive-skyblue to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-nav border-white/20 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <LogoFull className="text-xl" />
          </div>
          <CardTitle className="text-deskhive-navy">Hub Manager Portal</CardTitle>
          <CardDescription className="text-deskhive-darkgray">
            Sign in to manage your workspace hub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-deskhive-orange/10 border-deskhive-orange/20">
            <AlertDescription className="text-deskhive-darkgray">
              <strong>Demo Credentials:</strong><br />
              Email: hubmanager@example.com<br />
              Password: hub123
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input 
                type="email" 
                placeholder="Email" 
                value={credentials.email}
                onChange={(e) => setCredentials({
                  ...credentials,
                  email: e.target.value
                })}
                className="glass-input border-white/20 bg-white/10"
                required 
              />
            </div>
            <div>
              <Input 
                type="password" 
                placeholder="Password" 
                value={credentials.password}
                onChange={(e) => setCredentials({
                  ...credentials,
                  password: e.target.value
                })}
                className="glass-input border-white/20 bg-white/10"
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-deskhive-orange hover:bg-deskhive-orange/90" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HubManagerLogin;
