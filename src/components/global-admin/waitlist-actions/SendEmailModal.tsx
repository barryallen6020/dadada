
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, User, Template } from 'lucide-react';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

interface SendEmailModalProps {
  entry: WaitlistEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (emailData: { subject: string; content: string; templateId?: string }) => void;
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({
  entry,
  isOpen,
  onClose,
  onSend
}) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Mock email templates
  const templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to DeskHive - Your workspace journey begins!',
      content: `Hello {{name}},\n\nThank you for joining our waitlist! We're excited to have you as part of the DeskHive community.\n\nBest regards,\nThe DeskHive Team`
    },
    {
      id: '2',
      name: 'Follow-up Email',
      subject: 'Update on your DeskHive application',
      content: `Hi {{name}},\n\nWe wanted to follow up on your DeskHive waitlist application. We're making great progress and will keep you updated.\n\nBest regards,\nThe DeskHive Team`
    },
    {
      id: '3',
      name: 'Conversion Email',
      subject: 'You\'re invited to join DeskHive!',
      content: `Dear {{name}},\n\nGreat news! We're ready to welcome you to DeskHive. Click the link below to complete your registration.\n\nBest regards,\nThe DeskHive Team`
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setContent(template.content.replace('{{name}}', entry?.name || ''));
    }
  };

  const handleSend = () => {
    if (subject.trim() && content.trim()) {
      onSend({
        subject: subject.trim(),
        content: content.trim(),
        templateId: selectedTemplate || undefined
      });
      setSubject('');
      setContent('');
      setSelectedTemplate('');
      onClose();
    }
  };

  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Email to Waitlist Entry
          </DialogTitle>
          <DialogDescription>Compose and send an email to {entry.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Recipient Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4" />
              <span className="font-medium">Recipient</span>
            </div>
            <div className="text-sm">
              <p><strong>Name:</strong> {entry.name}</p>
              <p><strong>Email:</strong> {entry.email}</p>
              <p><strong>Role:</strong> <Badge variant="outline" className="text-xs">{entry.role}</Badge></p>
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-1">
              <Template className="h-3 w-3" />
              Email Template (Optional)
            </label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input
              placeholder="Email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              placeholder="Compose your email message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSend}
              disabled={!subject.trim() || !content.trim()}
            >
              <Send className="h-3 w-3 mr-1" />
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendEmailModal;
