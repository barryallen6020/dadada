import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface Notification {
  id: string;
  subject: string;
  content: string;
  sender: string;
  senderRole: string;
  isUrgent: boolean;
  isRead: boolean;
  sentAt: Date;
  messageType: string;
}

interface NotificationIconProps {
  userRole: 'org_admin' | 'hub_manager' | 'member';
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ userRole }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        subject: 'System Maintenance Scheduled',
        content: 'We will be performing system maintenance on Sunday from 2-4 AM. Please save your work and log out before this time.',
        sender: 'System Administrator',
        senderRole: 'global_admin',
        isUrgent: true,
        isRead: false,
        sentAt: new Date('2024-06-15T10:30:00'),
        messageType: 'system_maintenance'
      },
      {
        id: '2',
        subject: 'Holiday Office Hours',
        content: 'Please note our updated office hours during the holiday season. We will be operating from 9 AM to 3 PM.',
        sender: 'HR Department',
        senderRole: 'org_admin',
        isUrgent: false,
        isRead: false,
        sentAt: new Date('2024-06-14T14:15:00'),
        messageType: 'holiday_announcement'
      },
      {
        id: '3',
        subject: 'Conference Room A - Equipment Maintenance',
        content: 'Conference Room A will be unavailable tomorrow due to projector maintenance.',
        sender: 'Hub Manager',
        senderRole: 'hub_manager',
        isUrgent: false,
        isRead: true,
        sentAt: new Date('2024-06-13T09:00:00'),
        messageType: 'facility_updates'
      }
    ];

    // Filter notifications based on user role
    const filteredNotifications = mockNotifications.filter(notification => {
      switch (userRole) {
        case 'org_admin':
          return notification.senderRole === 'global_admin';
        case 'hub_manager':
          return ['global_admin', 'org_admin'].includes(notification.senderRole);
        case 'member':
          return ['global_admin', 'org_admin', 'hub_manager'].includes(notification.senderRole);
        default:
          return false;
      }
    });

    setNotifications(filteredNotifications);
  }, [userRole]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const getSenderRoleLabel = (role: string) => {
    switch (role) {
      case 'global_admin':
        return 'Global Admin';
      case 'org_admin':
        return 'Organization Admin';
      case 'hub_manager':
        return 'Hub Manager';
      default:
        return 'System';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              variant="destructive"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Notifications</h4>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-3 cursor-pointer hover:bg-muted/50 rounded-md ${
                      !notification.isRead ? 'bg-muted/30' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h5 className={`text-sm font-medium ${
                        notification.isUrgent ? 'text-orange-600' : ''
                      }`}>
                        {notification.subject}
                        {notification.isUrgent && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Urgent
                          </Badge>
                        )}
                      </h5>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {notification.content}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{getSenderRoleLabel(notification.senderRole)}</span>
                      <span>{format(notification.sentAt, 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator className="my-1" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View All Notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationIcon;