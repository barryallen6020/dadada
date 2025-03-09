
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
          <AlertTitle>API Integration in Progress</AlertTitle>
          <AlertDescription>
            Backend CORS configuration is currently being updated. Message submission may not work until the changes are propagated.
            The backend team is working on making the API accessible from all origins.
          </AlertDescription>
        </Alert>
        
        <MessageForm />
      </div>
    </PageTransition>
  );
};

export default SubmitPage;

