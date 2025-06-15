
import React from 'react';
import EmailTemplateTable from '../EmailTemplateTable';
import { EmailTemplate } from '../types';

interface TemplatesTabProps {
  templates: EmailTemplate[];
  onPreview: (template: EmailTemplate) => void;
  onEdit: (template: EmailTemplate) => void;
  onDuplicate: (template: EmailTemplate) => void;
  onDelete: (template: EmailTemplate) => void;
}

const TemplatesTab: React.FC<TemplatesTabProps> = ({
  templates,
  onPreview,
  onEdit,
  onDuplicate,
  onDelete
}) => {
  return (
    <EmailTemplateTable
      templates={templates}
      onPreview={onPreview}
      onEdit={onEdit}
      onDuplicate={onDuplicate}
      onDelete={onDelete}
    />
  );
};

export default TemplatesTab;
