
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TemplateEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TemplateEditorDialog: React.FC<TemplateEditorDialogProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Save Template</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateEditorDialog;
