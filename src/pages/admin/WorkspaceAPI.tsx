
import React, { useState } from 'react';
import WorkspaceAdminLayout from '@/components/workspace-admin/WorkspaceAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Key, Code, Settings, RefreshCw, Eye, EyeOff } from 'lucide-react';

const WorkspaceAPI = () => {
  const [apiKeys] = useState([
    { id: '1', name: 'Production API', key: 'sk_live_***************', status: 'active', lastUsed: '2 hours ago' },
    { id: '2', name: 'Development API', key: 'sk_test_***************', status: 'active', lastUsed: '1 day ago' },
    { id: '3', name: 'Mobile App API', key: 'sk_live_***************', status: 'inactive', lastUsed: '1 week ago' }
  ]);

  const [webhooks] = useState([
    { id: '1', url: 'https://api.example.com/webhooks/booking', events: ['booking.created', 'booking.updated'], status: 'active' },
    { id: '2', url: 'https://api.example.com/webhooks/payment', events: ['payment.completed', 'payment.failed'], status: 'active' }
  ]);

  const [showKey, setShowKey] = useState<string | null>(null);

  return (
    <WorkspaceAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">API & Developer Tools</h1>
            <p className="text-muted-foreground">Manage API keys, webhooks, and integrations</p>
          </div>
          <Button>
            <Key className="h-4 w-4 mr-2" />
            Generate API Key
          </Button>
        </div>

        <Tabs defaultValue="api-keys" className="space-y-4">
          <TabsList>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for external integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Key className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{apiKey.name}</p>
                          <div className="flex items-center space-x-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {showKey === apiKey.id ? apiKey.key : apiKey.key}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                            >
                              {showKey === apiKey.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">Last used: {apiKey.lastUsed}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                          {apiKey.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Endpoints</CardTitle>
                <CardDescription>Configure webhook URLs to receive real-time updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhooks.map((webhook) => (
                    <div key={webhook.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Code className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{webhook.url}</p>
                          <div className="flex space-x-1 mt-1">
                            {webhook.events.map((event) => (
                              <Badge key={event} variant="outline" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'}>
                          {webhook.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4">Add Webhook</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Learn how to integrate with our API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Getting Started</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn the basics of authentication and making your first API call.
                    </p>
                    <Button variant="outline" size="sm">View Guide</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">API Reference</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete reference for all API endpoints and parameters.
                    </p>
                    <Button variant="outline" size="sm">View Reference</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">SDKs & Libraries</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Official SDKs for popular programming languages.
                    </p>
                    <Button variant="outline" size="sm">Download SDKs</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Code Examples</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Sample code and integration examples.
                    </p>
                    <Button variant="outline" size="sm">View Examples</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rate-limits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
                <CardDescription>Monitor API usage and configure rate limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold">1,250</p>
                    <p className="text-sm text-muted-foreground">Requests Today</p>
                    <p className="text-xs text-green-600">25% of limit</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-muted-foreground">Requests/Hour</p>
                    <p className="text-xs text-green-600">15% of limit</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold">5,000</p>
                    <p className="text-sm text-muted-foreground">Daily Limit</p>
                    <p className="text-xs text-muted-foreground">Current plan</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Requests per minute</Label>
                  <Input placeholder="100" />
                  <Button>Update Rate Limit</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceAdminLayout>
  );
};

export default WorkspaceAPI;
