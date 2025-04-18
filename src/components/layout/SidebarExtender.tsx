
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import SidebarFavoritesLink from './SidebarFavoritesLink';

const SidebarExtender: React.FC = () => {
  useEffect(() => {
    const injectFavoritesLink = () => {
      // Find the dashboard link's container
      const dashboardLink = document.querySelector('a[href="/dashboard"]');
      if (dashboardLink && dashboardLink.parentElement && dashboardLink.parentElement.parentElement) {
        // Get the parent container where all navigation links are
        const navContainer = dashboardLink.parentElement.parentElement;
        
        // Check if we've already added the favorites link
        if (!navContainer.querySelector('a[href="/favorites"]')) {
          // Create a new list item element
          const favoritesLinkContainer = document.createElement('li');
          
          // Render our favorites link component inside it
          ReactDOM.render(<SidebarFavoritesLink />, favoritesLinkContainer);
          
          // Insert it after the dashboard link
          const bookingsLink = document.querySelector('a[href="/bookings"]');
          if (bookingsLink && bookingsLink.parentElement) {
            navContainer.insertBefore(favoritesLinkContainer, bookingsLink.parentElement);
          } else {
            navContainer.appendChild(favoritesLinkContainer);
          }
        }
      }
    };

    // Run once immediately
    injectFavoritesLink();
    
    // Set up a mutation observer to watch for changes to the DOM
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          injectFavoritesLink();
        }
      }
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, []);
  
  return null;
};

export default SidebarExtender;
