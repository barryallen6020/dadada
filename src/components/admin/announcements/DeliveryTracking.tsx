
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Send, Eye, MousePointer, Users, TrendingUp, TrendingDown, Clock, Check } from 'lucide-react';

interface DeliveryMetrics {
  campaignId: string;
  campaignName: string;
  sentAt: string;
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
  status: 'sending' | 'delivered' | 'completed';
}

const DeliveryTracking: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedCampaign, setSelectedCampaign] = useState('all');

  const campaigns: DeliveryMetrics[] = [
    {
      campaignId: '1',
      campaignName: 'New Workspace Opening',
      sentAt: '2024-06-10T09:00:00Z',
      totalSent: 1247,
      delivered: 1225,
      opened: 856,
      clicked: 142,
      unsubscribed: 8,
      deliveryRate: 98.2,
      openRate: 69.9,
      clickRate: 16.6,
      unsubscribeRate: 0.6,
      status: 'completed'
    },
    {
      campaignId: '2',
      campaignName: 'Maintenance Notice',
      sentAt: '2024-06-12T10:30:00Z',
      totalSent: 892,
      delivered: 879,
      opened: 642,
      clicked: 89,
      unsubscribed: 3,
      deliveryRate: 98.5,
      openRate: 73.0,
      clickRate: 13.9,
      unsubscribeRate: 0.3,
      status: 'completed'
    },
    {
      campaignId: '3',
      campaignName: 'Monthly Newsletter',
      sentAt: '2024-06-13T14:00:00Z',
      totalSent: 1156,
      delivered: 1089,
      opened: 456,
      clicked: 67,
      unsubscribed: 5,
      deliveryRate: 94.2,
      openRate: 41.9,
      clickRate: 14.7,
      unsubscribeRate: 0.5,
      status: 'sending'
    }
  ];

  const performanceData = [
    { name: 'Day 1', opens: 45, clicks: 8 },
    { name: 'Day 2', opens: 78, clicks: 15 },
    { name: 'Day 3', opens: 125, clicks: 28 },
    { name: 'Day 4', opens: 156, clicks: 35 },
    { name: 'Day 5', opens: 89, clicks: 18 },
    { name: 'Day 6', opens: 67, clicks: 12 },
    { name: 'Day 7', opens: 34, clicks: 6 }
  ];

  const deliveryStats = [
    {
      title: 'Total Delivered',
      value: '3,193',
      change: '+18% from last week',
      trend: 'up',
      icon: <Send className="h-4 w-4" />
    },
    {
      title: 'Average Open Rate',
      value: '61.6%',
      change: '+2.4% from last week',
      trend: 'up',
      icon: <Eye className="h-4 w-4" />
    },
    {
      title: 'Average Click Rate',
      value: '15.1%',
      change: '-0.8% from last week',
      trend: 'down',
      icon: <MousePointer className="h-4 w-4" />
    },
    {
      title: 'Active Recipients',
      value: '2,847',
      change: '+156 new subscribers',
      trend: 'up',
      icon: <Users className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'sending': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check className="h-3 w-3" />;
      case 'sending': return <Clock className="h-3 w-3" />;
      case 'delivered': return <Send className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Delivery Tracking</h3>
          <p className="text-gray-600">Monitor announcement delivery and engagement</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Delivery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {deliveryStats.map((stat, index) => (
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
              <div className="flex items-center space-x-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement Over Time</CardTitle>
            <CardDescription>Opens and clicks over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="opens" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Campaign Performance</CardTitle>
            <CardDescription>Open rates by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaigns.map(c => ({ name: c.campaignName.split(' ')[0], openRate: c.openRate }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Open Rate']} />
                  <Bar dataKey="openRate" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Campaigns</CardTitle>
          <CardDescription>Detailed delivery metrics for recent announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.campaignId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900">{campaign.campaignName}</h4>
                    <Badge className={getStatusColor(campaign.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(campaign.status)}
                        <span>{campaign.status}</span>
                      </div>
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(campaign.sentAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{campaign.totalSent}</div>
                    <div className="text-xs text-gray-500">Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{campaign.delivered}</div>
                    <div className="text-xs text-gray-500">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{campaign.opened}</div>
                    <div className="text-xs text-gray-500">Opened</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{campaign.clicked}</div>
                    <div className="text-xs text-gray-500">Clicked</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Delivery Rate</span>
                      <span>{campaign.deliveryRate}%</span>
                    </div>
                    <Progress value={campaign.deliveryRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Open Rate</span>
                      <span>{campaign.openRate}%</span>
                    </div>
                    <Progress value={campaign.openRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Click Rate</span>
                      <span>{campaign.clickRate}%</span>
                    </div>
                    <Progress value={campaign.clickRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Unsubscribe Rate</span>
                      <span>{campaign.unsubscribeRate}%</span>
                    </div>
                    <Progress value={campaign.unsubscribeRate} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryTracking;
