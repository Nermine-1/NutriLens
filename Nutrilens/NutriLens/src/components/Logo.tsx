import { Utensils } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md">
        <Utensils className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold text-foreground">NutriLens</span>
    </div>
  );
};
