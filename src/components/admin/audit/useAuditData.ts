
import { AuditLog } from './types';

export const useAuditData = () => {
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: '2024-06-15 14:30:25',
      user: 'admin@company.com',
      action: 'API_KEY_CREATED',
      resource: 'API Key: Mobile Integration',
      details: 'Created new API key with bookings:read, workspaces:read permissions',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'medium',
      category: 'admin',
      success: true
    },
    {
      id: '2',
      timestamp: '2024-06-15 14:25:18',
      user: 'john.doe@company.com',
      action: 'BOOKING_CREATED',
      resource: 'Booking #1245',
      details: 'Created booking for Conference Room A on 2024-06-20 10:00-12:00',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      severity: 'low',
      category: 'booking',
      success: true
    },
    {
      id: '3',
      timestamp: '2024-06-15 14:20:12',
      user: 'malicious@external.com',
      action: 'LOGIN_FAILED',
      resource: 'Authentication System',
      details: 'Failed login attempt with invalid credentials (5th attempt)',
      ipAddress: '203.0.113.45',
      userAgent: 'curl/7.68.0',
      severity: 'high',
      category: 'security',
      success: false
    },
    {
      id: '4',
      timestamp: '2024-06-15 14:15:45',
      user: 'system',
      action: 'WORKSPACE_UPDATED',
      resource: 'Workspace: Tech Hub Downtown',
      details: 'Updated floor plan and seat configuration',
      ipAddress: '127.0.0.1',
      userAgent: 'System Process',
      severity: 'medium',
      category: 'admin',
      success: true
    },
    {
      id: '5',
      timestamp: '2024-06-15 14:10:33',
      user: 'admin@company.com',
      action: 'USER_ROLE_CHANGED',
      resource: 'User: jane.smith@company.com',
      details: 'Changed user role from MEMBER to ORG_ADMIN',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'high',
      category: 'admin',
      success: true
    }
  ];

  return { auditLogs };
};
