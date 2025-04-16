
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deskhive-skyblue via-white to-deskhive-skyblue">
      <div className="glass-card p-12 rounded-3xl shadow-2xl backdrop-blur-2xl bg-white/20 border border-white/30 w-full max-w-lg">
        <div className="relative mb-8">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-deskhive-orange/20 rounded-full filter blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-deskhive-royal/20 rounded-full filter blur-xl"></div>
          <h1 className="text-8xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-deskhive-navy to-deskhive-royal">404</h1>
        </div>
        <p className="text-2xl text-center text-deskhive-navy mb-6">Oops! We couldn't find that page</p>
        <p className="text-center text-deskhive-darkgray/80 mb-8">
          The page you're looking for might have been moved, deleted, or never existed in the first place.
        </p>
        <div className="flex justify-center">
          <Link to="/" className="group relative px-6 py-3 font-medium">
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-deskhive-orange group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full border-2 border-deskhive-navy"></span>
            <span className="relative text-deskhive-navy group-hover:text-white">Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
