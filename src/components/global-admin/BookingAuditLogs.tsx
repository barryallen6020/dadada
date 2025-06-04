
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, Download, FileText, Filter } from 'lucide-react';

const BookingAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  // Mock audit log data
  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-06-03 10:30:00',
      user: 'John Doe',
      organization: 'TechCorp Inc',
      action: 'Created',
      resource: 'Booking #1234',
      details: 'Conference Room A - 2024-06-05 14:00',
      ipAddress: '192.168.1.100',
      status: 'Success'
    },
    {
      id: 2,
      timestamp: '2024-06-03 09:15:00',
      user: 'Jane Smith',
      organization: 'StartupHub',
      action: 'Cancelled',
      resource: 'Booking #1233',
      details: 'Hot Desk #5 - 2024-06-04 09:00',
      ipAddress: '192.168.1.101',
      status: 'Success'
    },
    {
      id: 3,
      timestamp: '2024-06-03 08:45:00',
      user: 'Mike Johnson',
      organization: 'DesignStudio',
      action: 'Modified',
      resource: 'Booking #1232',
      details: 'Extended until 18:00',
      ipAddress: '192.168.1.102',
      status: 'Success'
    },
    {
      id: 4,
      timestamp: '2024-06-02 16:20:00',
      user: 'Sarah Wilson',
      organization: 'ConsultFirm',
      action: 'Created',
      resource: 'Booking #1231',
      details: 'Private Office - 2024-06-10 10:00',
      ipAddress: '192.168.1.103',
      status: 'Failed'
    },
    {
      id: 5,
      timestamp: '2024-06-02 14:10:00',
      user: 'David Brown',
      organization: 'EduTech',
      action: 'Checked In',
      resource: 'Booking #1230',
      details: 'Meeting Room B - 2024-06-02 14:00',
      ipAddress: '192.168.1.104',
      status: 'Success'
    },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action.toLowerCase() === actionFilter;
    return matchesSearch && matchesAction;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'Created': return <Badge variant="default">Created</Badge>;
      case 'Modified': return <Badge variant="outline">Modified</Badge>;
      case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      case 'Checked In': return <Badge variant="secondary">Checked In</Badge>;
      default: return <Badge variant="secondary">{action}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'Success' ? 
      <Badge variant="default">Success</Badge> : 
      <Badge variant="destructive">Failed</Badge>;
  };

  const handleExport = (format: string) => {
    console.log(`Exporting audit logs as ${format}`);
    // Implementation would generate and download the file
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Booking Audit Logs</h2>
          <p className="text-sm md:text-base text-gray-600">Monitor all booking activity for compliance and debugging</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')} size="sm">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">CSV</span>
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')} size="sm">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 md:gap-4">
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="modified">Modified</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="checked in">Checked In</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1day">Last 24 hours</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">Audit Logs ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3 p-4">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{log.user}</div>
                    {getStatusBadge(log.status)}
                  </div>
                  <div className="text-xs text-gray-500">{log.organization}</div>
                  <div className="flex items-center gap-2">
                    {getActionBadge(log.action)}
                    <span className="text-sm font-medium">{log.resource}</span>
                  </div>
                  <div className="text-xs text-gray-600 truncate">{log.details}</div>
                  <div className="text-xs text-gray-500 font-mono">{log.timestamp}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.organization}</TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell className="font-medium">{log.resource}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingAuditLogs;
