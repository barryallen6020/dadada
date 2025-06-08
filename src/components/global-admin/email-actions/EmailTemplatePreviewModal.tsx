
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, Edit, Copy, Calendar } from 'lucide-react';

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

interface EmailTemplatePreviewModalProps {
  template: EmailTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (template: EmailTemplate) => void;
  onDuplicate: (template: EmailTemplate) => void;
}

const EmailTemplatePreviewModal: React.FC<EmailTemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onEdit,
  onDuplicate
}) => {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Email Template Preview
          </DialogTitle>
          <DialogDescription>Preview and manage "{template.name}" template</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Template Name</label>
              <p className="text-sm text-gray-900">{template.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <Badge variant="outline" className="text-xs capitalize">{template.category}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Created</label>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className="text-sm">{new Date(template.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Last Used</label>
              <span className="text-sm">
                {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{template.description}</p>
          </div>

          <Separator />

          {/* Email Preview */}
          <div className="border rounded-lg">
            <div className="bg-gray-50 p-4 border-b">
              <h3 className="font-medium">Email Preview</h3>
            </div>
            
            {/* Email Header */}
            <div className="p-4 border-b bg-white">
              <div className="text-sm text-gray-600 mb-2">Subject:</div>
              <div className="font-medium text-lg">{template.subject}</div>
            </div>

            {/* Email Content */}
            <div className="p-4 bg-white">
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: template.content }}
              />
            </div>
          </div>

          {/* Variables */}
          {template.variables.length > 0 && (
            <>
              <Separator />
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Available Variables</label>
                <div className="flex flex-wrap gap-2">
                  {template.variables.map((variable, index) => (
                    <code key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {variable}
                    </code>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <Separator />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => onDuplicate(template)}>
              <Copy className="h-3 w-3 mr-1" />
              Duplicate
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEdit(template)}>
              <Edit className="h-3 w-3 mr-1" />
              Edit Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailTemplatePreviewModal;
