
import React from "react";
import { NavLink } from "react-router-dom";
import { Heart } from "lucide-react";

const SidebarFavoritesLink: React.FC = () => {
  return (
    <NavLink
      to="/favorites"
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-lg transition duration-200 ${
          isActive
            ? "bg-deskhive-skyblue/20 text-deskhive-navy font-medium"
            : "hover:bg-gray-100 text-deskhive-darkgray/80 hover:text-deskhive-navy"
        }`
      }
    >
      <Heart className="h-5 w-5 mr-2" />
      <span>Favorites</span>
    </NavLink>
  );
};

export default SidebarFavoritesLink;
