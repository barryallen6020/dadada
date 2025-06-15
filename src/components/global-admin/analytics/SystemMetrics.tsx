
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Server, Database, Wifi, HardDrive, Cpu, Activity } from 'lucide-react';

interface SystemMetric {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  icon: React.ElementType;
}

interface SystemMetricsProps {
  isLoading?: boolean;
}

const SystemMetrics: React.FC<SystemMetricsProps> = ({ isLoading = false }) => {
  const metrics: SystemMetric[] = [
    {
      label: 'Server CPU',
      value: 45,
      maxValue: 100,
      unit: '%',
      status: 'healthy',
      icon: Cpu
    },
    {
      label: 'Memory Usage',
      value: 68,
      maxValue: 100,
      unit: '%',
      status: 'warning',
      icon: Server
    },
    {
      label: 'Database Load',
      value: 32,
      maxValue: 100,
      unit: '%',
      status: 'healthy',
      icon: Database
    },
    {
      label: 'Network I/O',
      value: 78,
      maxValue: 100,
      unit: '%',
      status: 'warning',
      icon: Wifi
    },
    {
      label: 'Storage Used',
      value: 156,
      maxValue: 500,
      unit: 'GB',
      status: 'healthy',
      icon: HardDrive
    },
    {
      label: 'API Response Time',
      value: 245,
      maxValue: 1000,
      unit: 'ms',
      status: 'healthy',
      icon: Activity
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="animate-pulse h-6 bg-gray-200 rounded w-1/3"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Server className="h-5 w-5" />
          System Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const percentage = (metric.value / metric.maxValue) * 100;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {metric.value}{metric.unit}
                    </span>
                    {getStatusBadge(metric.status)}
                  </div>
                </div>
                <div className="relative">
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor(metric.status)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMetrics;
