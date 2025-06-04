
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Shield, AlertTriangle, Eye, Ban, Activity } from 'lucide-react';

const SecurityCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logType, setLogType] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  // Mock security data
  const securityAlerts = [
    {
      id: 1,
      type: 'High',
      message: 'Multiple failed login attempts from IP 192.168.1.150',
      timestamp: '2024-06-03 10:45:00',
      status: 'Active'
    },
    {
      id: 2,
      type: 'Medium',
      message: 'Unusual API usage pattern detected',
      timestamp: '2024-06-03 09:30:00',
      status: 'Investigating'
    },
    {
      id: 3,
      type: 'Low',
      message: 'New device login from John Doe',
      timestamp: '2024-06-03 08:15:00',
      status: 'Resolved'
    }
  ];

  const failedLogins = [
    {
      id: 1,
      username: 'admin',
      ipAddress: '192.168.1.150',
      timestamp: '2024-06-03 10:45:23',
      attempts: 5,
      location: 'Unknown',
      blocked: true
    },
    {
      id: 2,
      username: 'john.doe@techcorp.com',
      ipAddress: '203.0.113.1',
      timestamp: '2024-06-03 09:22:15',
      attempts: 3,
      location: 'New York, US',
      blocked: false
    },
    {
      id: 3,
      username: 'test@test.com',
      ipAddress: '198.51.100.42',
      timestamp: '2024-06-03 08:56:44',
      attempts: 7,
      location: 'Unknown',
      blocked: true
    }
  ];

  const apiLogs = [
    {
      id: 1,
      endpoint: '/api/organizations',
      method: 'GET',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      timestamp: '2024-06-03 10:30:00',
      status: 200,
      responseTime: '150ms'
    },
    {
      id: 2,
      endpoint: '/api/users/bulk-create',
      method: 'POST',
      ipAddress: '203.0.113.15',
      userAgent: 'curl/7.68.0',
      timestamp: '2024-06-03 10:25:30',
      status: 429,
      responseTime: '50ms'
    },
    {
      id: 3,
      endpoint: '/api/workspaces',
      method: 'DELETE',
      ipAddress: '198.51.100.25',
      userAgent: 'PostmanRuntime/7.28.0',
      timestamp: '2024-06-03 10:20:15',
      status: 401,
      responseTime: '25ms'
    }
  ];

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'High': return <Badge variant="destructive">High</Badge>;
      case 'Medium': return <Badge variant="secondary">Medium</Badge>;
      case 'Low': return <Badge variant="outline">Low</Badge>;
      default: return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge variant="destructive">Active</Badge>;
      case 'Investigating': return <Badge variant="secondary">Investigating</Badge>;
      case 'Resolved': return <Badge variant="default">Resolved</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getHttpStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) return <Badge variant="default">{status}</Badge>;
    if (status >= 400 && status < 500) return <Badge variant="secondary">{status}</Badge>;
    if (status >= 500) return <Badge variant="destructive">{status}</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold">Security Center</h2>
        <p className="text-sm md:text-base text-gray-600">Monitor security events and audit system access</p>
      </div>

      {/* Security Alerts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <AlertTriangle className="h-5 w-5" />
            Active Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityAlerts.map((alert) => (
              <Alert key={alert.id}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <AlertDescription className="font-medium text-sm">{alert.message}</AlertDescription>
                      <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-7 md:ml-0">
                    {getAlertBadge(alert.type)}
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Failed Login Attempts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Ban className="h-5 w-5" />
            Failed Login Attempts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search failed logins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last hour</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3">
            {failedLogins.map((login) => (
              <Card key={login.id} className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm truncate">{login.username}</div>
                    {login.blocked ? (
                      <Badge variant="destructive" className="text-xs">Blocked</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>IP: {login.ipAddress}</div>
                    <div>Location: {login.location}</div>
                    <div>Attempts: <Badge variant={login.attempts > 5 ? "destructive" : "secondary"} className="text-xs">{login.attempts}</Badge></div>
                    <div className="font-mono">{login.timestamp}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {failedLogins.map((login) => (
                  <TableRow key={login.id}>
                    <TableCell className="font-medium">{login.username}</TableCell>
                    <TableCell className="font-mono">{login.ipAddress}</TableCell>
                    <TableCell>{login.location}</TableCell>
                    <TableCell>
                      <Badge variant={login.attempts > 5 ? "destructive" : "secondary"}>
                        {login.attempts}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{login.timestamp}</TableCell>
                    <TableCell>
                      {login.blocked ? (
                        <Badge variant="destructive">Blocked</Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* API Request Logs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Activity className="h-5 w-5" />
            API Request Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search API logs..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={logType} onValueChange={setLogType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="success">2xx Success</SelectItem>
                  <SelectItem value="client-error">4xx Client Error</SelectItem>
                  <SelectItem value="server-error">5xx Server Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3">
            {apiLogs.map((log) => (
              <Card key={log.id} className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm truncate">{log.endpoint}</div>
                    {getHttpStatusBadge(log.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{log.method}</Badge>
                    <span className="text-xs text-gray-500">{log.responseTime}</span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>IP: {log.ipAddress}</div>
                    <div className="font-mono">{log.timestamp}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.endpoint}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.method}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{log.ipAddress}</TableCell>
                    <TableCell>{getHttpStatusBadge(log.status)}</TableCell>
                    <TableCell>{log.responseTime}</TableCell>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
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

export default SecurityCenter;
