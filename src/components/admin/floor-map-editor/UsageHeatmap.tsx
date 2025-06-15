
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Clock, Users } from 'lucide-react';

interface HeatmapData {
  seatId: string;
  x: number;
  y: number;
  usageCount: number;
  utilizationRate: number;
  lastUsed: string;
  averageBookingDuration: number;
}

interface UsageHeatmapProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const UsageHeatmap: React.FC<UsageHeatmapProps> = ({ canvasRef }) => {
  const [heatmapMode, setHeatmapMode] = useState<'usage' | 'duration' | 'frequency'>('usage');
  const [timeRange, setTimeRange] = useState('7days');
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Mock heatmap data
  const heatmapData: HeatmapData[] = [
    { seatId: 'seat-1', x: 100, y: 150, usageCount: 45, utilizationRate: 85, lastUsed: '2024-06-15 14:30', averageBookingDuration: 4.5 },
    { seatId: 'seat-2', x: 200, y: 150, usageCount: 38, utilizationRate: 72, lastUsed: '2024-06-15 12:00', averageBookingDuration: 3.8 },
    { seatId: 'seat-3', x: 300, y: 150, usageCount: 52, utilizationRate: 92, lastUsed: '2024-06-15 15:45', averageBookingDuration: 5.2 },
    { seatId: 'seat-4', x: 100, y: 250, usageCount: 29, utilizationRate: 55, lastUsed: '2024-06-14 16:20', averageBookingDuration: 2.9 },
    { seatId: 'seat-5', x: 200, y: 250, usageCount: 41, utilizationRate: 78, lastUsed: '2024-06-15 13:15', averageBookingDuration: 4.1 },
    { seatId: 'seat-6', x: 300, y: 250, usageCount: 18, utilizationRate: 34, lastUsed: '2024-06-13 11:30', averageBookingDuration: 1.8 },
  ];

  const getHeatmapValue = (data: HeatmapData) => {
    switch (heatmapMode) {
      case 'usage': return data.utilizationRate;
      case 'duration': return data.averageBookingDuration;
      case 'frequency': return data.usageCount;
      default: return data.utilizationRate;
    }
  };

  const getHeatmapColor = (value: number, mode: string) => {
    let intensity = 0;
    switch (mode) {
      case 'usage':
        intensity = value / 100;
        break;
      case 'duration':
        intensity = Math.min(value / 8, 1);
        break;
      case 'frequency':
        intensity = Math.min(value / 60, 1);
        break;
    }
    
    const red = Math.floor(255 * intensity);
    const green = Math.floor(255 * (1 - intensity));
    return `rgba(${red}, ${green}, 0, 0.6)`;
  };

  const applyHeatmapToCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear any existing heatmap overlays
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!showHeatmap) return;

    // Draw heatmap overlays
    heatmapData.forEach(data => {
      const value = getHeatmapValue(data);
      const color = getHeatmapColor(value, heatmapMode);
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(data.x, data.y, 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add value label
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        heatmapMode === 'usage' ? `${value}%` :
        heatmapMode === 'duration' ? `${value}h` :
        `${value}`,
        data.x, data.y + 4
      );
    });
  };

  React.useEffect(() => {
    applyHeatmapToCanvas();
  }, [showHeatmap, heatmapMode, timeRange]);

  const maxUsage = Math.max(...heatmapData.map(d => d.utilizationRate));
  const avgUsage = heatmapData.reduce((sum, d) => sum + d.utilizationRate, 0) / heatmapData.length;
  const totalBookings = heatmapData.reduce((sum, d) => sum + d.usageCount, 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Usage Heatmap</span>
          </CardTitle>
          <CardDescription>
            Visualize workspace utilization patterns on your floor plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Mode:</label>
              <Select value={heatmapMode} onValueChange={(value: any) => setHeatmapMode(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usage">Utilization Rate</SelectItem>
                  <SelectItem value="duration">Avg Duration</SelectItem>
                  <SelectItem value="frequency">Booking Count</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Period:</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1day">Today</SelectItem>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant={showHeatmap ? "default" : "outline"}
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
            </Button>
          </div>

          {/* Legend */}
          {showHeatmap && (
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Legend:</span>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-xs">Low Usage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-xs">Medium Usage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-xs">High Usage</span>
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{maxUsage}%</div>
                <div className="text-sm text-gray-500">Peak Utilization</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{avgUsage.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Avg Utilization</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{totalBookings}</div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
            </div>
          </div>

          {/* Hot Spots */}
          <div>
            <h4 className="font-medium mb-3">Popular Seats</h4>
            <div className="space-y-2">
              {heatmapData
                .sort((a, b) => b.utilizationRate - a.utilizationRate)
                .slice(0, 3)
                .map((seat, index) => (
                  <div key={seat.seatId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="font-medium">{seat.seatId}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{seat.utilizationRate}% utilized</span>
                      <span>{seat.usageCount} bookings</span>
                      <span>{seat.averageBookingDuration}h avg</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
