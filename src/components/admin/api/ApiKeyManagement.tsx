
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Copy, Eye, EyeOff, Key, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string;
  created: string;
  status: 'active' | 'inactive';
  usageCount: number;
}

const ApiKeyManagement = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Mobile App Integration',
      key: 'dk_live_abc123...xyz789',
      permissions: ['bookings:read', 'workspaces:read'],
      lastUsed: '2024-06-15 10:30:00',
      created: '2024-06-01 09:00:00',
      status: 'active',
      usageCount: 1247
    },
    {
      id: '2',
      name: 'Analytics Dashboard',
      key: 'dk_live_def456...uvw012',
      permissions: ['analytics:read', 'reports:read'],
      lastUsed: '2024-06-14 15:45:00',
      created: '2024-05-20 11:30:00',
      status: 'active',
      usageCount: 892
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const availablePermissions = [
    'bookings:read', 'bookings:write', 'bookings:delete',
    'workspaces:read', 'workspaces:write', 'workspaces:delete',
    'users:read', 'users:write', 'users:delete',
    'analytics:read', 'reports:read', 'admin:read'
  ];

  const createApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the API key",
        variant: "destructive"
      });
      return;
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `dk_live_${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 8)}`,
      permissions: newKeyPermissions,
      lastUsed: 'Never',
      created: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'active',
      usageCount: 0
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setNewKeyPermissions([]);
    setShowCreateDialog(false);
    
    toast({
      title: "API Key Created",
      description: "Your new API key has been generated successfully"
    });
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "API key copied to clipboard"
    });
  };

  const toggleKeyStatus = (keyId: string) => {
    setApiKeys(keys => keys.map(key => 
      key.id === keyId 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ));
  };

  const regenerateKey = (keyId: string) => {
    setApiKeys(keys => keys.map(key => 
      key.id === keyId 
        ? { 
            ...key, 
            key: `dk_live_${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 8)}`,
            usageCount: 0,
            lastUsed: 'Never'
          }
        : key
    ));
    
    toast({
      title: "Key Regenerated",
      description: "API key has been regenerated successfully"
    });
  };

  const deleteKey = (keyId: string) => {
    setApiKeys(keys => keys.filter(key => key.id !== keyId));
    toast({
      title: "Key Deleted",
      description: "API key has been deleted"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Key Management</h2>
          <p className="text-gray-600">Manage API keys for external integrations</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Create a new API key for external integrations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="keyName">Key Name</Label>
                <Input
                  id="keyName"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Mobile App Integration"
                />
              </div>
              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availablePermissions.map(permission => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={permission}
                        checked={newKeyPermissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKeyPermissions([...newKeyPermissions, permission]);
                          } else {
                            setNewKeyPermissions(newKeyPermissions.filter(p => p !== permission));
                          }
                        }}
                      />
                      <Label htmlFor={permission} className="text-sm">{permission}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={createApiKey}>Create Key</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* API Keys Table */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys ({apiKeys.length})</CardTitle>
          <CardDescription>Manage your organization's API keys</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Usage Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell className="font-mono">
                    <div className="flex items-center space-x-2">
                      <span>
                        {visibleKeys.has(apiKey.id) ? apiKey.key : '••••••••••••••••'}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.map(permission => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{apiKey.lastUsed}</TableCell>
                  <TableCell>{apiKey.usageCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                        {apiKey.status}
                      </Badge>
                      <Switch
                        checked={apiKey.status === 'active'}
                        onCheckedChange={() => toggleKeyStatus(apiKey.id)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => regenerateKey(apiKey.id)}
                        title="Regenerate Key"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteKey(apiKey.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Key"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Developer Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Developer Resources</CardTitle>
          <CardDescription>Documentation and tools for API integration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">API Documentation</h4>
              <p className="text-sm text-gray-600 mb-3">Complete API reference and examples</p>
              <Button variant="outline" size="sm">View Docs</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Rate Limits</h4>
              <p className="text-sm text-gray-600 mb-3">1000 requests per hour per key</p>
              <Button variant="outline" size="sm">View Usage</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Webhooks</h4>
              <p className="text-sm text-gray-600 mb-3">Set up real-time notifications</p>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyManagement;
