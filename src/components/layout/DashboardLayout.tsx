import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { useOrganization } from "@/contexts/OrganizationContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarExtender from "./SidebarExtender";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentOrganization } = useOrganization();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden absolute left-4 top-4 text-gray-600 hover:text-gray-800">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-64 pt-6 pl-0 pr-0 border-r">
          <SheetHeader className="pl-6 pb-4">
            <SheetTitle className="text-lg font-semibold">
              {currentOrganization.name}
            </SheetTitle>
            <SheetDescription>
              Manage your workspace and account settings
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] pl-6">
            <nav className="flex flex-col space-y-1">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-deskhive-skyblue/20 text-deskhive-navy font-medium"
                      : "hover:bg-gray-100 text-deskhive-darkgray/80 hover:text-deskhive-navy"
                  }`
                }
              >
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/bookings"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-deskhive-skyblue/20 text-deskhive-navy font-medium"
                      : "hover:bg-gray-100 text-deskhive-darkgray/80 hover:text-deskhive-navy"
                  }`
                }
              >
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Bookings</span>
              </NavLink>
              <SidebarExtender />
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-deskhive-skyblue/20 text-deskhive-navy font-medium"
                      : "hover:bg-gray-100 text-deskhive-darkgray/80 hover:text-deskhive-navy"
                  }`
                }
              >
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Profile</span>
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg transition duration-200 ${
                    isActive
                      ? "bg-deskhive-skyblue/20 text-deskhive-navy font-medium"
                      : "hover:bg-gray-100 text-deskhive-darkgray/80 hover:text-deskhive-navy"
                  }`
                }
              >
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Settings</span>
              </NavLink>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <div className="md:pl-64">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
