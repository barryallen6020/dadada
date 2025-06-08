
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Building2, Calendar, Mail, Globe, MessageSquare } from 'lucide-react';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: string;
  date: string;
  subscriptions: string[];
  status: 'pending' | 'contacted' | 'converted' | 'declined';
  source: string;
  notes?: string;
}

interface WaitlistEntryDetailsModalProps {
  entry: WaitlistEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (entry: WaitlistEntry) => void;
  onMarkConverted: (entry: WaitlistEntry) => void;
  onDelete: (entry: WaitlistEntry) => void;
}

const WaitlistEntryDetailsModal: React.FC<WaitlistEntryDetailsModalProps> = ({
  entry,
  isOpen,
  onClose,
  onSendEmail,
  onMarkConverted,
  onDelete
}) => {
  if (!entry) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Waitlist Entry Details
          </DialogTitle>
          <DialogDescription>Complete information for {entry.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-sm text-gray-900">{entry.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <p className="text-sm text-gray-900">{entry.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Company</label>
              <p className="text-sm text-gray-900">{entry.company || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <Badge variant="outline" className="text-xs">{entry.role}</Badge>
            </div>
          </div>

          <Separator />

          {/* Status and Source */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Badge className={`text-xs ${getStatusColor(entry.status)}`}>
                {entry.status}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Source</label>
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span className="text-sm">{entry.source}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Date Joined</label>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className="text-sm">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Subscriptions */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Subscriptions</label>
            <div className="flex flex-wrap gap-2">
              {entry.subscriptions.map((sub, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {sub}
                </Badge>
              ))}
            </div>
          </div>

          {/* Notes */}
          {entry.notes && (
            <>
              <Separator />
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  Notes
                </label>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{entry.notes}</p>
              </div>
            </>
          )}

          {/* Actions */}
          <Separator />
          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => onSendEmail(entry)}>
              <Mail className="h-3 w-3 mr-1" />
              Send Email
            </Button>
            {entry.status !== 'converted' && (
              <Button variant="outline" size="sm" onClick={() => onMarkConverted(entry)}>
                Convert
              </Button>
            )}
            <Button variant="destructive" size="sm" onClick={() => onDelete(entry)}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistEntryDetailsModal;
