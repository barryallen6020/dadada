import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import LogoFull from '@/components/common/LogoFull';
const GlobalAdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();

  // Test credentials
  const TEST_CREDENTIALS = {
    username: 'globaladmin',
    password: 'admin123'
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (credentials.username === TEST_CREDENTIALS.username && credentials.password === TEST_CREDENTIALS.password) {
        localStorage.setItem('globalAdminToken', 'test-global-admin-token');
        localStorage.setItem('globalAdminUser', JSON.stringify({
          id: 'global-admin-1',
          username: 'globaladmin',
          role: 'GLOBAL_ADMIN',
          name: 'Global Administrator'
        }));
        toast({
          title: "Login successful",
          description: "Welcome to Global Admin Dashboard"
        });
        navigate('/global-admin');
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
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <LogoFull className="text-xl" />
          </div>
          
          <CardDescription>
            Sign in to access the global administration panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertDescription>
              <strong>Test Credentials:</strong><br />
              Username: globaladmin<br />
              Password: admin123
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input type="text" placeholder="Username" value={credentials.username} onChange={e => setCredentials({
              ...credentials,
              username: e.target.value
            })} required />
            </div>
            <div>
              <Input type="password" placeholder="Password" value={credentials.password} onChange={e => setCredentials({
              ...credentials,
              password: e.target.value
            })} required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>;
};
export default GlobalAdminLogin;