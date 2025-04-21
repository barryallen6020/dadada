import React, { useState, useEffect } from 'react';
import { useOrganization } from '@/contexts/OrganizationContext';
import { Button } from '@/components/ui/button';
import { Building2, Check, ChevronsUpDown, Globe, Lock } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import organizationService from '@/services/organizationService';

const OrganizationSwitcher: React.FC = () => {
  const { currentOrganization, setCurrentOrganization, organizations, setOrganizations } = useOrganization();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await organizationService.getAllOrganizations();
        setOrganizations(response.data);
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="w-full">
      <p className="text-xs uppercase text-gray-500 font-medium mb-2">Current Organization</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center justify-between w-full gap-2 px-3 py-2 text-left">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-deskhive-navy" />
              <span className="text-sm font-medium">{currentOrganization.name}</span>
              {currentOrganization.type && (
                <Badge variant={currentOrganization.type === 'private' ? 'outline' : 'default'} className="h-5 px-1.5 text-xs">
                  {currentOrganization.type === 'public' ? (
                    <Globe className="h-3 w-3 mr-1" />
                  ) : (
                    <Lock className="h-3 w-3 mr-1" />
                  )}
                  {currentOrganization.type}
                </Badge>
              )}
            </div>
            <ChevronsUpDown className="w-4 h-4 text-deskhive-darkgray/70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 z-50" 
          align="start" 
          style={{ width: '250px' }}
          sideOffset={4}
        >
          <Command>
            <div className="flex items-center border-b px-3">
              <CommandInput placeholder="Search organization..." className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" />
            </div>
            <CommandList>
              <CommandEmpty>No organization found.</CommandEmpty>
              <CommandGroup>
                {organizations.map((org) => (
                  <CommandItem
                    key={org.id}
                    value={org.name}
                    onSelect={() => {
                      setCurrentOrganization(org);
                      setOpen(false);
                    }}
                    className="flex items-center cursor-pointer px-4 py-2"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{org.name}</span>
                    {org.type && (
                      <Badge variant={org.type === 'private' ? 'outline' : 'default'} className="ml-2 h-5 px-1.5 text-xs">
                        {org.type === 'public' ? (
                          <Globe className="h-3 w-3 mr-1" />
                        ) : (
                          <Lock className="h-3 w-3 mr-1" />
                        )}
                        {org.type}
                      </Badge>
                    )}
                    {org.id === currentOrganization.id && (
                      <Check className="ml-auto h-4 w-4 text-green-500" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default OrganizationSwitcher;
