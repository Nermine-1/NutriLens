import { Card } from "@/components/ui/card";
import { Flame, Beef, Wheat, Droplet } from "lucide-react";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionResultsProps {
  data: NutritionData | null;
}

export const NutritionResults = ({ data }: NutritionResultsProps) => {
  if (!data) return null;

  const macros = [
    {
      label: "Calories",
      value: data.calories,
      unit: "kcal",
      icon: Flame,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      label: "Protein",
      value: data.protein,
      unit: "g",
      icon: Beef,
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/20",
    },
    {
      label: "Carbs",
      value: data.carbs,
      unit: "g",
      icon: Wheat,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      label: "Fat",
      value: data.fat,
      unit: "g",
      icon: Droplet,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ];

  return (
    <Card className="p-6 shadow-md bg-white border animate-[slide-up_0.5s_ease-out]">
      <h3 className="text-2xl font-bold mb-6">
        Nutritional Breakdown
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {macros.map((macro) => (
          <div
            key={macro.label}
            className={`p-5 rounded-xl border-2 ${macro.bgColor} ${macro.borderColor} transition-all duration-300 hover:shadow-md`}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${macro.bgColor}`}>
                  <macro.icon className={`w-5 h-5 ${macro.color}`} strokeWidth={2} />
                </div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {macro.label}
                </span>
              </div>
              <p className={`text-3xl font-bold ${macro.color}`}>
                {macro.value}
                <span className="text-lg font-semibold ml-1 text-muted-foreground">{macro.unit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
