import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, FolderOpen, MessageSquare, Trash2, ExternalLink, TrendingUp } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { User, Session } from "@supabase/supabase-js";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";

interface ComplaintBox {
  id: string;
  title: string;
  description: string | null;
  token: string;
  created_at: string;
  complaint_count?: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState<ComplaintBox[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [deletingBox, setDeletingBox] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/login");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchBoxes();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    setProfile(data);
  };

  const fetchBoxes = async () => {
    if (!user) return;

    const { data: boxesData, error: boxesError } = await supabase
      .from("complaint_boxes")
      .select("*")
      .eq("admin_id", user.id)
      .order("created_at", { ascending: false });

    if (boxesError) {
      toast.error("Failed to load complaint boxes");
      return;
    }

    const boxesWithCounts = await Promise.all(
      (boxesData || []).map(async (box) => {
        const { count } = await supabase
          .from("complaints")
          .select("*", { count: "exact", head: true })
          .eq("box_id", box.id);

        return { ...box, complaint_count: count || 0 };
      })
    );

    setBoxes(boxesWithCounts);
  };

  const handleDeleteBox = async (boxId: string) => {
    setDeletingBox(boxId);

    try {
      const { error } = await supabase
        .from("complaint_boxes")
        .delete()
        .eq("id", boxId);

      if (error) throw error;

      toast.success("Complaint box deleted successfully");
      fetchBoxes();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete complaint box");
    } finally {
      setDeletingBox(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <AdminHeader />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Skeleton className="h-16 w-80 rounded-2xl" />
            <div className="grid sm:grid-cols-2 gap-6">
              <Skeleton className="h-40 rounded-2xl" />
              <Skeleton className="h-40 rounded-2xl" />
            </div>
            <Skeleton className="h-48 rounded-2xl" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-64 rounded-2xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalComplaints = boxes.reduce((sum, box) => sum + (box.complaint_count || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Welcome back, {profile?.username || user?.email?.split('@')[0]} 👋
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 gap-6 animate-fade-in">
            <Card className="glass-card hover:shadow-[var(--shadow-glow-primary)] transition-all duration-300 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  Complaint Boxes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold gradient-text">{boxes.length}</p>
                <p className="text-sm text-muted-foreground mt-2">Active boxes</p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-[var(--shadow-glow-accent)] transition-all duration-300 border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    Total Complaints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold gradient-text">{totalComplaints}</p>
                  <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    All time submissions
                  </p>
                </CardContent>
              </Card>
          </div>

          {/* Create New Box CTA */}
          <Card className="glass-card border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-glow-primary)] animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Create New Complaint Box</CardTitle>
                <CardDescription className="text-base">
                  Set up a new complaint box to collect feedback anonymously
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/create-box")} 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Complaint Box
                </Button>
              </CardContent>
            </Card>

          {/* Complaint Boxes Grid */}
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">
              Your Complaint Boxes
            </h2>
            
            {boxes.length === 0 ? (
              <Card className="glass-card">
                  <CardContent className="py-20 text-center">
                    <FolderOpen className="w-20 h-20 mx-auto text-muted-foreground mb-6 opacity-50" />
                    <p className="text-xl text-muted-foreground">
                      No complaint boxes yet. Create your first one to get started!
                    </p>
                  </CardContent>
                </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {boxes.map((box) => (
                  <Card key={box.id} className="glass-card hover:shadow-[var(--shadow-strong)] transition-all duration-300 group h-full flex flex-col">
                      <CardHeader className="flex-1">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <CardTitle className="text-xl break-words line-clamp-2 flex-1 group-hover:text-primary transition-colors">
                            {box.title}
                          </CardTitle>
                          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                            <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                          </div>
                        </div>
                        <CardDescription className="text-sm break-words line-clamp-2">
                          {box.description || "No description"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Complaints</p>
                            <p className="text-2xl font-bold text-primary">{box.complaint_count}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Created</p>
                            <p className="text-xs font-medium">{new Date(box.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => navigate(`/manage/${box.id}`)}
                            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                            size="sm"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Manage
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-destructive/50 text-destructive hover:bg-destructive hover:text-white"
                                disabled={deletingBox === box.id}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                {deletingBox === box.id ? "Deleting..." : "Delete"}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this complaint box and all associated complaints. 
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteBox(box.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
