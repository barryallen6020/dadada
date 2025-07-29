import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MessageComposer from '@/components/messaging/MessageComposer';
import MessageHistory from '@/components/messaging/MessageHistory';

const HubManagerMessages = () => {
  // In a real app, this would come from authentication context
  const userRole = 'hub_manager' as const;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="mt-6">
          <MessageComposer userRole={userRole} />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <MessageHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HubManagerMessages;