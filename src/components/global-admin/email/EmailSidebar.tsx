
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload, FileText, Copy } from 'lucide-react';

interface EmailTemplate {
  id: string;
  variables: string[];
}

interface EmailSidebarProps {
  emailStats: {
    totalSent: number;
    openRate: number;
    clickRate: number;
  };
  selectedTemplate?: EmailTemplate | null;
}

const EmailSidebar: React.FC<EmailSidebarProps> = ({ emailStats, selectedTemplate }) => {
  return (
    <div className="space-y-3 md:space-y-4">
      {/* Email Stats */}
      <Card>
        <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
          <CardTitle className="text-sm md:text-lg">Email Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4 space-y-3">
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold">{emailStats.totalSent.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Emails Sent</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-sm md:text-base font-semibold text-blue-600">{emailStats.openRate}%</div>
              <div className="text-xs text-muted-foreground">Open Rate</div>
            </div>
            <div>
              <div className="text-sm md:text-base font-semibold text-green-600">{emailStats.clickRate}%</div>
              <div className="text-xs text-muted-foreground">Click Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Variables Helper */}
      {selectedTemplate && (
        <Card>
          <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
            <CardTitle className="text-sm md:text-lg">Available Variables</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="space-y-2">
              {selectedTemplate.variables.map((variable, index) => (
                <div key={index} className="flex items-center justify-between">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">{variable}</code>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader className="p-3 md:p-4 pb-2 md:pb-3">
          <CardTitle className="text-sm md:text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-4 space-y-2">
          <Button variant="outline" size="sm" className="w-full text-xs justify-start">
            <Download className="h-3 w-3 mr-2" />
            Import Recipients
          </Button>
          <Button variant="outline" size="sm" className="w-full text-xs justify-start">
            <Upload className="h-3 w-3 mr-2" />
            Upload Images
          </Button>
          <Button variant="outline" size="sm" className="w-full text-xs justify-start">
            <FileText className="h-3 w-3 mr-2" />
            View Reports
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSidebar;
