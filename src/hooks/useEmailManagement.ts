
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EmailTemplate, EmailCampaign, EmailData } from '@/components/global-admin/email/types';

export const useEmailManagement = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [showCampaignReport, setShowCampaignReport] = useState(false);
  const { toast } = useToast();

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

  const handleSendEmail = (data: EmailData) => {
    toast({
      title: "Email sent",
      description: `Email sent to ${data.recipientType} recipients.`
    });
    console.log('Sending email:', data);
  };

  return {
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
  };
};
