
import React from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import EchoLogo from './EchoLogo';

const Header: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  return (
    <header className="w-full py-4 px-4 sm:px-6 border-b border-white/5 glass">
      <div className="container mx-auto flex justify-between items-center">
        <EchoLogo />
        
        <div className="flex items-center gap-4">
          {isAdmin && (
            <span className="text-sm px-3 py-1 rounded-full bg-echo-purple/20 text-echo-purple border border-echo-purple/30">
              Admin Mode
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
