import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Building2, 
  Calendar, 
  TrendingUp, 
  Filter,
  Search,
  Download,
  Mail,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  MoreHorizontal,
  UserCheck
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import WaitlistEntryDetailsModal from './waitlist-actions/WaitlistEntryDetailsModal';
import SendEmailModal from './waitlist-actions/SendEmailModal';

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

interface WaitlistManagementProps {
  isSidebarCollapsed?: boolean;
}

const WaitlistManagement: React.FC<WaitlistManagementProps> = ({ isSidebarCollapsed = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const waitlistStats = {
    totalEntries: 1247,
    thisMonth: 189,
    conversionRate: 23.5,
    avgResponseTime: 2.3
  };

  const chartData = [
    { month: 'Jan', entries: 45, converted: 12 },
    { month: 'Feb', entries: 78, converted: 18 },
    { month: 'Mar', entries: 92, converted: 25 },
    { month: 'Apr', entries: 156, converted: 42 },
    { month: 'May', entries: 189, converted: 51 },
    { month: 'Jun', entries: 167, converted: 38 },
  ];

  const roleDistribution = [
    { name: 'Founders', value: 35, color: '#8884d8' },
    { name: 'Developers', value: 28, color: '#82ca9d' },
    { name: 'Designers', value: 20, color: '#ffc658' },
    { name: 'Marketers', value: 12, color: '#ff7300' },
    { name: 'Others', value: 5, color: '#00ff88' },
  ];

  const sourceData = [
    { source: 'Website', count: 523 },
    { source: 'Social Media', count: 312 },
    { source: 'Referral', count: 234 },
    { source: 'Email Campaign', count: 178 },
  ];

  const mockEntries: WaitlistEntry[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      company: 'TechCorp',
      role: 'Founder',
      date: '2024-06-01',
      subscriptions: ['newsletter', 'updates'],
      status: 'pending',
      source: 'Website',
      notes: 'Very interested in enterprise features. Has a team of 50+ people.'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@startup.com',
      company: 'StartupXYZ',
      role: 'Developer',
      date: '2024-06-02',
      subscriptions: ['newsletter'],
      status: 'contacted',
      source: 'Social Media'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@design.co',
      company: 'DesignCo',
      role: 'Designer',
      date: '2024-06-03',
      subscriptions: ['newsletter', 'updates', 'promotions'],
      status: 'converted',
      source: 'Referral'
    },
  ];

  const handleViewDetails = (entry: WaitlistEntry) => {
    setSelectedEntry(entry);
    setShowDetailsModal(true);
  };

  const handleSendEmail = (entry: WaitlistEntry) => {
    setSelectedEntry(entry);
    setShowEmailModal(true);
  };

  const handleMarkConverted = (entry: WaitlistEntry) => {
    toast({
      title: "Entry converted",
      description: `${entry.name} has been marked as converted.`
    });
    console.log('Converting entry:', entry.id);
  };

  const handleDeleteEntry = (entry: WaitlistEntry) => {
    toast({
      title: "Entry deleted",
      description: `${entry.name} has been removed from the waitlist.`,
      variant: "destructive"
    });
    console.log('Deleting entry:', entry.id);
  };

  const handleSendEmailFromModal = (emailData: { subject: string; content: string; templateId?: string }) => {
    toast({
      title: "Email sent",
      description: `Email sent successfully to ${selectedEntry?.name}.`
    });
    console.log('Sending email:', emailData, 'to:', selectedEntry?.id);
  };

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

  const filteredEntries = mockEntries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    const matchesRole = roleFilter === 'all' || entry.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-3 md:space-y-4 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Waitlist Management</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Manage and analyze waitlist entries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            <Download className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Export
          </Button>
          <Button size="sm" className="text-xs md:text-sm">
            <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Send Email
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 text-xs md:text-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-3 md:space-y-4">
          {/* Metric Cards */}
          <div className={`grid gap-2 md:gap-3 ${
            isSidebarCollapsed 
              ? 'grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            <Card className="p-3 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
                <CardTitle className="text-xs md:text-sm font-medium">Total Entries</CardTitle>
                <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-1 md:pt-2">
                <div className="text-lg md:text-2xl font-bold">{waitlistStats.totalEntries.toLocaleString()}</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
                <CardTitle className="text-xs md:text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-1 md:pt-2">
                <div className="text-lg md:text-2xl font-bold">{waitlistStats.thisMonth}</div>
                <p className="text-xs text-green-600">+23% from last month</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
                <CardTitle className="text-xs md:text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-1 md:pt-2">
                <div className="text-lg md:text-2xl font-bold">{waitlistStats.conversionRate}%</div>
                <p className="text-xs text-green-600">+3.2% from last month</p>
              </CardContent>
            </Card>

            <Card className="p-3 md:p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 p-0">
                <CardTitle className="text-xs md:text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0 pt-1 md:pt-2">
                <div className="text-lg md:text-2xl font-bold">{waitlistStats.avgResponseTime}d</div>
                <p className="text-xs text-red-600">+0.3d from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className={`grid gap-3 md:gap-4 ${
            isSidebarCollapsed 
              ? 'grid-cols-1 xl:grid-cols-2' 
              : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            <Card>
              <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
                <CardTitle className="text-sm md:text-lg">Entry Trends</CardTitle>
                <CardDescription className="text-xs md:text-sm">Monthly waitlist entries and conversions</CardDescription>
              </CardHeader>
              <CardContent className="p-2 md:p-4">
                <div className="w-full h-[150px] sm:h-[200px] md:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={9} tick={{ fontSize: 9 }} />
                      <YAxis fontSize={9} tick={{ fontSize: 9 }} width={30} />
                      <Tooltip />
                      <Line type="monotone" dataKey="entries" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="converted" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
                <CardTitle className="text-sm md:text-lg">Role Distribution</CardTitle>
                <CardDescription className="text-xs md:text-sm">Breakdown by professional roles</CardDescription>
              </CardHeader>
              <CardContent className="p-2 md:p-4">
                <div className="w-full h-[150px] sm:h-[200px] md:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={roleDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                      >
                        {roleDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {roleDistribution.map((role, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: role.color }}
                      />
                      <span>{role.name}: {role.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="entries" className="space-y-3 md:space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 md:pl-8 text-xs md:text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 text-xs md:text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40 text-xs md:text-sm">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Founder">Founder</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Marketer">Marketer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Updated Entries Table with action handlers */}
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
                    {filteredEntries.map((entry) => (
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
                              <DropdownMenuItem onClick={() => handleViewDetails(entry)}>
                                <Eye className="h-3 w-3 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendEmail(entry)}>
                                <Mail className="h-3 w-3 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkConverted(entry)}>
                                <UserCheck className="h-3 w-3 mr-2" />
                                Mark Converted
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteEntry(entry)}
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-3 md:space-y-4">
          <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
                <CardTitle className="text-sm md:text-lg">Traffic Sources</CardTitle>
                <CardDescription className="text-xs md:text-sm">Where users are coming from</CardDescription>
              </CardHeader>
              <CardContent className="p-2 md:p-4">
                <div className="w-full h-[200px] md:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sourceData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" fontSize={9} tick={{ fontSize: 9 }} />
                      <YAxis fontSize={9} tick={{ fontSize: 9 }} width={30} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
                <CardTitle className="text-sm md:text-lg">Recent Activity</CardTitle>
                <CardDescription className="text-xs md:text-sm">Latest waitlist activities</CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-medium">New signup from TechCorp</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-medium">Email sent to 25 pending users</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-medium">3 users converted to paid plans</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <WaitlistEntryDetailsModal
        entry={selectedEntry}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onSendEmail={handleSendEmail}
        onMarkConverted={handleMarkConverted}
        onDelete={handleDeleteEntry}
      />

      <SendEmailModal
        entry={selectedEntry}
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSend={handleSendEmailFromModal}
      />
    </div>
  );
};

export default WaitlistManagement;
