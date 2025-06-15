
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, Edit, Copy, Trash2, Eye, Send, Calendar } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'scheduled' | 'sent';
  targetAudience: string;
  createdAt: string;
  sentAt?: string;
  scheduledFor?: string;
  views: number;
  engagement: number;
}

const AnnouncementList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'New Workspace Opening Next Week',
      content: 'We are excited to announce the opening of our new workspace...',
      category: 'general',
      priority: 'high',
      status: 'sent',
      targetAudience: 'All Users',
      createdAt: '2024-06-10',
      sentAt: '2024-06-10',
      views: 1156,
      engagement: 68
    },
    {
      id: '2',
      title: 'Scheduled Maintenance This Weekend',
      content: 'Please be aware that we will be conducting routine maintenance...',
      category: 'maintenance',
      priority: 'medium',
      status: 'scheduled',
      targetAudience: 'Active Members',
      createdAt: '2024-06-12',
      scheduledFor: '2024-06-15',
      views: 0,
      engagement: 0
    },
    {
      id: '3',
      title: 'Monthly Networking Event',
      content: 'Join us for our monthly networking event...',
      category: 'events',
      priority: 'medium',
      status: 'draft',
      targetAudience: 'Premium Members',
      createdAt: '2024-06-13',
      views: 0,
      engagement: 0
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="policy">Policy Updates</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {announcement.title}
                    </h3>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                    <Badge className={getStatusColor(announcement.status)}>
                      {announcement.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {announcement.content}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Category: {announcement.category}</span>
                    <span>•</span>
                    <span>Audience: {announcement.targetAudience}</span>
                    <span>•</span>
                    <span>Created: {announcement.createdAt}</span>
                    {announcement.status === 'sent' && (
                      <>
                        <span>•</span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {announcement.views} views
                        </span>
                        <span>•</span>
                        <span>{announcement.engagement}% engagement</span>
                      </>
                    )}
                    {announcement.status === 'scheduled' && announcement.scheduledFor && (
                      <>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Scheduled: {announcement.scheduledFor}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    {announcement.status === 'draft' && (
                      <DropdownMenuItem>
                        <Send className="h-4 w-4 mr-2" />
                        Send Now
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementList;
