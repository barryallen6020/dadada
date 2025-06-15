
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Activity, Shield, AlertTriangle } from 'lucide-react';
import { AuditLog } from './types';

interface AuditLogsTableProps {
  filteredLogs: AuditLog[];
}

export const AuditLogsTable: React.FC<AuditLogsTableProps> = ({ filteredLogs }) => {
  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: 'secondary',
      medium: 'outline',
      high: 'destructive',
      critical: 'destructive'
    } as const;
    
    return <Badge variant={variants[severity as keyof typeof variants] || 'secondary'}>{severity}</Badge>;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'auth': return <Shield className="h-4 w-4" />;
      case 'security': return <AlertTriangle className="h-4 w-4" />;
      case 'admin': return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Logs ({filteredLogs.length})</CardTitle>
        <CardDescription>Detailed log of all system activities</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell className="font-medium">{log.action}</TableCell>
                <TableCell>{log.resource}</TableCell>
                <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(log.category)}
                    <span className="capitalize">{log.category}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={log.success ? 'default' : 'destructive'}>
                    {log.success ? 'Success' : 'Failed'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
