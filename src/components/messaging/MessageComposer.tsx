import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Send, Users, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MessageComposerProps {
  userRole: 'global_admin' | 'org_admin' | 'hub_manager';
}

const MessageComposer: React.FC<MessageComposerProps> = ({ userRole }) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [messageType, setMessageType] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  const getAvailableRecipients = () => {
    switch (userRole) {
      case 'global_admin':
        return [
          { value: 'all', label: 'Everyone', count: 1250 },
          { value: 'org_admins', label: 'Organization Admins', count: 45 },
          { value: 'hub_managers', label: 'Hub Managers', count: 120 },
          { value: 'members', label: 'Members', count: 1085 }
        ];
      case 'org_admin':
        return [
          { value: 'hub_managers', label: 'Hub Managers', count: 8 },
          { value: 'members', label: 'Members', count: 245 }
        ];
      case 'hub_manager':
        return [
          { value: 'members', label: 'Members', count: 32 }
        ];
      default:
        return [];
    }
  };

  const getMessageTypes = () => {
    switch (userRole) {
      case 'global_admin':
        return [
          'System Maintenance',
          'Platform Updates',
          'Holiday Announcement',
          'General Information',
          'Policy Changes'
        ];
      case 'org_admin':
        return [
          'Hub Updates',
          'Policy Changes',
          'Event Announcements',
          'Maintenance Notice',
          'General Information'
        ];
      case 'hub_manager':
        return [
          'Facility Updates',
          'Equipment Maintenance',
          'Event Preparation',
          'Safety Notice',
          'General Information'
        ];
      default:
        return [];
    }
  };

  const handleRecipientChange = (recipientValue: string, checked: boolean) => {
    if (checked) {
      setRecipients([...recipients, recipientValue]);
    } else {
      setRecipients(recipients.filter(r => r !== recipientValue));
    }
  };

  const handleSendMessage = () => {
    if (!subject || !content || recipients.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select recipients.",
        variant: "destructive"
      });
      return;
    }

    // Here you would send the message via API
    console.log('Sending message:', {
      subject,
      content,
      recipients,
      messageType,
      isUrgent,
      sender: userRole
    });

    toast({
      title: "Message Sent",
      description: `Message sent to ${recipients.length} recipient group(s).`
    });

    // Reset form
    setSubject('');
    setContent('');
    setRecipients([]);
    setMessageType('');
    setIsUrgent(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Send Message</h2>
        <p className="text-muted-foreground">Broadcast messages to your team members</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Compose Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="Enter message subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="messageType">Message Type</Label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select message type" />
                </SelectTrigger>
                <SelectContent>
                  {getMessageTypes().map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '_')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Message Content *</Label>
            <Textarea
              id="content"
              placeholder="Enter your message content here..."
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Recipients *
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getAvailableRecipients().map((recipient) => (
                <div key={recipient.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <Checkbox
                    id={recipient.value}
                    checked={recipients.includes(recipient.value)}
                    onCheckedChange={(checked) => handleRecipientChange(recipient.value, checked as boolean)}
                  />
                  <Label htmlFor={recipient.value} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span>{recipient.label}</span>
                      <span className="text-sm text-muted-foreground">({recipient.count})</span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={isUrgent}
              onCheckedChange={(checked) => setIsUrgent(checked === true)}
            />
            <Label htmlFor="urgent" className="cursor-pointer">
              Mark as urgent
            </Label>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Save Draft
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageComposer;