
import React from "react";
import { Loader, Sparkles } from "lucide-react";

const LoadingDisplay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="glass-card p-10 rounded-3xl shadow-2xl flex flex-col items-center justify-center space-y-6 backdrop-blur-xl bg-white/20 border border-white/30 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-deskhive-skyblue/20 via-deskhive-royal/10 to-deskhive-orange/20 animate-pulse"></div>
        
        {/* Animated sparkles */}
        <div className="absolute top-5 right-5 animate-bounce">
          <Sparkles className="text-deskhive-orange/70 h-6 w-6" />
        </div>
        <div className="absolute bottom-5 left-5 animate-bounce delay-300">
          <Sparkles className="text-deskhive-royal/70 h-5 w-5" />
        </div>
        
        {/* Loading spinner with gradient ring */}
        <div className="relative w-28 h-28 flex items-center justify-center z-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-deskhive-orange via-deskhive-royal to-deskhive-orange animate-spin"></div>
          <div className="absolute inset-1 rounded-full bg-white/90 backdrop-blur"></div>
          <Loader size={60} className="text-deskhive-navy animate-spin z-10" strokeWidth={1.5} />
        </div>
        
        {/* Text content */}
        <div className="z-10 text-center">
          <h3 className="text-2xl font-medium text-deskhive-navy mb-2">Loading</h3>
          <p className="text-deskhive-darkgray/80 max-w-xs">
            Preparing your workspace experience...
          </p>
        </div>
        
        {/* Animated progress bar */}
        <div className="w-48 h-1.5 bg-white/30 rounded-full overflow-hidden z-10">
          <div className="h-full bg-gradient-to-r from-deskhive-navy to-deskhive-royal rounded-full animate-[loadingProgress_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDisplay;
