import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Edit, Copy, Trash2, MoreHorizontal } from 'lucide-react';
import { EmailTemplate } from './types';

interface EmailTemplateTableProps {
  templates: EmailTemplate[];
  onPreview: (template: EmailTemplate) => void;
  onEdit: (template: EmailTemplate) => void;
  onDuplicate: (template: EmailTemplate) => void;
  onDelete: (template: EmailTemplate) => void;
}

const EmailTemplateTable: React.FC<EmailTemplateTableProps> = ({
  templates,
  onPreview,
  onEdit,
  onDuplicate,
  onDelete
}) => {
  return (
    <Card>
      <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
        <CardTitle className="text-sm md:text-lg">Email Templates</CardTitle>
        <CardDescription className="text-xs md:text-sm">Manage reusable email templates</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-xs md:text-sm">
                <TableHead>Template</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id} className="text-xs md:text-sm">
                  <TableCell>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-muted-foreground text-xs">{template.subject}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-xs capitalize">{template.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onPreview(template)}>
                          <Eye className="h-3 w-3 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(template)}>
                          <Edit className="h-3 w-3 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicate(template)}>
                          <Copy className="h-3 w-3 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => onDelete(template)}
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTemplateTable;
