import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealEntry {
  id: string;
  userId: string;
  date: string;
  imageUrl: string;
  foodItems: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface MealHistoryContextType {
  meals: MealEntry[];
  addMeal: (meal: Omit<MealEntry, 'id' | 'userId' | 'date'>) => void;
  deleteMeal: (id: string) => void;
  getTodaysMeals: () => MealEntry[];
  getWeeklyStats: () => { calories: number; protein: number; carbs: number; fat: number };
}

const MealHistoryContext = createContext<MealHistoryContextType | undefined>(undefined);

export const useMealHistory = () => {
  const context = useContext(MealHistoryContext);
  if (!context) {
    throw new Error('useMealHistory must be used within MealHistoryProvider');
  }
  return context;
};

export const MealHistoryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [meals, setMeals] = useState<MealEntry[]>([]);

  useEffect(() => {
    if (user) {
      const storedMeals = localStorage.getItem(`meals_${user.id}`);
      if (storedMeals) {
        setMeals(JSON.parse(storedMeals));
      }
    } else {
      setMeals([]);
    }
  }, [user]);

  const addMeal = (meal: Omit<MealEntry, 'id' | 'userId' | 'date'>) => {
    if (!user) return;

    const newMeal: MealEntry = {
      ...meal,
      id: crypto.randomUUID(),
      userId: user.id,
      date: new Date().toISOString(),
    };

    const updatedMeals = [newMeal, ...meals];
    setMeals(updatedMeals);
    localStorage.setItem(`meals_${user.id}`, JSON.stringify(updatedMeals));
  };

  const deleteMeal = (id: string) => {
    if (!user) return;

    const updatedMeals = meals.filter(m => m.id !== id);
    setMeals(updatedMeals);
    localStorage.setItem(`meals_${user.id}`, JSON.stringify(updatedMeals));
  };

  const getTodaysMeals = () => {
    const today = new Date().toDateString();
    return meals.filter(m => new Date(m.date).toDateString() === today);
  };

  const getWeeklyStats = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyMeals = meals.filter(m => new Date(m.date) >= weekAgo);

    return weeklyMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.total.calories,
        protein: acc.protein + meal.total.protein,
        carbs: acc.carbs + meal.total.carbs,
        fat: acc.fat + meal.total.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <MealHistoryContext.Provider
      value={{
        meals,
        addMeal,
        deleteMeal,
        getTodaysMeals,
        getWeeklyStats,
      }}
    >
      {children}
    </MealHistoryContext.Provider>
  );
};