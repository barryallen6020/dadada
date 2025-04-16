
import React, { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-card p-6 transition-all duration-300 hover:shadow-lg animate-fade-in">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-deskhive-navy mb-2">{title}</h3>
      <p className="text-deskhive-darkgray/80">{description}</p>
    </div>
  );
};

export default FeatureCard;
