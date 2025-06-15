
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Send, Save, Users, Image, Link, Bold, Italic, List } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AnnouncementComposerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementComposer: React.FC<AnnouncementComposerProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [targetAudience, setTargetAudience] = useState('all');
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [isScheduled, setIsScheduled] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableEmail, setEnableEmail] = useState(false);
  const [enableSMS, setEnableSMS] = useState(false);

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'events', label: 'Events' },
    { value: 'policy', label: 'Policy Updates' },
    { value: 'emergency', label: 'Emergency' }
  ];

  const audiences = [
    { value: 'all', label: 'All Users', count: 1247 },
    { value: 'active', label: 'Active Members', count: 892 },
    { value: 'premium', label: 'Premium Members', count: 156 },
    { value: 'new', label: 'New Members', count: 89 },
    { value: 'managers', label: 'Hub Managers', count: 12 }
  ];

  const handleSend = () => {
    console.log('Sending announcement:', {
      title,
      content,
      category,
      priority,
      targetAudience,
      scheduleDate,
      isScheduled,
      enableNotifications,
      enableEmail,
      enableSMS
    });
    onClose();
  };

  const handleSaveDraft = () => {
    console.log('Saving draft');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Announcement</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Composer */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter announcement title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <div className="mt-1">
                {/* Rich Text Editor Toolbar */}
                <div className="border border-gray-200 rounded-t-md p-2 bg-gray-50 flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  id="content"
                  placeholder="Write your announcement content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] rounded-t-none border-t-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-4">
            {/* Target Audience */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Target Audience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {audiences.map((audience) => (
                  <div
                    key={audience.value}
                    className={cn(
                      "p-2 border rounded-md cursor-pointer transition-colors",
                      targetAudience === audience.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setTargetAudience(audience.value)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{audience.label}</span>
                      <Badge variant="outline" className="text-xs">
                        {audience.count}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="scheduled" className="text-sm">
                    Schedule for later
                  </Label>
                  <Switch
                    id="scheduled"
                    checked={isScheduled}
                    onCheckedChange={setIsScheduled}
                  />
                </div>

                {isScheduled && (
                  <div>
                    <Label className="text-sm">Schedule Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !scheduleDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Methods */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Delivery Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="text-sm">
                    In-app notifications
                  </Label>
                  <Switch
                    id="notifications"
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Switch
                    id="email"
                    checked={enableEmail}
                    onCheckedChange={setEnableEmail}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sms" className="text-sm">
                    SMS
                  </Label>
                  <Switch
                    id="sms"
                    checked={enableSMS}
                    onCheckedChange={setEnableSMS}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button onClick={handleSend} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {isScheduled ? 'Schedule' : 'Send Now'}
              </Button>
              <Button variant="outline" onClick={handleSaveDraft} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementComposer;
