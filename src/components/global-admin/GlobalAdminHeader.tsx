
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, LogOut } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
}

interface GlobalAdminHeaderProps {
  activeTab: string;
  onMobileSidebarOpen: () => void;
  onLogout: () => void;
  menuItems: MenuItem[];
}

const GlobalAdminHeader: React.FC<GlobalAdminHeaderProps> = ({
  activeTab,
  onMobileSidebarOpen,
  onLogout,
  menuItems
}) => {
  return (
    <header className="bg-white shadow-sm border-b px-3 md:px-6 py-3 md:py-4 sticky top-0 z-30">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMobileSidebarOpen}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-base md:text-lg lg:text-2xl font-semibold text-gray-900 truncate">
            {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
          </h2>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-7 w-7 md:h-8 md:w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  GA
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Global Administrator</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default GlobalAdminHeader;
