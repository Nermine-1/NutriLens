import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Camera, Zap, TrendingUp, ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMealImage from "@/assets/hero-meal.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button
                className="bg-gradient-hero hover:opacity-90"
                onClick={() => navigate('/signup')}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Zap className="w-3.5 h-3.5 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                Instant Nutrition Analysis from Any Meal Photo
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Upload a photo of your meal and get detailed nutritional breakdown in seconds. 
                Track calories, macros, and make informed dietary decisions with AI precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-hero hover:opacity-90 shadow-md text-base font-semibold"
                  onClick={() => navigate('/signup')}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-base font-semibold"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl opacity-50"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-border">
                <img
                  src={heroMealImage}
                  alt="Healthy meal example"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* Features Section */}
      <section className="bg-white border-t py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold mb-3">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Three simple steps to understand your nutrition
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4 animate-fade-in-up hover:animate-pop" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">1. Capture</h3>
                <p className="text-muted-foreground">
                  Take a photo of your meal or upload from your device
                </p>
              </div>
              <div className="text-center space-y-4 animate-fade-in-up hover:animate-pop" style={{ animationDelay: '0.5s' }}>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">2. Analyze</h3>
                <p className="text-muted-foreground">
                  Our AI instantly identifies foods and calculates nutrition
                </p>
              </div>
              <div className="text-center space-y-4 animate-fade-in-up hover:animate-pop" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">3. Track</h3>
                <p className="text-muted-foreground">
                  Get detailed breakdown of calories, protein, carbs, and fats
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              © 2024 Meal Analysis AI. Powered by advanced nutrition analysis.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
