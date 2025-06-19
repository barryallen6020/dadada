
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  Save, 
  Send, 
  Calendar,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Link,
  Image
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

interface EmailComposerProps {
  templates: EmailTemplate[];
  onSendEmail: (data: { recipientType: string; subject: string; content: string; templateId?: string }) => void;
}

const EmailComposer: React.FC<EmailComposerProps> = ({ templates, onSendEmail }) => {
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [recipientType, setRecipientType] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const EditorToolbar = () => (
    <div className="flex flex-wrap items-center gap-1 md:gap-2 p-2 border-b">
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Bold className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Italic className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Underline className="h-3 w-3" />
        </Button>
      </div>
      <Separator orientation="vertical" className="h-4" />
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <AlignLeft className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <AlignCenter className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <AlignRight className="h-3 w-3" />
        </Button>
      </div>
      <Separator orientation="vertical" className="h-4" />
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <List className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Link className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Image className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  const handleSend = () => {
    onSendEmail({
      recipientType,
      subject: emailSubject,
      content: emailContent,
      templateId: selectedTemplate?.id
    });
  };

  return (
    <Card>
      <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm md:text-lg">Compose Email</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-4 space-y-3 md:space-y-4">
        <div className="grid gap-3 md:gap-4">
          <div>
            <label className="text-xs md:text-sm font-medium">Recipients</label>
            <Select value={recipientType} onValueChange={setRecipientType}>
              <SelectTrigger className="text-xs md:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users (5,247)</SelectItem>
                <SelectItem value="admins">Admins (45)</SelectItem>
                <SelectItem value="hub_managers">Hub Managers (128)</SelectItem>
                <SelectItem value="members">Members (5,074)</SelectItem>
                <SelectItem value="waitlist">Waitlist (1,247)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium">Subject</label>
            <Input 
              placeholder="Email subject..." 
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="text-xs md:text-sm"
            />
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium">Template</label>
            <Select onValueChange={(value) => {
              const template = templates.find(t => t.id === value);
              if (template) {
                setSelectedTemplate(template);
                setEmailSubject(template.subject);
                setEmailContent(template.content);
              }
            }}>
              <SelectTrigger className="text-xs md:text-sm">
                <SelectValue placeholder="Choose template..." />
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
        </div>
        
        {!isPreviewMode ? (
          <div className="border rounded-lg">
            <EditorToolbar />
            <Textarea 
              placeholder="Compose your email..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="min-h-[250px] border-0 resize-none text-xs md:text-sm"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-white min-h-[250px]">
            <div className="mb-4 pb-4 border-b">
              <h3 className="font-bold text-lg">{emailSubject}</h3>
              <p className="text-sm text-muted-foreground">To: {recipientType} recipients</p>
            </div>
            <div 
              className="prose max-w-none text-xs md:text-sm"
              dangerouslySetInnerHTML={{ __html: emailContent }}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            <Save className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Schedule
          </Button>
          <Button size="sm" className="text-xs md:text-sm" onClick={handleSend}>
            <Send className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Send Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailComposer;
