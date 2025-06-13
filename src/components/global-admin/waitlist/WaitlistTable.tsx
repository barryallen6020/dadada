
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Clock,
  Mail,
  CheckCircle,
  Trash2,
  MoreHorizontal,
  Eye,
  UserCheck
} from 'lucide-react';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: string;
  date: string;
  subscriptions: string[];
  status: 'pending' | 'contacted' | 'converted' | 'declined';
  source: string;
  notes?: string;
}

interface WaitlistTableProps {
  entries: WaitlistEntry[];
  onViewDetails: (entry: WaitlistEntry) => void;
  onSendEmail: (entry: WaitlistEntry) => void;
  onMarkConverted: (entry: WaitlistEntry) => void;
  onDelete: (entry: WaitlistEntry) => void;
}

const WaitlistTable: React.FC<WaitlistTableProps> = ({
  entries,
  onViewDetails,
  onSendEmail,
  onMarkConverted,
  onDelete
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'contacted': return <Mail className="h-3 w-3" />;
      case 'converted': return <CheckCircle className="h-3 w-3" />;
      case 'declined': return <Trash2 className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-xs md:text-sm">
                <TableHead className="w-[200px]">Name & Email</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Subscriptions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id} className="text-xs md:text-sm">
                  <TableCell>
                    <div>
                      <div className="font-medium">{entry.name}</div>
                      <div className="text-muted-foreground text-xs">{entry.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{entry.company || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{entry.role}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{new Date(entry.date).toLocaleDateString()}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {entry.subscriptions.map((sub, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(entry.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(entry.status)}
                        {entry.status}
                      </div>
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
                        <DropdownMenuItem onClick={() => onViewDetails(entry)}>
                          <Eye className="h-3 w-3 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSendEmail(entry)}>
                          <Mail className="h-3 w-3 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onMarkConverted(entry)}>
                          <UserCheck className="h-3 w-3 mr-2" />
                          Mark Converted
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => onDelete(entry)}
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

export default WaitlistTable;
