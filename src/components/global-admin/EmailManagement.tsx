
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Mail, 
  Send, 
  Eye, 
  Save, 
  Copy,
  Users,
  Building2,
  Calendar,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  FileText,
  Image,
  Link,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  MoreHorizontal,
  Download,
  Upload
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  description: string;
  content: string;
  variables: string[];
  createdAt: string;
  lastUsed?: string;
  isActive: boolean;
}

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

interface EmailManagementProps {
  isSidebarCollapsed?: boolean;
}

const EmailManagement: React.FC<EmailManagementProps> = ({ isSidebarCollapsed = false }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [recipientType, setRecipientType] = useState('all');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  // Mock data
  const emailStats = {
    totalSent: 45678,
    openRate: 24.5,
    clickRate: 3.2,
    unsubscribeRate: 0.8
  };

  const templates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Welcome Newsletter',
      subject: 'Welcome to DeskHive!',
      category: 'onboarding',
      description: 'Welcome email for new users',
      content: '<h1>Welcome to DeskHive!</h1><p>We\'re excited to have you on board.</p>',
      variables: ['{{userName}}', '{{companyName}}'],
      createdAt: '2024-06-01',
      lastUsed: '2024-06-05',
      isActive: true
    },
    {
      id: '2',
      name: 'Product Update',
      subject: 'New Features Available',
      category: 'product',
      description: 'Announcement of new features',
      content: '<h1>New Features</h1><p>Check out our latest updates!</p>',
      variables: ['{{userName}}', '{{featureName}}'],
      createdAt: '2024-06-02',
      lastUsed: '2024-06-04',
      isActive: true
    },
    {
      id: '3',
      name: 'Promotional Offer',
      subject: 'Special Discount Inside!',
      category: 'promotion',
      description: 'Marketing promotion template',
      content: '<h1>Special Offer</h1><p>Get 50% off your next booking!</p>',
      variables: ['{{userName}}', '{{discountCode}}', '{{expiryDate}}'],
      createdAt: '2024-06-03',
      isActive: true
    }
  ];

  const campaigns: EmailCampaign[] = [
    {
      id: '1',
      name: 'June Newsletter',
      subject: 'Your June Update from DeskHive',
      template: 'Welcome Newsletter',
      recipients: 1247,
      status: 'sent',
      createdAt: '2024-06-01',
      sentAt: '2024-06-01',
      openRate: 28.5,
      clickRate: 4.2
    },
    {
      id: '2',
      name: 'Feature Announcement',
      subject: 'New Workspace Features Now Live',
      template: 'Product Update',
      recipients: 2156,
      status: 'sent',
      createdAt: '2024-06-03',
      sentAt: '2024-06-03',
      openRate: 32.1,
      clickRate: 6.8
    },
    {
      id: '3',
      name: 'Summer Promotion',
      subject: 'Summer Special - 50% Off',
      template: 'Promotional Offer',
      recipients: 3421,
      status: 'scheduled',
      createdAt: '2024-06-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EditorToolbar = () => (
    <div className="flex flex-wrap items-center gap-1 md:gap-2 p-2 border-b">
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Bold className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Italic className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Underline className="h-3 w-3" />
        </Button>
      </div>
      <Separator orientation="vertical" className="h-4" />
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <AlignLeft className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <AlignCenter className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <AlignRight className="h-3 w-3" />
        </Button>
      </div>
      <Separator orientation="vertical" className="h-4" />
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <List className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Link className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Image className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-3 md:space-y-4 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Email Management</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Create and manage email campaigns</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showTemplateEditor} onOpenChange={setShowTemplateEditor}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
                <DialogDescription>Design a reusable email template</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Template Name" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="product">Product Updates</SelectItem>
                      <SelectItem value="promotion">Promotions</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="Email Subject" />
                <Textarea placeholder="Template Description" rows={2} />
                <div className="border rounded-lg">
                  <EditorToolbar />
                  <Textarea 
                    placeholder="Email content..." 
                    className="min-h-[200px] border-0 resize-none" 
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowTemplateEditor(false)}>Cancel</Button>
                  <Button onClick={() => setShowTemplateEditor(false)}>Save Template</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm" className="text-xs md:text-sm">
            <Send className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-4 text-xs md:text-sm">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-3 md:space-y-4">
          <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-3">
            {/* Email Composer */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm md:text-lg">Compose Email</CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                        className="text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        {isPreviewMode ? 'Edit' : 'Preview'}
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 md:p-4 space-y-3 md:space-y-4">
                  <div className="grid gap-3 md:gap-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium">Recipients</label>
                      <Select value={recipientType} onValueChange={setRecipientType}>
                        <SelectTrigger className="text-xs md:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users (5,247)</SelectItem>
                          <SelectItem value="admins">Admins (45)</SelectItem>
                          <SelectItem value="hub_managers">Hub Managers (128)</SelectItem>
                          <SelectItem value="members">Members (5,074)</SelectItem>
                          <SelectItem value="waitlist">Waitlist (1,247)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium">Subject</label>
                      <Input 
                        placeholder="Email subject..." 
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="text-xs md:text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium">Template</label>
                      <Select onValueChange={(value) => {
                        const template = templates.find(t => t.id === value);
                        if (template) {
                          setSelectedTemplate(template);
                          setEmailSubject(template.subject);
                          setEmailContent(template.content);
                        }
                      }}>
                        <SelectTrigger className="text-xs md:text-sm">
                          <SelectValue placeholder="Choose template..." />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {!isPreviewMode ? (
                    <div className="border rounded-lg">
                      <EditorToolbar />
                      <Textarea 
                        placeholder="Compose your email..."
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        className="min-h-[250px] border-0 resize-none text-xs md:text-sm"
                      />
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 bg-white min-h-[250px]">
                      <div className="mb-4 pb-4 border-b">
                        <h3 className="font-bold text-lg">{emailSubject}</h3>
                        <p className="text-sm text-muted-foreground">To: {recipientType} recipients</p>
                      </div>
                      <div 
                        className="prose max-w-none text-xs md:text-sm"
                        dangerouslySetInnerHTML={{ __html: emailContent }}
                      />
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 justify-end">
                    <Button variant="outline" size="sm" className="text-xs md:text-sm">
                      <Save className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Save Draft
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs md:text-sm">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Schedule
                    </Button>
                    <Button size="sm" className="text-xs md:text-sm">
                      <Send className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Send Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-3 md:space-y-4">
              {/* Email Stats */}
              <Card>
                <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
                  <CardTitle className="text-sm md:text-lg">Email Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4 space-y-3">
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold">{emailStats.totalSent.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total Emails Sent</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>
                      <div className="text-sm md:text-base font-semibold text-blue-600">{emailStats.openRate}%</div>
                      <div className="text-xs text-muted-foreground">Open Rate</div>
                    </div>
                    <div>
                      <div className="text-sm md:text-base font-semibold text-green-600">{emailStats.clickRate}%</div>
                      <div className="text-xs text-muted-foreground">Click Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Variables Helper */}
              {selectedTemplate && (
                <Card>
                  <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
                    <CardTitle className="text-sm md:text-lg">Available Variables</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4">
                    <div className="space-y-2">
                      {selectedTemplate.variables.map((variable, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{variable}</code>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
                  <CardTitle className="text-sm md:text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-xs justify-start">
                    <Download className="h-3 w-3 mr-2" />
                    Import Recipients
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs justify-start">
                    <Upload className="h-3 w-3 mr-2" />
                    Upload Images
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs justify-start">
                    <FileText className="h-3 w-3 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-3 md:space-y-4">
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
                              <DropdownMenuItem>
                                <Eye className="h-3 w-3 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-3 w-3 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-3 w-3 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
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
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-3 md:space-y-4">
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
                              <DropdownMenuItem>
                                <Eye className="h-3 w-3 mr-2" />
                                View Report
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-3 w-3 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-3 md:space-y-4">
          {/* Email Analytics Stats */}
          <div className={`grid gap-2 md:gap-3 ${
            isSidebarCollapsed 
              ? 'grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            <Card className="p-3 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
                <CardTitle className="text-xs md:text-sm font-medium">Total Sent</CardTitle>
                <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-1 md:pt-2">
                <div className="text-lg md:text-2xl font-bold">{emailStats.totalSent.toLocaleString()}</div>
                <p className="text-xs text-green-600">+18% from last month</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
                <CardTitle className="text-xs md:text-sm font-medium">Open Rate</CardTitle>
                <Eye className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-1 md:pt-2">
                <div className="text-lg md:text-2xl font-bold">{emailStats.openRate}%</div>
                <p className="text-xs text-green-600">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
                <CardTitle className="text-xs md:text-sm font-medium">Click Rate</CardTitle>
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-1 md:pt-2">
                <div className="text-lg md:text-2xl font-bold">{emailStats.clickRate}%</div>
                <p className="text-xs text-red-600">-0.3% from last month</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
                <CardTitle className="text-xs md:text-sm font-medium">Unsubscribe Rate</CardTitle>
                <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-1 md:pt-2">
                <div className="text-lg md:text-2xl font-bold">{emailStats.unsubscribeRate}%</div>
                <p className="text-xs text-green-600">-0.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Email performance is above industry average. Open rates are 24.5% vs industry average of 21.3%.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailManagement;
