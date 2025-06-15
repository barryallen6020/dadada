
export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'auth' | 'booking' | 'admin' | 'security' | 'system';
  success: boolean;
}

export interface SeverityStats {
  critical: number;
  high: number;
  medium: number;
  low: number;
}
