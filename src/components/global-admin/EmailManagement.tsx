
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Send } from 'lucide-react';
import EmailTemplatePreviewModal from './email-actions/EmailTemplatePreviewModal';
import CampaignReportModal from './email-actions/CampaignReportModal';
import TemplateEditorDialog from './email/TemplateEditorDialog';
import ComposeTab from './email/tabs/ComposeTab';
import TemplatesTab from './email/tabs/TemplatesTab';
import CampaignsTab from './email/tabs/CampaignsTab';
import AnalyticsTab from './email/tabs/AnalyticsTab';
import { useEmailManagement } from '@/hooks/useEmailManagement';
import { EmailTemplate, EmailCampaign, EmailStats } from './email/types';

interface EmailManagementProps {
  isSidebarCollapsed?: boolean;
}

const EmailManagement: React.FC<EmailManagementProps> = ({ isSidebarCollapsed = false }) => {
  const {
    selectedTemplate,
    selectedCampaign,
    showTemplateEditor,
    showTemplatePreview,
    showCampaignReport,
    setShowTemplateEditor,
    setShowTemplatePreview,
    setShowCampaignReport,
    handlePreviewTemplate,
    handleEditTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    handleViewCampaignReport,
    handleDuplicateCampaign,
    handleExportCampaignData,
    handleSendEmail
  } = useEmailManagement();

  // Mock data
  const emailStats: EmailStats = {
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
          <ComposeTab
            templates={templates}
            emailStats={emailStats}
            selectedTemplate={selectedTemplate}
            onSendEmail={handleSendEmail}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-3 md:space-y-4">
          <TemplatesTab
            templates={templates}
            onPreview={handlePreviewTemplate}
            onEdit={handleEditTemplate}
            onDuplicate={handleDuplicateTemplate}
            onDelete={handleDeleteTemplate}
          />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-3 md:space-y-4">
          <CampaignsTab
            campaigns={campaigns}
            onViewReport={handleViewCampaignReport}
            onDuplicate={handleDuplicateCampaign}
            onExportData={handleExportCampaignData}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-3 md:space-y-4">
          <AnalyticsTab emailStats={emailStats} isSidebarCollapsed={isSidebarCollapsed} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <TemplateEditorDialog
        isOpen={showTemplateEditor}
        onClose={() => setShowTemplateEditor(false)}
      />

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
