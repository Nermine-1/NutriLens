import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useMealHistory } from '@/contexts/MealHistoryContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/Logo';
import { Camera, LogOut, User, Trash2, Calendar, TrendingUp, Flame, Beef, Wheat, Droplet } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { meals, deleteMeal, getTodaysMeals, getWeeklyStats } = useMealHistory();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week'>('today');

  const todaysMeals = getTodaysMeals();
  const weeklyStats = getWeeklyStats();

  const displayMeals = selectedPeriod === 'today' ? todaysMeals : meals.slice(0, 7);
  const stats = selectedPeriod === 'today' 
    ? todaysMeals.reduce((acc, meal) => ({
        calories: acc.calories + meal.total.calories,
        protein: acc.protein + meal.total.protein,
        carbs: acc.carbs + meal.total.carbs,
        fat: acc.fat + meal.total.fat,
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
    : weeklyStats;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteMeal = (id: string) => {
    if (confirm('Are you sure you want to delete this meal?')) {
      deleteMeal(id);
    }
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
                onClick={() => navigate('/analyze')}
              >
                <Camera className="w-4 h-4 mr-2" />
                New Analysis
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

      <main className="container mx-auto px-4 py-8 animate-fade-in-up">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedPeriod === 'today' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('today')}
            className={selectedPeriod === 'today' ? 'bg-gradient-hero' : ''}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Today
          </Button>
          <Button
            variant={selectedPeriod === 'week' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('week')}
            className={selectedPeriod === 'week' ? 'bg-gradient-hero' : ''}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            This Week
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-orange-50 border-orange-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-muted-foreground">Calories</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">{Math.round(stats.calories)}</p>
            <p className="text-xs text-muted-foreground">kcal</p>
          </Card>

          <Card className="p-4 bg-primary/5 border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Beef className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-muted-foreground">Protein</span>
            </div>
            <p className="text-2xl font-bold text-primary">{Math.round(stats.protein)}</p>
            <p className="text-xs text-muted-foreground">grams</p>
          </Card>

          <Card className="p-4 bg-amber-50 border-amber-200 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Wheat className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold text-muted-foreground">Carbs</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">{Math.round(stats.carbs)}</p>
            <p className="text-xs text-muted-foreground">grams</p>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-muted-foreground">Fat</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{Math.round(stats.fat)}</p>
            <p className="text-xs text-muted-foreground">grams</p>
          </Card>
        </div>

        {/* Meal History */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Meal History</h2>
          
          {displayMeals.length === 0 ? (
            <div className="text-center py-12 animate-fade-in-up">
              <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No meals analyzed yet</p>
              <Button onClick={() => navigate('/analyze')} className="bg-gradient-hero">
                <Camera className="w-4 h-4 mr-2" />
                Analyze Your First Meal
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {displayMeals.map((meal, index) => (
                <Card 
                  key={meal.id} 
                  className="p-4 hover:shadow-md transition-shadow animate-fade-in-up hover:animate-pop"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <img
                      src={meal.imageUrl}
                      alt="Meal"
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">
                            {format(new Date(meal.date), 'MMM dd, yyyy')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(meal.date), 'h:mm a')}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMeal(meal.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Calories</p>
                          <p className="font-semibold">{meal.total.calories}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Protein</p>
                          <p className="font-semibold">{meal.total.protein}g</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Carbs</p>
                          <p className="font-semibold">{meal.total.carbs}g</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fat</p>
                          <p className="font-semibold">{meal.total.fat}g</p>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">
                          {meal.foodItems.map(f => f.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;