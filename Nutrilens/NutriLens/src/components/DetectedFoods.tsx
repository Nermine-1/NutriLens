import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Flame, Beef, Wheat, Droplet } from "lucide-react";

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DetectedFoodsProps {
  foods: string[];
  foodItems?: FoodItem[];
}

export const DetectedFoods = ({ foods, foodItems }: DetectedFoodsProps) => {
  if (!foods || foods.length === 0) return null;

  // If detailed food items are available, show detailed view
  if (foodItems && foodItems.length > 0) {
    return (
      <Card className="p-6 shadow-md bg-card border animate-[slide-up_0.6s_ease-out]">
        <div className="flex items-start gap-3 mb-6">
          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold mb-1">Detected Foods</h3>
            <p className="text-sm text-muted-foreground">
              {foodItems.length} {foodItems.length === 1 ? 'item' : 'items'} identified in your meal
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {foodItems.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-base">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.quantity}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Calories</p>
                    <p className="text-sm font-semibold">{item.calories}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Beef className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Protein</p>
                    <p className="text-sm font-semibold">{item.protein}g</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wheat className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                    <p className="text-sm font-semibold">{item.carbs}g</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fat</p>
                    <p className="text-sm font-semibold">{item.fat}g</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // Fallback to simple badge view
  return (
    <Card className="p-6 shadow-md bg-card border animate-[slide-up_0.6s_ease-out]">
      <div className="flex items-start gap-3 mb-4">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold mb-1">Detected Foods</h3>
          <p className="text-sm text-muted-foreground">
            {foods.length} {foods.length === 1 ? 'item' : 'items'} identified in your meal
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {foods.map((food, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-3 py-1.5 text-sm font-medium"
          >
            {food}
          </Badge>
        ))}
      </div>
    </Card>
  );
};
