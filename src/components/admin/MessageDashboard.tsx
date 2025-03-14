
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, LayoutGrid, List as ListIcon, 
  SlidersHorizontal, MessageSquare, Image, 
  FileText, Mic, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import MessageCard, { Message, MessageType } from './MessageCard';
import { cn } from '@/lib/utils';
import { fetchMessages, MessageResponse } from '@/services/apiService';
import { toast } from 'sonner';

// Sort options
type SortOption = 'newest' | 'oldest' | 'unread';

// Helper function to map API response to Message type
const mapResponseToMessage = (response: MessageResponse): Message => {
  // Ensure the type from API matches one of our MessageType values
  // Default to 'text' if it's an unrecognized type
  const validType = (type: string): MessageType => {
    if (type === 'text' || type === 'image' || type === 'document' || type === 'voice' || type === 'audio') {
      return type as MessageType;
    }
    return 'text'; // Default fallback
  };

  return {
    id: response.id,
    type: validType(response.type),
    content: response.content,
    createdAt: new Date(response.createdAt),
    isRead: response.isRead,
    fileUrl: response.fileUrl,
    fileName: response.fileName,
    fileSize: response.fileSize
  };
};

const MessageDashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<MessageType | 'all'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // Load real data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMessages();
        // Map API response to Message type
        const mappedData = data.map(mapResponseToMessage);
        setMessages(mappedData);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...messages];
    
    // Apply type filter
    if (selectedTypeFilter !== 'all') {
      filtered = filtered.filter(msg => {
        // Handle both 'voice' and 'audio' types as the same for filtering
        if (selectedTypeFilter === 'voice') {
          return msg.type === 'voice' || msg.type === 'audio';
        }
        return msg.type === selectedTypeFilter;
      });
    }
    
    // Apply unread filter
    if (showUnreadOnly) {
      filtered = filtered.filter(msg => !msg.isRead);
    }
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(msg => 
        msg.content?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (msg.fileName && msg.fileName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'unread':
        filtered.sort((a, b) => {
          if (a.isRead === b.isRead) {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return a.isRead ? 1 : -1;
        });
        break;
    }
    
    setFilteredMessages(filtered);
  }, [messages, selectedTypeFilter, showUnreadOnly, searchQuery, sortOption]);
  
  // Get paginated results
  const paginatedMessages = filteredMessages.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  
  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);
  
  const handleMarkAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, isRead: true } : msg
      )
    );
  };
  
  const handleDelete = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };
  
  const handleTypeSelect = (type: MessageType | 'all') => {
    setSelectedTypeFilter(type);
    setPage(1);
  };

  const getTypeIcon = (type: MessageType | 'all') => {
    switch (type) {
      case 'text':
        return <MessageSquare className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'voice':
        return <Mic className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeCount = (type: MessageType | 'all') => {
    if (type === 'all') return messages.length;
    
    if (type === 'voice') {
      return messages.filter(msg => msg.type === 'voice' || msg.type === 'audio').length;
    }
    
    return messages.filter(msg => msg.type === type).length;
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !msg.isRead).length;
  };

  // Refresh data
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMessages();
      // Map API response to Message type
      const mappedData = data.map(mapResponseToMessage);
      setMessages(mappedData);
      toast.success('Messages refreshed');
    } catch (error) {
      console.error('Error refreshing messages:', error);
      toast.error('Failed to refresh messages');
    } finally {
      setIsLoading(false);
    }
  };

  // Skeletons for loading state
  const MessageSkeleton = () => (
    <div className="glass animate-pulse rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-muted rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-2/3" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gradient">Message Dashboard</h1>
        
        <div className="flex items-center gap-2 self-end">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="h-9"
            disabled={isLoading}
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button
            variant={viewMode === 'list' ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode('list')}
            className="h-9 w-9"
          >
            <ListIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="h-9 w-9"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Messages</h4>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Message Type</h5>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedTypeFilter === 'all' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTypeSelect('all')}
                      className="h-8"
                    >
                      All ({getTypeCount('all')})
                    </Button>
                    <Button
                      variant={selectedTypeFilter === 'text' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTypeSelect('text')}
                      className="h-8"
                    >
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Text ({getTypeCount('text')})
                    </Button>
                    <Button
                      variant={selectedTypeFilter === 'image' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTypeSelect('image')}
                      className="h-8"
                    >
                      <Image className="mr-1 h-3 w-3" />
                      Image ({getTypeCount('image')})
                    </Button>
                    <Button
                      variant={selectedTypeFilter === 'voice' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTypeSelect('voice')}
                      className="h-8"
                    >
                      <Mic className="mr-1 h-3 w-3" />
                      Voice ({getTypeCount('voice')})
                    </Button>
                    <Button
                      variant={selectedTypeFilter === 'document' ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTypeSelect('document')}
                      className="h-8"
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      Document ({getTypeCount('document')})
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="unread" 
                    checked={showUnreadOnly}
                    onCheckedChange={() => setShowUnreadOnly(!showUnreadOnly)}
                  />
                  <label
                    htmlFor="unread"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show unread only ({getUnreadCount()})
                  </label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="unread">Unread first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className={cn(
          "grid gap-4",
          viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {[...Array(6)].map((_, i) => (
            <MessageSkeleton key={i} />
          ))}
        </div>
      ) : paginatedMessages.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <h3 className="text-lg font-medium">No messages found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${selectedTypeFilter}-${showUnreadOnly}-${page}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "grid gap-4",
                viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}
            >
              {paginatedMessages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onMarkRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageDashboard;
