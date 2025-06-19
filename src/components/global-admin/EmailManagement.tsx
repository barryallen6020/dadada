import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Send, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EmailTemplatePreviewModal from './email-actions/EmailTemplatePreviewModal';
import CampaignReportModal from './email-actions/CampaignReportModal';
import EmailMetrics from './email/EmailMetrics';
import EmailComposer from './email/EmailComposer';
import EmailSidebar from './email/EmailSidebar';
import EmailTemplateTable from './email/EmailTemplateTable';
import EmailCampaignTable from './email/EmailCampaignTable';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  description: string;
  content: string;
  variables: string[];
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  template: string;
  recipients: number;
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  createdAt: string;
  sentAt?: string;
  openRate?: number;
  clickRate?: number;
}

interface EmailManagementProps {
  isSidebarCollapsed?: boolean;
}

const EmailManagement: React.FC<EmailManagementProps> = ({ isSidebarCollapsed = false }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [showCampaignReport, setShowCampaignReport] = useState(false);
  const { toast } = useToast();

  // Mock data
  const emailStats = {
    totalSent: 45678,
    openRate: 24.5,
    clickRate: 3.2,
    unsubscribeRate: 0.8
  };

  const templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Welcome Newsletter',
      subject: 'Welcome to DeskHive!',
      category: 'onboarding',
      description: 'Welcome email for new users',
      content: '<h1>Welcome to DeskHive!</h1><p>We\'re excited to have you on board.</p>',
      variables: ['{{userName}}', '{{companyName}}'],
      createdAt: '2024-06-01',
      lastUsed: '2024-06-05',
      isActive: true
    },
    {
      id: '2',
      name: 'Product Update',
      subject: 'New Features Available',
      category: 'product',
      description: 'Announcement of new features',
      content: '<h1>New Features</h1><p>Check out our latest updates!</p>',
      variables: ['{{userName}}', '{{featureName}}'],
      createdAt: '2024-06-02',
      lastUsed: '2024-06-04',
      isActive: true
    },
    {
      id: '3',
      name: 'Promotional Offer',
      subject: 'Special Discount Inside!',
      category: 'promotion',
      description: 'Marketing promotion template',
      content: '<h1>Special Offer</h1><p>Get 50% off your next booking!</p>',
      variables: ['{{userName}}', '{{discountCode}}', '{{expiryDate}}'],
      createdAt: '2024-06-03',
      isActive: true
    }
  ];

  const campaigns: EmailCampaign[] = [
    {
      id: '1',
      name: 'June Newsletter',
      subject: 'Your June Update from DeskHive',
      template: 'Welcome Newsletter',
      recipients: 1247,
      status: 'sent',
      createdAt: '2024-06-01',
      sentAt: '2024-06-01',
      openRate: 28.5,
      clickRate: 4.2
    },
    {
      id: '2',
      name: 'Feature Announcement',
      subject: 'New Workspace Features Now Live',
      template: 'Product Update',
      recipients: 2156,
      status: 'sent',
      createdAt: '2024-06-03',
      sentAt: '2024-06-03',
      openRate: 32.1,
      clickRate: 6.8
    },
    {
      id: '3',
      name: 'Summer Promotion',
      subject: 'Summer Special - 50% Off',
      template: 'Promotional Offer',
      recipients: 3421,
      status: 'scheduled',
      createdAt: '2024-06-05'
    }
  ];

  const handlePreviewTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowTemplatePreview(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    toast({
      title: "Edit template",
      description: `Opening editor for "${template.name}".`
    });
    console.log('Editing template:', template.id);
  };

  const handleDuplicateTemplate = (template: EmailTemplate) => {
    toast({
      title: "Template duplicated",
      description: `"${template.name}" has been duplicated.`
    });
    console.log('Duplicating template:', template.id);
  };

  const handleDeleteTemplate = (template: EmailTemplate) => {
    toast({
      title: "Template deleted",
      description: `"${template.name}" has been deleted.`,
      variant: "destructive"
    });
    console.log('Deleting template:', template.id);
  };

  const handleViewCampaignReport = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignReport(true);
  };

  const handleDuplicateCampaign = (campaign: EmailCampaign) => {
    toast({
      title: "Campaign duplicated",
      description: `"${campaign.name}" has been duplicated.`
    });
    console.log('Duplicating campaign:', campaign.id);
  };

  const handleExportCampaignData = (campaign: EmailCampaign) => {
    toast({
      title: "Export started",
      description: `Exporting data for "${campaign.name}".`
    });
    console.log('Exporting campaign data:', campaign.id);
  };

  const handleSendEmail = (data: { recipientType: string; subject: string; content: string; templateId?: string }) => {
    toast({
      title: "Email sent",
      description: `Email sent to ${data.recipientType} recipients.`
    });
    console.log('Sending email:', data);
  };

  return (
    <div className="space-y-3 md:space-y-4 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Email Management</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Create and manage email campaigns</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showTemplateEditor} onOpenChange={setShowTemplateEditor}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
                <DialogDescription>Design a reusable email template</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Template Name" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="product">Product Updates</SelectItem>
                      <SelectItem value="promotion">Promotions</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="Email Subject" />
                <Textarea placeholder="Template Description" rows={2} />
                <Textarea placeholder="Email content..." className="min-h-[200px]" />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowTemplateEditor(false)}>Cancel</Button>
                  <Button onClick={() => setShowTemplateEditor(false)}>Save Template</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm" className="text-xs md:text-sm">
            <Send className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-4 text-xs md:text-sm">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-3 md:space-y-4">
          <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <EmailComposer templates={templates} onSendEmail={handleSendEmail} />
            </div>
            <EmailSidebar emailStats={emailStats} selectedTemplate={selectedTemplate} />
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-3 md:space-y-4">
          <EmailTemplateTable
            templates={templates}
            onPreview={handlePreviewTemplate}
            onEdit={handleEditTemplate}
            onDuplicate={handleDuplicateTemplate}
            onDelete={handleDeleteTemplate}
          />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-3 md:space-y-4">
          <EmailCampaignTable
            campaigns={campaigns}
            onViewReport={handleViewCampaignReport}
            onDuplicate={handleDuplicateCampaign}
            onExportData={handleExportCampaignData}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-3 md:space-y-4">
          <EmailMetrics isSidebarCollapsed={isSidebarCollapsed} stats={emailStats} />
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Email performance is above industry average. Open rates are 24.5% vs industry average of 21.3%.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EmailTemplatePreviewModal
        template={selectedTemplate}
        isOpen={showTemplatePreview}
        onClose={() => setShowTemplatePreview(false)}
        onEdit={handleEditTemplate}
        onDuplicate={handleDuplicateTemplate}
      />

      <CampaignReportModal
        campaign={selectedCampaign}
        isOpen={showCampaignReport}
        onClose={() => setShowCampaignReport(false)}
      />
    </div>
  );
};

export default EmailManagement;
