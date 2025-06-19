
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Copy, Download, MoreHorizontal } from 'lucide-react';

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

interface EmailCampaignTableProps {
  campaigns: EmailCampaign[];
  onViewReport: (campaign: EmailCampaign) => void;
  onDuplicate: (campaign: EmailCampaign) => void;
  onExportData: (campaign: EmailCampaign) => void;
}

const EmailCampaignTable: React.FC<EmailCampaignTableProps> = ({
  campaigns,
  onViewReport,
  onDuplicate,
  onExportData
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
        <CardTitle className="text-sm md:text-lg">Email Campaigns</CardTitle>
        <CardDescription className="text-xs md:text-sm">Track all email campaigns</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-xs md:text-sm">
                <TableHead>Campaign</TableHead>
                <TableHead className="hidden md:table-cell">Recipients</TableHead>
                <TableHead className="hidden sm:table-cell">Sent Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Performance</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="text-xs md:text-sm">
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-muted-foreground text-xs">{campaign.subject}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{campaign.recipients.toLocaleString()}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.openRate && campaign.clickRate ? (
                      <div className="text-xs">
                        <div>Open: {campaign.openRate}%</div>
                        <div>Click: {campaign.clickRate}%</div>
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewReport(campaign)}>
                          <Eye className="h-3 w-3 mr-2" />
                          View Report
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicate(campaign)}>
                          <Copy className="h-3 w-3 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onExportData(campaign)}>
                          <Download className="h-3 w-3 mr-2" />
                          Export Data
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

export default EmailCampaignTable;
