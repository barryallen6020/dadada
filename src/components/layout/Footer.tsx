import React from "react";
import { Link } from "react-router-dom";
import LogoFull from "../common/LogoFull";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-deskhive-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <LogoFull className="text-white w-32 mb-4 invert" />
            <p className="text-white/80 mb-4">
              Nigeria's premier workspace management solution for modern professionals and businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-deskhive-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-deskhive-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-deskhive-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-deskhive-orange transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-white/80 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-of-service" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-white/80 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-white/80 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-deskhive-orange mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80">
                  23 Kofo Abayomi Street, Victoria Island, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-deskhive-orange mr-3 flex-shrink-0" />
                <span className="text-white/80">
                  +234 800 123 4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-deskhive-orange mr-3 flex-shrink-0" />
                <span className="text-white/80">
                  info@deskhive.ng
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm text-center">
              © {new Date().getFullYear()} DeskHive. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
