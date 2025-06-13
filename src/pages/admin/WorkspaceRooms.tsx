
import React, { useState } from 'react';
import WorkspaceAdminLayout from '@/components/workspace-admin/WorkspaceAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Settings, MapPin, Users } from 'lucide-react';

const WorkspaceRooms = () => {
  const [rooms] = useState([
    { id: '1', name: 'Conference Room A', capacity: 8, type: 'meeting', status: 'active' },
    { id: '2', name: 'Open Workspace', capacity: 50, type: 'workspace', status: 'active' },
    { id: '3', name: 'Phone Booth 1', capacity: 1, type: 'phone', status: 'maintenance' },
    { id: '4', name: 'Training Room', capacity: 20, type: 'training', status: 'active' }
  ]);

  return (
    <WorkspaceAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Rooms & Seats</h1>
            <p className="text-muted-foreground">Manage workspace rooms and seating arrangements</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Room
          </Button>
        </div>

        <Tabs defaultValue="rooms" className="space-y-4">
          <TabsList>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="seats">Seat Management</TabsTrigger>
            <TabsTrigger value="layout">Layout Editor</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <Card key={room.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {room.name}
                      <Badge variant={room.status === 'active' ? 'default' : 'destructive'}>
                        {room.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {room.capacity} seats
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {room.type}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Seat Configuration</CardTitle>
                <CardDescription>Manage individual seats and their properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="seatType">Seat Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select seat type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desk">Desk Seat</SelectItem>
                        <SelectItem value="meeting">Meeting Chair</SelectItem>
                        <SelectItem value="lounge">Lounge Seat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="floor">Floor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select floor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Floor 1</SelectItem>
                        <SelectItem value="2">Floor 2</SelectItem>
                        <SelectItem value="3">Floor 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Input placeholder="e.g., North Wing" />
                  </div>
                </div>
                <Button>Add Seats</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Floor Plan Editor</CardTitle>
                <CardDescription>Design and edit workspace layouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Interactive floor plan editor</p>
                    <Button className="mt-4">Launch Editor</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceAdminLayout>
  );
};

export default WorkspaceRooms;
