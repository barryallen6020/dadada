
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WaitlistEntryDetailsModal from './waitlist-actions/WaitlistEntryDetailsModal';
import SendEmailModal from './waitlist-actions/SendEmailModal';
import WaitlistMetrics from './waitlist/WaitlistMetrics';
import WaitlistCharts from './waitlist/WaitlistCharts';
import WaitlistFilters from './waitlist/WaitlistFilters';
import WaitlistTable from './waitlist/WaitlistTable';
import WaitlistAnalytics from './waitlist/WaitlistAnalytics';

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
          <WaitlistMetrics 
            isSidebarCollapsed={isSidebarCollapsed}
            stats={waitlistStats}
          />
          <WaitlistCharts 
            isSidebarCollapsed={isSidebarCollapsed}
            chartData={chartData}
            roleDistribution={roleDistribution}
          />
        </TabsContent>

        <TabsContent value="entries" className="space-y-3 md:space-y-4">
          <WaitlistFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />
          <WaitlistTable
            entries={filteredEntries}
            onViewDetails={handleViewDetails}
            onSendEmail={handleSendEmail}
            onMarkConverted={handleMarkConverted}
            onDelete={handleDeleteEntry}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-3 md:space-y-4">
          <WaitlistAnalytics sourceData={sourceData} />
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
