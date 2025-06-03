# DeskHive Landing Pages Repository

## Extraction Summary

The landing pages have been successfully extracted from the main DeskHive frontend codebase into a standalone repository at:

```
/home/psybah/deskhive-landing
```

### What's Been Extracted:

1. **Pages**
   - Pre-launch page
   - Home page
   - Features page
   - Pricing page
   - Contact page
   - FAQ page
   - Legal pages (Terms of Service, Privacy Policy, etc.)
   - Index page

2. **Components**
   - All home components
   - Layout components (Navbar, Footer)
   - Common components (LogoFull, ScrollToTop)
   - All UI components (shadcn/ui)

3. **Configuration**
   - Tailwind CSS configuration
   - TypeScript configuration
   - Vite configuration
   - Component configuration

4. **Assets**
   - All public assets
   - Static files

## Getting Started

### Setting Up the Development Environment

1. Navigate to the extracted repository:

```bash
cd ../deskhive-landing
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit: http://localhost:5173 (or the port shown in your terminal)

### Testing the Pages

Each page can be accessed via its respective route:

- Pre-launch page: `/`
- Home page: `/home`
- Features page: `/features`
- Pricing page: `/pricing`
- Contact page: `/contact`
- FAQ page: `/faq`
- Terms of Service: `/terms-of-service`
- Privacy Policy: `/privacy-policy`
- Refund Policy: `/refund-policy`
- Cookie Policy: `/cookie-policy`

## Deployment Instructions

### Building for Production

1. Create a production build:

```bash
npm run build
```

This will generate a `dist` folder containing optimized production assets.

### Deployment Options

#### Option 1: Manual Deployment

Upload the contents of the `dist` folder to your web server or hosting service.

#### Option 2: Vercel Deployment

1. Install Vercel CLI (if not already installed):

```bash
npm install -g vercel
```

2. Deploy to Vercel:

```bash
vercel
```

Follow the prompts to complete the deployment.

#### Option 3: Netlify Deployment

1. Install Netlify CLI (if not already installed):

```bash
npm install -g netlify-cli
```

2. Deploy to Netlify:

```bash
netlify deploy
```

For production, use:

```bash
netlify deploy --prod
```

## Customization

### Updating Content

Most of the content can be edited directly in the respective page files:

- Edit pre-launch content in `src/pages/PreLaunch.tsx`
- Update homepage content in `src/pages/Home.tsx`
- Modify feature descriptions in `src/pages/Features.tsx`
- Update pricing information in `src/pages/Pricing.tsx`

### Changing Styles

Global styles and themes are controlled by:

- `tailwind.config.ts` - Contains custom colors and theme settings
- Component-specific styles are in each component file

## Notes

- This repository contains only the landing pages and does not include any authenticated user functionality
- API endpoints for the waitlist and other public features have been preserved
- All dependencies required for the landing pages have been included in the package.json

## Troubleshooting

If you encounter issues with missing dependencies:

```bash
npm install [package-name]
```

For styling issues, check that the Tailwind configuration is correctly loading and processing all files:

```bash
npx tailwindcss init -p
```

This will reset the PostCSS and Tailwind configuration files.

