import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "@/components/ImageUpload";
import { NutritionResults } from "@/components/NutritionResults";
import { DetectedFoods } from "@/components/DetectedFoods";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useMealHistory, type FoodItem } from "@/contexts/MealHistoryContext";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  detectedFoods: string[];
  foodItems?: FoodItem[];
}

const Analyze = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const { toast } = useToast();
  const { logout } = useAuth();
  const { addMeal } = useMealHistory();
  const navigate = useNavigate();
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setNutritionData(null);

    // Store image URL for history
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Use production webhook URL from environment variable
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://nero1.app.n8n.cloud/webhook/meal-ai';
      
      console.log('Sending request to webhook:', webhookUrl);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to analyze meal: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      // Handle different possible response formats
      let result;
      
      // Check if response is array format
      if (Array.isArray(data) && data.length > 0) {
        result = data[0]?.output;
      } else if (data.output) {
        // Direct output format
        result = data.output;
      } else {
        // Response might already be the result
        result = data;
      }
      
      console.log('Extracted result:', result);
      
      if (result?.status === 'success' && result?.food && result?.total) {
        const detectedFoods = result.food.map((item: any) => `${item.name} (${item.quantity})`);
        
        const foodItems: FoodItem[] = result.food.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          calories: item.calories,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
        }));
        
        const nutritionData: NutritionData = {
          calories: result.total.calories,
          protein: result.total.protein,
          carbs: result.total.carbs,
          fat: result.total.fat,
          detectedFoods,
          foodItems,
        };

        setNutritionData(nutritionData);

        // Save to history
        const imageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        addMeal({
          imageUrl,
          foodItems,
          total: result.total,
        });

        toast({
          title: "Analysis Complete!",
          description: "Your meal has been analyzed and saved to history.",
        });
      } else {
        console.error('Invalid response format. Result:', result);
        throw new Error('Invalid response format from webhook');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Check if it's a CORS error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        toast({
          title: "CORS Error",
          description: "The webhook needs to enable CORS. Please configure your n8n webhook to allow requests from this domain.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: error instanceof Error ? error.message : "There was an error analyzing your meal. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <Logo />
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up" ref={uploadRef}>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Analyze Your Meal</h2>
            <p className="text-muted-foreground">
              Take a photo or choose from your gallery
            </p>
          </div>
          
          <ImageUpload onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          
          {nutritionData && (
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <NutritionResults data={nutritionData} />
              <DetectedFoods foods={nutritionData.detectedFoods} foodItems={nutritionData.foodItems} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analyze;