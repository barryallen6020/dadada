
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { SecurityOverview } from './SecurityOverview';
import { AuditFilters } from './AuditFilters';
import { AuditLogsTable } from './AuditLogsTable';
import { useAuditData } from './useAuditData';
import { SeverityStats } from './types';

const AuditLogging = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);

  const { auditLogs } = useAuditData();

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const exportLogs = (format: 'csv' | 'json') => {
    console.log(`Exporting audit logs as ${format}`);
    // Implementation would generate and download the file
  };

  const severityStats: SeverityStats = {
    critical: auditLogs.filter(log => log.severity === 'critical').length,
    high: auditLogs.filter(log => log.severity === 'high').length,
    medium: auditLogs.filter(log => log.severity === 'medium').length,
    low: auditLogs.filter(log => log.severity === 'low').length,
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Logging</h2>
          <p className="text-gray-600">Monitor all system activities and security events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportLogs('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportLogs('json')}>
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      <SecurityOverview severityStats={severityStats} />

      <AuditFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSeverity={selectedSeverity}
        setSelectedSeverity={setSelectedSeverity}
        dateRange={dateRange}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        handleDateRangeSelect={handleDateRangeSelect}
      />

      <AuditLogsTable filteredLogs={filteredLogs} />
    </div>
  );
};

export default AuditLogging;
