
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download, FileText, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface FinancialReportsProps {
  isSidebarCollapsed?: boolean;
}

const FinancialReports: React.FC<FinancialReportsProps> = ({ isSidebarCollapsed = false }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [reportType, setReportType] = useState('revenue');

  const reportTypes = [
    { value: 'revenue', label: 'Revenue Report' },
    { value: 'bookings', label: 'Booking Report' },
    { value: 'occupancy', label: 'Occupancy Report' },
    { value: 'financial', label: 'Financial Summary' }
  ];

  const recentReports = [
    {
      name: 'Monthly Revenue Report - May 2024',
      type: 'Revenue',
      generated: '2024-05-31',
      size: '2.4 MB'
    },
    {
      name: 'Workspace Utilization Analysis',
      type: 'Analytics',
      generated: '2024-05-28',
      size: '1.8 MB'
    },
    {
      name: 'Financial Summary Q1 2024',
      type: 'Financial',
      generated: '2024-03-31',
      size: '3.2 MB'
    }
  ];

  const handleExportReport = (format: string) => {
    console.log(`Exporting ${reportType} report as ${format}`, { dateRange });
    // Implementation would generate and download the report
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Financial Reports</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleExportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport('excel')}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className={`grid gap-4 ${
        isSidebarCollapsed 
          ? 'grid-cols-1 xl:grid-cols-3' 
          : 'grid-cols-1 lg:grid-cols-3'
      }`}>
        {/* Report Generator */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Generate New Report</CardTitle>
            <CardDescription>Create custom financial and operational reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Report Type
                </label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Date Range
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1" onClick={() => handleExportReport('pdf')}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" onClick={() => handleExportReport('preview')}>
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
            <CardDescription>This month's key metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="font-semibold">₦2,450,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Bookings</span>
              <span className="font-semibold">1,245</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg. Occupancy</span>
              <div className="flex items-center space-x-1">
                <span className="font-semibold">82%</span>
                <TrendingUp className="h-3 w-3 text-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Workspaces</span>
              <span className="font-semibold">24</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Reports</CardTitle>
          <CardDescription>Previously generated reports and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{report.type}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{report.generated}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialReports;
