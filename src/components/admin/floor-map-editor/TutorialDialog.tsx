
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TutorialStep {
  title: string;
  content: string;
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
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{steps[currentStep].title}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-60 rounded-md border p-4">
          <div className="text-sm text-muted-foreground">
            {steps[currentStep].content}
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
            variant="outline"
            size="sm"
            onClick={goToNextStep}
            disabled={currentStep === steps.length - 1}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
