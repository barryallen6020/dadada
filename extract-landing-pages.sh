#!/bin/bash

# Script to extract landing page code into a new repository
# Usage: ./extract-landing-pages.sh deskhive-landing-page

set -e # Exit on any error

# Default destination directory
DEST_DIR="../deskhive-landing"

# Use provided destination if specified
if [ "$1" ]; then
    DEST_DIR="$1"
fi

# Source directory (current project)
SRC_DIR="."

echo "Extracting landing page code to: $DEST_DIR"

# Create the destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Create directory structure
echo "Creating directory structure..."
mkdir -p "$DEST_DIR/src/pages"
mkdir -p "$DEST_DIR/src/pages/legal"
mkdir -p "$DEST_DIR/src/components/home"
mkdir -p "$DEST_DIR/src/components/layout"
mkdir -p "$DEST_DIR/src/components/common"
mkdir -p "$DEST_DIR/src/components/ui"
mkdir -p "$DEST_DIR/src/lib"
mkdir -p "$DEST_DIR/src/hooks"
mkdir -p "$DEST_DIR/src/config"
mkdir -p "$DEST_DIR/src/assets"
mkdir -p "$DEST_DIR/public"

# Copy landing pages
echo "Copying landing pages..."
cp "$SRC_DIR/src/pages/PreLaunch.tsx" "$DEST_DIR/src/pages/"
cp "$SRC_DIR/src/pages/Home.tsx" "$DEST_DIR/src/pages/"
cp "$SRC_DIR/src/pages/Features.tsx" "$DEST_DIR/src/pages/"
cp "$SRC_DIR/src/pages/Pricing.tsx" "$DEST_DIR/src/pages/"
cp "$SRC_DIR/src/pages/Contact.tsx" "$DEST_DIR/src/pages/"
cp "$SRC_DIR/src/pages/FAQ.tsx" "$DEST_DIR/src/pages/"
cp "$SRC_DIR/src/pages/Index.tsx" "$DEST_DIR/src/pages/"

# Copy legal pages
echo "Copying legal pages..."
cp "$SRC_DIR/src/pages/legal/"*.tsx "$DEST_DIR/src/pages/legal/"

# Copy home components
echo "Copying home components..."
cp "$SRC_DIR/src/components/home/"*.tsx "$DEST_DIR/src/components/home/"

# Copy layout components
echo "Copying layout components..."
cp "$SRC_DIR/src/components/layout/Footer.tsx" "$DEST_DIR/src/components/layout/"
cp "$SRC_DIR/src/components/layout/Navbar.tsx" "$DEST_DIR/src/components/layout/"

# Copy common components
echo "Copying common components..."
cp "$SRC_DIR/src/components/common/LogoFull.tsx" "$DEST_DIR/src/components/common/"
cp "$SRC_DIR/src/components/common/ScrollToTop.tsx" "$DEST_DIR/src/components/common/"

# Copy UI components (all of them, as they might be interdependent)
echo "Copying UI components..."
cp -r "$SRC_DIR/src/components/ui" "$DEST_DIR/src/components/"

# Copy utility files
echo "Copying utility files..."
cp "$SRC_DIR/src/lib/utils.ts" "$DEST_DIR/src/lib/"

# Copy API config
if [ -f "$SRC_DIR/src/config/api.ts" ]; then
    cp "$SRC_DIR/src/config/api.ts" "$DEST_DIR/src/config/"
fi

# Copy API lib file if it exists
if [ -f "$SRC_DIR/src/lib/api.ts" ]; then
    cp "$SRC_DIR/src/lib/api.ts" "$DEST_DIR/src/lib/"
fi

# Copy main.tsx and vite-env.d.ts
echo "Copying main entry files..."
cp "$SRC_DIR/src/main.tsx" "$DEST_DIR/src/"
cp "$SRC_DIR/src/vite-env.d.ts" "$DEST_DIR/src/"

# Copy configuration files
echo "Copying configuration files..."
cp "$SRC_DIR/tailwind.config.ts" "$DEST_DIR/"
cp "$SRC_DIR/postcss.config.js" "$DEST_DIR/"
cp "$SRC_DIR/tsconfig.json" "$DEST_DIR/"
cp "$SRC_DIR/tsconfig.app.json" "$DEST_DIR/"
cp "$SRC_DIR/tsconfig.node.json" "$DEST_DIR/"
cp "$SRC_DIR/vite.config.ts" "$DEST_DIR/"
cp "$SRC_DIR/components.json" "$DEST_DIR/"
cp "$SRC_DIR/index.html" "$DEST_DIR/"
cp "$SRC_DIR/.gitignore" "$DEST_DIR/" 2>/dev/null || echo "No .gitignore found, skipping"

# Copy public directory content
echo "Copying public assets..."
cp -r "$SRC_DIR/public/"* "$DEST_DIR/public/" 2>/dev/null || echo "No public assets found, skipping"

# Create a simplified package.json with only the required dependencies
echo "Creating simplified package.json..."
cat > "$DEST_DIR/package.json" << EOL
{
  "name": "deskhive-landing",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "axios": "^1.8.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "framer-motion": "^12.10.1",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-router-dom": "^6.30.0",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.5.3",
    "vite": "^5.4.1"
  }
}
EOL

# Create a simplified App.tsx with just the landing page routes
echo "Creating simplified App.tsx..."
cat > "$DEST_DIR/src/App.tsx" << EOL
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

// Pages
import IndexPage from "./pages/Index";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PreLaunch from "./pages/PreLaunch";

// Legal pages
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import RefundPolicy from "./pages/legal/RefundPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Pre-launch page - setting as root route during pre-launch phase */}
        <Route path="/" element={<PreLaunch />} />
        
        {/* Original index page now accessible via /home */}
        <Route path="/home" element={<IndexPage />} />
        
        {/* Public routes */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
EOL

# Create a README.md file
echo "Creating README.md..."
cat > "$DEST_DIR/README.md" << EOL
# DeskHive Landing Pages

This repository contains the landing pages for DeskHive - Nigeria's premier workspace management solution designed for modern professionals and businesses.

## Pages Included

- Pre-launch page
- Home page
- Features page
- Pricing page
- Contact page
- FAQ page
- Legal pages (Terms of Service, Privacy Policy, etc.)

## Getting Started

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone [repository-url]
   cd deskhive-landing
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- Framer Motion for animations
EOL

echo "Making script executable..."
chmod +x "$DEST_DIR/extract-landing-pages.sh"

echo "Done! Landing page code has been extracted to: $DEST_DIR"
echo "To run the extracted code, navigate to the directory and run:"
echo "  cd $DEST_DIR"
echo "  npm install"
echo "  npm run dev"

