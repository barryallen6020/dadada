
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Building2,
  Users,
  QrCode,
  Activity,
  MessageSquare,
} from 'lucide-react';

const HubManagerNavigation = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/hubmanager",
    },
    {
      title: "Workspaces",
      icon: <Building2 className="h-5 w-5" />,
      path: "/hubmanager/workspaces",
    },
    {
      title: "Booking Queue",
      icon: <Calendar className="h-5 w-5" />,
      path: "/hubmanager/bookings",
    },
    {
      title: "Check-In Operations",
      icon: <QrCode className="h-5 w-5" />,
      path: "/hubmanager/check-in",
    },
    {
      title: "Maintenance",
      icon: <Settings className="h-5 w-5" />,
      path: "/hubmanager/maintenance",
    },
    {
      title: "User Management",
      icon: <Users className="h-5 w-5" />,
      path: "/hubmanager/users",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/hubmanager/messages",
    },
    {
      title: "Reports & Analytics",
      icon: <Activity className="h-5 w-5" />,
      path: "/hubmanager/reports",
    },
  ];

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-6 glass-scrollbar">
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                location.pathname === item.path
                  ? "bg-deskhive-orange text-white"
                  : "text-deskhive-darkgray hover:bg-white/20"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HubManagerNavigation;
