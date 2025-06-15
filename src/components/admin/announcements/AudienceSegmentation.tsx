
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, Plus, Target, TrendingUp, Filter } from 'lucide-react';

interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  memberCount: number;
  engagementRate: number;
  lastUpdated: string;
  color: string;
}

const AudienceSegmentation: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  const segments: AudienceSegment[] = [
    {
      id: '1',
      name: 'Active Members',
      description: 'Users who have made bookings in the last 30 days',
      criteria: ['Last booking within 30 days', 'Minimum 3 bookings/month'],
      memberCount: 892,
      engagementRate: 78,
      lastUpdated: '2024-06-13',
      color: '#8884d8'
    },
    {
      id: '2',
      name: 'Premium Members',
      description: 'Users with premium subscriptions',
      criteria: ['Premium subscription active', 'Member for 6+ months'],
      memberCount: 156,
      engagementRate: 85,
      lastUpdated: '2024-06-13',
      color: '#82ca9d'
    },
    {
      id: '3',
      name: 'New Joiners',
      description: 'Users who joined in the last 30 days',
      criteria: ['Registration within 30 days', 'Less than 5 bookings'],
      memberCount: 89,
      engagementRate: 45,
      lastUpdated: '2024-06-13',
      color: '#ffc658'
    },
    {
      id: '4',
      name: 'Inactive Members',
      description: 'Users with no recent activity',
      criteria: ['No bookings in 60+ days', 'No app login in 30+ days'],
      memberCount: 234,
      engagementRate: 12,
      lastUpdated: '2024-06-13',
      color: '#ff7300'
    }
  ];

  const engagementData = [
    { name: 'Active', engagement: 78, members: 892 },
    { name: 'Premium', engagement: 85, members: 156 },
    { name: 'New', engagement: 45, members: 89 },
    { name: 'Inactive', engagement: 12, members: 234 },
  ];

  const pieData = segments.map(segment => ({
    name: segment.name,
    value: segment.memberCount,
    color: segment.color
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Audience Segmentation</h3>
          <p className="text-gray-600">Manage and analyze your user segments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Segment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Audience Distribution</CardTitle>
            <CardDescription>Breakdown of user segments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} members`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engagement by Segment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement by Segment</CardTitle>
            <CardDescription>Average engagement rates across segments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Engagement Rate']} />
                  <Bar dataKey="engagement" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {segments.map((segment) => (
          <Card 
            key={segment.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSegment === segment.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedSegment(segment.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{segment.name}</CardTitle>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: segment.color }}
                />
              </div>
              <CardDescription className="text-xs">
                {segment.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Members</span>
                <span className="font-semibold">{segment.memberCount.toLocaleString()}</span>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="text-sm font-medium">{segment.engagementRate}%</span>
                </div>
                <Progress value={segment.engagementRate} className="h-2" />
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-500">Criteria:</span>
                {segment.criteria.map((criterion, index) => (
                  <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                    {criterion}
                  </Badge>
                ))}
              </div>

              <div className="text-xs text-gray-500">
                Updated: {segment.lastUpdated}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Segment Actions */}
      {selectedSegment && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Segment Actions</CardTitle>
            <CardDescription>
              Actions for {segments.find(s => s.id === selectedSegment)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Refine Criteria
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Export Members
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AudienceSegmentation;
