
import React, { useState } from 'react';
import WorkspaceAdminLayout from '@/components/workspace-admin/WorkspaceAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Download, Shield, User, Calendar, Settings } from 'lucide-react';

const WorkspaceAudit = () => {
  const [auditLogs] = useState([
    { 
      id: '1', 
      action: 'User Login', 
      user: 'john.doe@example.com', 
      timestamp: '2024-01-15 14:30:25',
      ip: '192.168.1.100',
      status: 'success',
      details: 'Successful login from Chrome browser'
    },
    { 
      id: '2', 
      action: 'Booking Created', 
      user: 'jane.smith@example.com', 
      timestamp: '2024-01-15 14:25:10',
      ip: '192.168.1.101',
      status: 'success',
      details: 'New booking for Conference Room A'
    },
    { 
      id: '3', 
      action: 'Price Update', 
      user: 'admin@example.com', 
      timestamp: '2024-01-15 14:20:05',
      ip: '192.168.1.102',
      status: 'success',
      details: 'Updated hourly rate from $5 to $6'
    },
    { 
      id: '4', 
      action: 'Failed Login', 
      user: 'unknown@example.com', 
      timestamp: '2024-01-15 14:15:00',
      ip: '192.168.1.103',
      status: 'failed',
      details: 'Invalid credentials provided'
    }
  ]);

  const [securityEvents] = useState([
    { id: '1', type: 'Multiple Failed Logins', severity: 'high', count: 5, lastOccurred: '2 hours ago' },
    { id: '2', type: 'Unusual Access Pattern', severity: 'medium', count: 1, lastOccurred: '4 hours ago' },
    { id: '3', type: 'API Rate Limit Exceeded', severity: 'low', count: 12, lastOccurred: '1 day ago' }
  ]);

  return (
    <WorkspaceAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Audit & Activity Logs</h1>
            <p className="text-muted-foreground">Monitor system activity and security events</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Activity Logs</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
            <TabsTrigger value="settings">Log Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search logs..." className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="action">Action Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All actions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Actions</SelectItem>
                        <SelectItem value="login">User Login</SelectItem>
                        <SelectItem value="booking">Booking Actions</SelectItem>
                        <SelectItem value="admin">Admin Actions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="user">User</Label>
                    <Input placeholder="Filter by user" />
                  </div>
                  <div>
                    <Label htmlFor="date">Date Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Last 7 days" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">Last 7 days</SelectItem>
                        <SelectItem value="month">Last 30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Detailed log of all system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-gray-100">
                          {log.action.includes('Login') ? <User className="h-4 w-4" /> : 
                           log.action.includes('Booking') ? <Calendar className="h-4 w-4" /> : 
                           <Settings className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {log.user} • {log.timestamp} • {log.ip}
                          </p>
                          <p className="text-xs text-muted-foreground">{log.details}</p>
                        </div>
                      </div>
                      <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Events</CardTitle>
                <CardDescription>Monitor potential security threats and anomalies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Shield className={`h-5 w-5 ${
                          event.severity === 'high' ? 'text-red-500' :
                          event.severity === 'medium' ? 'text-orange-500' : 'text-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium">{event.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.count} occurrences • Last: {event.lastOccurred}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          event.severity === 'high' ? 'destructive' :
                          event.severity === 'medium' ? 'secondary' : 'outline'
                        }>
                          {event.severity}
                        </Badge>
                        <Button variant="outline" size="sm">Investigate</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
                <CardDescription>Generate reports for compliance and audit purposes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">GDPR Compliance Report</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Data processing activities and user consent records
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Security Audit Report</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Security events and access control summary
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">User Activity Report</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Detailed user activities and system usage
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Financial Audit Report</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Payment processing and financial transactions
                    </p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Log Configuration</CardTitle>
                <CardDescription>Configure logging preferences and retention policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="retention">Log Retention Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level">Log Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceAdminLayout>
  );
};

export default WorkspaceAudit;
