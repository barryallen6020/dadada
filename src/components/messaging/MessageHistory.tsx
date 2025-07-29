import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Clock, Users, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  subject: string;
  content: string;
  recipients: string[];
  messageType: string;
  isUrgent: boolean;
  sentAt: Date;
  status: 'sent' | 'draft' | 'failed';
  readCount: number;
  totalRecipients: number;
}

const MessageHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Mock data
  const messages: Message[] = [
    {
      id: '1',
      subject: 'System Maintenance Scheduled',
      content: 'We will be performing system maintenance on Sunday from 2-4 AM.',
      recipients: ['all'],
      messageType: 'system_maintenance',
      isUrgent: true,
      sentAt: new Date('2024-06-15T10:30:00'),
      status: 'sent',
      readCount: 1180,
      totalRecipients: 1250
    },
    {
      id: '2',
      subject: 'Holiday Office Hours',
      content: 'Please note our updated office hours during the holiday season.',
      recipients: ['hub_managers', 'members'],
      messageType: 'holiday_announcement',
      isUrgent: false,
      sentAt: new Date('2024-06-14T14:15:00'),
      status: 'sent',
      readCount: 245,
      totalRecipients: 253
    },
    {
      id: '3',
      subject: 'New Policy Updates',
      content: 'Important policy changes effective immediately.',
      recipients: ['org_admins'],
      messageType: 'policy_changes',
      isUrgent: false,
      sentAt: new Date('2024-06-13T09:00:00'),
      status: 'sent',
      readCount: 42,
      totalRecipients: 45
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="default">Sent</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRecipientText = (recipients: string[]) => {
    const recipientMap: { [key: string]: string } = {
      'all': 'Everyone',
      'org_admins': 'Org Admins',
      'hub_managers': 'Hub Managers',
      'members': 'Members'
    };

    return recipients.map(r => recipientMap[r] || r).join(', ');
  };

  const getReadPercentage = (readCount: number, totalRecipients: number) => {
    return Math.round((readCount / totalRecipients) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Message History</h2>
        <p className="text-muted-foreground">View and manage your sent messages</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Messages ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Read Rate</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {message.isUrgent && (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                      <div>
                        <div className="font-medium">{message.subject}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{getRecipientText(message.recipients)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell>
                    {message.status === 'sent' && (
                      <div className="text-sm">
                        <div className="font-medium">
                          {getReadPercentage(message.readCount, message.totalRecipients)}%
                        </div>
                        <div className="text-muted-foreground">
                          {message.readCount}/{message.totalRecipients}
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(message.sentAt, 'MMM d, yyyy')}
                      <div className="text-muted-foreground">
                        {format(message.sentAt, 'h:mm a')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMessage(message)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageHistory;