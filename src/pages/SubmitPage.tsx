
import React from 'react';
import MessageForm from '@/components/message/MessageForm';
import PageTransition from '@/components/layout/PageTransition';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SubmitPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-2xl py-12 px-4">
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Development Preview</AlertTitle>
          <AlertDescription>
            This is a development preview. The backend API may have CORS restrictions that prevent 
            direct connections from this preview environment. In a production environment, this would be configured properly.
          </AlertDescription>
        </Alert>
        
        <MessageForm />
      </div>
    </PageTransition>
  );
};

export default SubmitPage;
