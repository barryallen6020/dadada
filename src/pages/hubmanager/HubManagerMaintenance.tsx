import React, { useState } from 'react';
import HubManagerLayout from '@/components/layout/HubManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CalendarDays, 
  Clock, 
  AlertTriangle, 
  Settings, 
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const HubManagerMaintenance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [maintenanceSchedules, setMaintenanceSchedules] = useState([
    {
      id: 1,
      workspace: 'Creative Studio',
      type: 'Cleaning',
      reason: 'Deep cleaning and sanitization',
      startDate: '2024-06-08',
      endDate: '2024-06-08',
      startTime: '18:00',
      endTime: '22:00',
      status: 'scheduled',
      affectedSeats: ['A1', 'A2', 'A3'],
      priority: 'medium'
    },
    {
      id: 2,
      workspace: 'Tech Hub',
      type: 'Equipment Repair',
      reason: 'Network equipment maintenance',
      startDate: '2024-06-09',
      endDate: '2024-06-09',
      startTime: '19:00',
      endTime: '23:00',
      status: 'scheduled',
      affectedSeats: ['All'],
      priority: 'high'
    },
    {
      id: 3,
      workspace: 'Meeting Room Alpha',
      type: 'Furniture',
      reason: 'Chair replacement and table repair',
      startDate: '2024-06-07',
      endDate: '2024-06-07',
      startTime: '17:00',
      endTime: '20:00',
      status: 'completed',
      affectedSeats: ['All'],
      priority: 'low'
    },
    {
      id: 4,
      workspace: 'Quiet Zone',
      type: 'HVAC',
      reason: 'Air conditioning system maintenance',
      startDate: '2024-06-08',
      endDate: '2024-06-08',
      startTime: '06:00',
      endTime: '08:00',
      status: 'in-progress',
      affectedSeats: ['All'],
      priority: 'urgent'
    }
  ]);

  const [newMaintenance, setNewMaintenance] = useState({
    workspace: '',
    type: '',
    reason: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    affectedSeats: [] as string[],
    priority: 'medium'
  });

  const maintenanceTypes = [
    'Cleaning',
    'Equipment Repair',
    'Furniture',
    'HVAC',
    'Electrical',
    'Plumbing',
    'Security',
    'IT/Network',
    'General Maintenance'
  ];

  const workspaces = [
    'Creative Studio',
    'Tech Hub',
    'Meeting Room Alpha',
    'Quiet Zone'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleScheduleMaintenance = () => {
    const newSchedule = {
      id: maintenanceSchedules.length + 1,
      ...newMaintenance,
      status: 'scheduled',
      affectedSeats: newMaintenance.affectedSeats.length ? newMaintenance.affectedSeats : ['All']
    };
    
    setMaintenanceSchedules(prev => [...prev, newSchedule]);
    setNewMaintenance({
      workspace: '',
      type: '',
      reason: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      affectedSeats: [],
      priority: 'medium'
    });
    setIsScheduleModalOpen(false);
  };

  const updateMaintenanceStatus = (id: number, status: string) => {
    setMaintenanceSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, status } : schedule
    ));
  };

  const scheduledCount = maintenanceSchedules.filter(s => s.status === 'scheduled').length;
  const inProgressCount = maintenanceSchedules.filter(s => s.status === 'in-progress').length;
  const completedCount = maintenanceSchedules.filter(s => s.status === 'completed').length;

  return (
    <HubManagerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-deskhive-navy">Maintenance & Availability</h1>
            <p className="text-deskhive-darkgray">Schedule maintenance and manage workspace availability</p>
          </div>
          <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-deskhive-orange hover:bg-deskhive-orange/90">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Schedule Maintenance</DialogTitle>
                <DialogDescription>
                  Create a new maintenance schedule that will temporarily disable affected areas
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workspace">Workspace</Label>
                    <Select value={newMaintenance.workspace} onValueChange={(value) => setNewMaintenance(prev => ({ ...prev, workspace: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select workspace" />
                      </SelectTrigger>
                      <SelectContent>
                        {workspaces.map(workspace => (
                          <SelectItem key={workspace} value={workspace}>{workspace}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Maintenance Type</Label>
                    <Select value={newMaintenance.type} onValueChange={(value) => setNewMaintenance(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {maintenanceTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Describe the maintenance work needed..."
                    value={newMaintenance.reason}
                    onChange={(e) => setNewMaintenance(prev => ({ ...prev, reason: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newMaintenance.startDate}
                      onChange={(e) => setNewMaintenance(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newMaintenance.endDate}
                      onChange={(e) => setNewMaintenance(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newMaintenance.startTime}
                      onChange={(e) => setNewMaintenance(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newMaintenance.endTime}
                      onChange={(e) => setNewMaintenance(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newMaintenance.priority} onValueChange={(value) => setNewMaintenance(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleScheduleMaintenance}>Schedule Maintenance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">{scheduledCount}</p>
                </div>
                <CalendarDays className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p>
                </div>
                <Settings className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-nav border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-deskhive-darkgray">Urgent Tasks</p>
                  <p className="text-2xl font-bold text-red-600">
                    {maintenanceSchedules.filter(s => s.priority === 'urgent' && s.status !== 'completed').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Schedule */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="glass-nav border-white/20">
            <TabsTrigger value="all">All Maintenance</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <CardTitle className="text-deskhive-navy">All Maintenance Activities</CardTitle>
                <CardDescription>Complete overview of maintenance schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceSchedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-deskhive-orange/10">
                          <Settings className="h-6 w-6 text-deskhive-orange" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-deskhive-navy">{schedule.workspace}</h3>
                            <Badge className={`${getStatusColor(schedule.status)} text-xs`}>
                              {schedule.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={`${getPriorityColor(schedule.priority)} text-xs`}>
                              {schedule.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-deskhive-darkgray mb-1">{schedule.type} - {schedule.reason}</p>
                          <div className="flex items-center gap-4 text-xs text-deskhive-darkgray">
                            <span>{schedule.startDate} to {schedule.endDate}</span>
                            <span>{schedule.startTime} - {schedule.endTime}</span>
                            <span>Affects: {schedule.affectedSeats.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {schedule.status === 'scheduled' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-yellow-600 hover:bg-yellow-700"
                              onClick={() => updateMaintenanceStatus(schedule.id, 'in-progress')}
                            >
                              Start
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => updateMaintenanceStatus(schedule.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {schedule.status === 'in-progress' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateMaintenanceStatus(schedule.id, 'completed')}
                          >
                            Complete
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-deskhive-navy text-deskhive-navy">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <CardTitle className="text-deskhive-navy">Scheduled Maintenance</CardTitle>
                <CardDescription>Upcoming maintenance activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceSchedules
                    .filter(s => s.status === 'scheduled')
                    .map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border border-white/20 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                          <CalendarDays className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-deskhive-navy">{schedule.workspace}</h3>
                          <p className="text-sm text-deskhive-darkgray">{schedule.type} - {schedule.reason}</p>
                          <p className="text-xs text-deskhive-darkgray">{schedule.startDate} {schedule.startTime} - {schedule.endTime}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-yellow-600 hover:bg-yellow-700"
                        onClick={() => updateMaintenanceStatus(schedule.id, 'in-progress')}
                      >
                        Start Maintenance
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <CardTitle className="text-deskhive-navy">Active Maintenance</CardTitle>
                <CardDescription>Currently ongoing maintenance work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceSchedules
                    .filter(s => s.status === 'in-progress')
                    .map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-200">
                          <Settings className="h-6 w-6 text-yellow-700 animate-spin" />
                        </div>
                        <div>
                          <h3 className="font-medium text-yellow-800">{schedule.workspace}</h3>
                          <p className="text-sm text-yellow-700">{schedule.type} - {schedule.reason}</p>
                          <p className="text-xs text-yellow-600">Started at {schedule.startTime}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateMaintenanceStatus(schedule.id, 'completed')}
                      >
                        Mark Complete
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card className="glass-nav border-white/20">
              <CardHeader>
                <CardTitle className="text-deskhive-navy">Completed Maintenance</CardTitle>
                <CardDescription>Successfully completed maintenance work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceSchedules
                    .filter(s => s.status === 'completed')
                    .map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border border-white/20 rounded-lg opacity-75">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-deskhive-navy">{schedule.workspace}</h3>
                          <p className="text-sm text-deskhive-darkgray">{schedule.type} - {schedule.reason}</p>
                          <p className="text-xs text-deskhive-darkgray">Completed on {schedule.endDate}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">COMPLETED</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HubManagerLayout>
  );
};

export default HubManagerMaintenance;
