
export interface EmailTemplate {
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

export interface EmailCampaign {
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

export interface EmailStats {
  totalSent: number;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
}

export interface EmailData {
  recipientType: string;
  subject: string;
  content: string;
  templateId?: string;
}
