
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp } from 'lucide-react';
import EmailMetrics from '../EmailMetrics';
import { EmailStats } from '../types';

interface AnalyticsTabProps {
  emailStats: EmailStats;
  isSidebarCollapsed?: boolean;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  emailStats,
  isSidebarCollapsed = false
}) => {
  return (
    <div className="space-y-3 md:space-y-4">
      <EmailMetrics isSidebarCollapsed={isSidebarCollapsed} stats={emailStats} />
      <Alert>
        <TrendingUp className="h-4 w-4" />
        <AlertDescription>
          Email performance is above industry average. Open rates are 24.5% vs industry average of 21.3%.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AnalyticsTab;
