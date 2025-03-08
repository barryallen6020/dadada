
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image as ImageIcon, Mic, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { VoiceRecorder } from '@/components/ui/voice-recorder';
import FileUploadArea from '@/components/file-upload/FileUploadArea';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { sendMessage } from '@/services/apiService';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MessageFormSchema = z.object({
  text: z.string().max(1000, 'Message cannot exceed 1000 characters').optional(),
});

type MessageFormValues = z.infer<typeof MessageFormSchema> & {
  file?: File;
  audio?: Blob;
};

type MessageType = 'text' | 'image' | 'voice' | 'document';

const MessageForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MessageType>('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [formReset, setFormReset] = useState(false);
  const [corsError, setCorsError] = useState(false);
  const { toast: hookToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<MessageFormValues>({
    resolver: zodResolver(MessageFormSchema),
    defaultValues: {
      text: '',
    },
  });

  const textValue = watch('text');

  useEffect(() => {
    if (formReset) {
      reset({ text: '' });
      setSelectedFile(null);
      setAudioBlob(null);
      setFormReset(false);
    }
  }, [formReset, reset]);

  const onFileSelect = (file: File) => {
    // Validate file size (1MB limit for documents)
    const fileSizeInMB = file.size / (1024 * 1024);
    const isDocument = !file.type.startsWith('image/');
    
    if (isDocument && fileSizeInMB > 1) {
      toast.error(`Document size exceeds 1MB limit. Your file is ${fileSizeInMB.toFixed(2)}MB`);
      return;
    }
    
    if (!isDocument && fileSizeInMB > 5) {
      toast.error(`Image size exceeds 5MB limit. Your file is ${fileSizeInMB.toFixed(2)}MB`);
      return;
    }
    
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      setActiveTab('image');
    } else {
      setActiveTab('document');
    }
  };

  const onAudioRecorded = (blob: Blob) => {
    setAudioBlob(blob);
  };

  const onSubmit: SubmitHandler<MessageFormValues> = async (data) => {
    setIsSubmitting(true);
    setCorsError(false);
    
    try {
      let success = false;
      
      if (activeTab === 'text' && data.text) {
        success = await sendMessage({
          type: 'text',
          text: data.text
        });
      } else if (activeTab === 'image' && selectedFile) {
        success = await sendMessage({
          type: 'image',
          image: selectedFile,
          text: data.text
        });
      } else if (activeTab === 'voice' && audioBlob) {
        success = await sendMessage({
          type: 'audio',
          audio: audioBlob
        });
      } else if (activeTab === 'document' && selectedFile) {
        success = await sendMessage({
          type: 'document',
          document: selectedFile,
          text: data.text
        });
      } else {
        toast.error("Please provide content before submitting");
        setIsSubmitting(false);
        return;
      }
      
      if (success) {
        toast.success("Message sent successfully");
        setFormReset(true);
        setActiveTab('text');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setCorsError(true);
      } else {
        toast.error("Failed to send message");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
  };
  
  const charCount = textValue?.length || 0;
  
  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)}
      className="w-full glass-card p-6 space-y-6"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-gradient">Send Anonymous Message</h2>
        <p className="text-sm text-muted-foreground">
          Share your thoughts anonymously. No sign-up required. Your identity remains private.
        </p>
      </div>
      
      {corsError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            We're having trouble connecting to our servers due to CORS restrictions. Please try again later or contact support.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as MessageType)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="text" className="flex items-center justify-center gap-2">
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Text</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center justify-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Image</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center justify-center gap-2">
            <Mic className="h-4 w-4" />
            <span className="hidden sm:inline">Voice</span>
          </TabsTrigger>
          <TabsTrigger value="document" className="flex items-center justify-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Document</span>
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="text" className="mt-0">
              <div className="space-y-4">
                <div className="input-gradient-border">
                  <Textarea
                    placeholder="Type your anonymous message here..."
                    className={cn(
                      "min-h-32 resize-none bg-transparent no-focus-ring",
                      errors.text && "border-destructive"
                    )}
                    {...register("text")}
                  />
                </div>
                <div className="flex justify-end">
                  <span className={cn(
                    "text-xs",
                    charCount > 900 ? "text-amber-400" : "text-muted-foreground",
                    charCount > 1000 && "text-destructive"
                  )}>
                    {charCount}/1000
                  </span>
                </div>
                {errors.text && (
                  <p className="text-destructive text-sm">{errors.text.message}</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="mt-0">
              <div className="space-y-2">
                <FileUploadArea
                  onFileSelect={onFileSelect}
                  acceptedFileTypes="image"
                  maxSizeMB={5}
                  selectedFile={selectedFile}
                  onClearFile={() => setSelectedFile(null)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="voice" className="mt-0">
              <div className="space-y-2">
                <VoiceRecorder onRecordingComplete={onAudioRecorded} />
              </div>
            </TabsContent>
            
            <TabsContent value="document" className="mt-0">
              <div className="space-y-2">
                <FileUploadArea
                  onFileSelect={onFileSelect}
                  acceptedFileTypes="document"
                  maxSizeMB={1} // Updated from 10MB to 1MB per backend requirement
                  selectedFile={selectedFile}
                  onClearFile={() => setSelectedFile(null)}
                />
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      
      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto relative overflow-hidden group"
        >
          <span className={cn(
            "inline-flex items-center gap-2 transition-transform duration-200",
            isSubmitting && "translate-y-10"
          )}>
            <Send className="h-4 w-4" />
            Send Anonymously
          </span>
          {isSubmitting && (
            <span className="absolute inset-0 flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
            </span>
          )}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-200" />
        </Button>
      </div>
    </motion.form>
  );
};

export default MessageForm;
