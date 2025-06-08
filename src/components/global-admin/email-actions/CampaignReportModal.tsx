
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Eye, MousePointer, Mail, Users, Download, Calendar } from 'lucide-react';

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

interface CampaignReportModalProps {
  campaign: EmailCampaign | null;
  isOpen: boolean;
  onClose: () => void;
}

const CampaignReportModal: React.FC<CampaignReportModalProps> = ({
  campaign,
  isOpen,
  onClose
}) => {
  if (!campaign) return null;

  // Mock detailed analytics data
  const detailedStats = {
    sent: campaign.recipients,
    delivered: Math.floor(campaign.recipients * 0.98),
    opened: Math.floor(campaign.recipients * (campaign.openRate || 0) / 100),
    clicked: Math.floor(campaign.recipients * (campaign.clickRate || 0) / 100),
    bounced: Math.floor(campaign.recipients * 0.02),
    unsubscribed: Math.floor(campaign.recipients * 0.005)
  };

  const timeSeriesData = [
    { hour: '0-2h', opens: 45, clicks: 12 },
    { hour: '2-4h', opens: 89, clicks: 23 },
    { hour: '4-6h', opens: 156, clicks: 45 },
    { hour: '6-8h', opens: 203, clicks: 67 },
    { hour: '8-10h', opens: 178, clicks: 54 },
    { hour: '10-12h', opens: 134, clicks: 38 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#8884d8' },
    { name: 'Mobile', value: 35, color: '#82ca9d' },
    { name: 'Tablet', value: 20, color: '#ffc658' },
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Campaign Report
          </DialogTitle>
          <DialogDescription>Detailed analytics for "{campaign.name}"</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Campaign Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Campaign Name</label>
                  <p className="text-sm text-gray-900">{campaign.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Subject Line</label>
                  <p className="text-sm text-gray-900">{campaign.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Sent Date</label>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-sm">
                      {campaign.sentAt ? new Date(campaign.sentAt).toLocaleDateString() : 'Not sent'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recipients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{detailedStats.sent.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total sent</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.openRate || 0}%</div>
                <Progress value={campaign.openRate || 0} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaign.clickRate || 0}%</div>
                <Progress value={campaign.clickRate || 0} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.0%</div>
                <Progress value={2} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Metrics</CardTitle>
              <CardDescription>Breakdown of email engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{detailedStats.sent.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{detailedStats.delivered.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{detailedStats.opened.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Opened</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{detailedStats.clicked.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Clicked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{detailedStats.bounced}</div>
                  <div className="text-xs text-muted-foreground">Bounced</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{detailedStats.unsubscribed}</div>
                  <div className="text-xs text-muted-foreground">Unsubscribed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement Over Time</CardTitle>
                <CardDescription>Opens and clicks by time period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Bar dataKey="opens" fill="#8884d8" name="Opens" />
                      <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Device Breakdown</CardTitle>
                <CardDescription>Opens by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: device.color }}
                      />
                      <span>{device.name}: {device.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 mr-1" />
              Export Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignReportModal;
