
import React from 'react';
import EmailComposer from '../EmailComposer';
import EmailSidebar from '../EmailSidebar';
import { EmailTemplate, EmailStats, EmailData } from '../types';

interface ComposeTabProps {
  templates: EmailTemplate[];
  emailStats: EmailStats;
  selectedTemplate: EmailTemplate | null;
  onSendEmail: (data: EmailData) => void;
}

const ComposeTab: React.FC<ComposeTabProps> = ({
  templates,
  emailStats,
  selectedTemplate,
  onSendEmail
}) => {
  return (
    <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <EmailComposer templates={templates} onSendEmail={onSendEmail} />
      </div>
      <EmailSidebar emailStats={emailStats} selectedTemplate={selectedTemplate} />
    </div>
  );
};

export default ComposeTab;
