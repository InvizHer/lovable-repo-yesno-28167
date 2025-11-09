import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div 
        className="text-center space-y-8 max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
          <Button 
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
