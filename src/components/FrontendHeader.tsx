import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const FrontendHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent group-hover:scale-110 transition-transform">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              TellUs
            </span>
          </div>
          
          <nav className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/track")}
              className="text-sm sm:text-base rounded-full"
            >
              <span className="hidden sm:inline">Track Complaint</span>
              <span className="sm:hidden">Track</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
              className="text-sm sm:text-base rounded-full"
            >
              Login
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default FrontendHeader;
