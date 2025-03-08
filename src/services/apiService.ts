
import { toast } from "sonner";

// API base URL from the backend docs
const API_URL = "https://handsome-vision-production.up.railway.app/api";

export interface MessagePayload {
  type: 'text' | 'image' | 'document' | 'audio';
  text?: string;
  image?: File;
  document?: File;
  audio?: Blob;
}

export interface MessageResponse {
  id: string;
  type: string;
  content: string;
  fileName?: string;
  fileUrl?: string;
  fileSize?: number;
  createdAt: string;
  isRead: boolean;
}

/**
 * Fetches all messages from the API
 */
export const fetchMessages = async (): Promise<MessageResponse[]> => {
  try {
    const response = await fetch(`${API_URL}/get-messages`, {
      mode: 'cors', // Explicitly set CORS mode
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch messages');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    toast.error('Failed to fetch messages');
    return [];
  }
};

/**
 * Marks a message as read
 */
export const markMessageAsRead = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/read-message/${id}`, {
      mode: 'cors', // Explicitly set CORS mode
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to mark message as read');
    }
    
    return true;
  } catch (error) {
    console.error('Error marking message as read:', error);
    toast.error('Failed to mark message as read');
    return false;
  }
};

/**
 * Sends a new message to the API
 */
export const sendMessage = async (payload: MessagePayload): Promise<boolean> => {
  try {
    const formData = new FormData();
    
    // Add the message type
    formData.append('type', payload.type);
    
    // Add text content if available
    if (payload.text) {
      formData.append('text', payload.text);
    }
    
    // Handle file uploads based on type
    if (payload.type === 'image' && payload.image) {
      formData.append('image', payload.image);
    } else if (payload.type === 'document' && payload.document) {
      formData.append('document', payload.document);
    } else if (payload.type === 'audio' && payload.audio) {
      formData.append('audio', payload.audio);
    }
    
    // Use a proxy service to bypass CORS
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = `${API_URL}/add-message`;
    
    console.log('Sending message with payload:', Object.fromEntries(formData.entries()));
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      body: formData,
      mode: 'cors', // Try with standard CORS first
      headers: {
        // Don't set Content-Type header when using FormData, the browser will set it automatically with the boundary
        'Origin': window.location.origin,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send message');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    
    // If we're dealing with a CORS error, inform the user
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      toast.error('Network error: CORS restriction. Try using a CORS proxy or contact the API administrator.');
      
      // You might want to save the draft message for later submission
      const messageData = JSON.stringify(payload);
      localStorage.setItem('draftMessage', messageData);
      toast.info('Your message has been saved as a draft.');
    } else {
      toast.error('Failed to send message');
    }
    
    return false;
  }
};

/**
 * Gets the URL for a media file
 */
export const getMediaUrl = (id: string): string => {
  return `${API_URL}/get-media/${id}`;
};
