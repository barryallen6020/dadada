
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Send, Users, Calendar, TrendingUp } from 'lucide-react';
import AnnouncementComposer from './AnnouncementComposer';
import AnnouncementList from './AnnouncementList';
import AudienceSegmentation from './AudienceSegmentation';
import DeliveryTracking from './DeliveryTracking';

interface AnnouncementCenterProps {
  isSidebarCollapsed?: boolean;
}

const AnnouncementCenter: React.FC<AnnouncementCenterProps> = ({ isSidebarCollapsed = false }) => {
  const [activeTab, setActiveTab] = useState('compose');
  const [showComposer, setShowComposer] = useState(false);

  const announcementStats = [
    {
      title: 'Total Announcements',
      value: '24',
      change: '+3 this week',
      icon: <Send className="h-4 w-4" />
    },
    {
      title: 'Active Recipients',
      value: '1,247',
      change: '+12% this month',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Scheduled Posts',
      value: '8',
      change: '5 pending',
      icon: <Calendar className="h-4 w-4" />
    },
    {
      title: 'Engagement Rate',
      value: '68%',
      change: '+5% from last month',
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Announcement Center</h2>
          <p className="text-gray-600">Create and manage announcements for your organization</p>
        </div>
        <Button onClick={() => setShowComposer(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Stats Overview */}
      <div className={`grid gap-4 ${
        isSidebarCollapsed 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
          : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
      }`}>
        {announcementStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className="text-gray-400">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="tracking">Delivery Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <AnnouncementComposer isOpen={showComposer} onClose={() => setShowComposer(false)} />
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <AnnouncementList />
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <AudienceSegmentation />
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <DeliveryTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnnouncementCenter;
