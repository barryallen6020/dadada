
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Automatically redirect logged-in users to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-deskhive-skyblue/10 to-white">
      <div className="text-center p-8 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-deskhive-navy to-deskhive-orange bg-clip-text text-transparent">
          Welcome to DeskHive
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your complete workspace booking and management solution
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isLoggedIn ? (
            <Button 
              className="btn-primary text-lg px-8 py-6" 
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button 
                className="btn-primary text-lg px-8 py-6" 
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                className="btn-secondary text-lg px-8 py-6" 
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
