
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface HubManagerHeaderProps {
  isNavOpen: boolean;
  onToggleNav: () => void;
}

const HubManagerHeader: React.FC<HubManagerHeaderProps> = ({ 
  isNavOpen, 
  onToggleNav 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const userStr = localStorage.getItem("hubManagerUser");
  const defaultUser = {name: "Hub Manager", email: "manager@example.com", role: "hubmanager"};
  const user = userStr ? JSON.parse(userStr) : defaultUser;

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "HM";

  const handleLogout = () => {
    localStorage.removeItem("hubManagerToken");
    localStorage.removeItem("hubManagerUser");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of Hub Manager.",
    });
    
    navigate("/hubmanager/login");
  };

  return (
    <header className="glass-nav py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleNav}
          className="mr-2"
        >
          {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <h1 className="text-lg font-medium text-deskhive-navy">
          Hub Manager
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-deskhive-orange text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-dropdown">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/hubmanager/profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/hubmanager/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default HubManagerHeader;
