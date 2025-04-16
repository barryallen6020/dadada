
import React from "react";

interface LogoFullProps {
  className?: string;
}

const LogoFull: React.FC<LogoFullProps> = ({ className = "" }) => {
  const baseClassName = "font-bold text-2xl";
  const combinedClassName = `${baseClassName} ${className}`;

  return (
    <div className={`flex items-center gap-2 ${combinedClassName}`}>
      <img src="/logo.svg" alt="DeskHive Logo" className="h-8 w-8" />
      <div className="flex items-center">
        <span className="text-gray-900">Desk</span>
        <span className="text-deskhive-orange">Hive</span>
      </div>
    </div>
  );
};

export default LogoFull;
