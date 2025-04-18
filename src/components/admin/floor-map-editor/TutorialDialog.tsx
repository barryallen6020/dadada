
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
}

interface TutorialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: TutorialStep[];
}

export const TutorialDialog: React.FC<TutorialDialogProps> = ({
  open,
  onOpenChange,
  steps
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <Progress value={progressPercentage} className="h-1 w-full mb-4" />
        
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-6">
            {steps[currentStep].image && (
              <div className="relative w-full h-64 bg-gray-50 rounded-lg overflow-hidden shadow-inner">
                <img 
                  src={steps[currentStep].image} 
                  alt={steps[currentStep].title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="text-sm text-muted-foreground leading-relaxed">
              {steps[currentStep].content}
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-between mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground self-center">
            {currentStep + 1} of {steps.length}
          </span>
          <Button
            variant={currentStep === steps.length - 1 ? "default" : "outline"}
            size="sm"
            onClick={goToNextStep}
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
            {currentStep !== steps.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
