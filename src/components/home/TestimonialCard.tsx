
import React from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => {
  return (
    <div className="glass-card p-4 md:p-6 h-full animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="text-2xl md:text-3xl text-deskhive-orange/70 mb-3 md:mb-4">"</div>
        <p className="flex-1 text-sm md:text-base text-deskhive-darkgray/90 italic mb-4 md:mb-6">{quote}</p>
        <div>
          <div className="flex items-center">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-deskhive-navy to-deskhive-royal rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
              {name.charAt(0)}
            </div>
            <div className="ml-3">
              <h4 className="font-semibold text-deskhive-navy text-sm md:text-base">{name}</h4>
              <p className="text-xs md:text-sm text-deskhive-darkgray/70">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
