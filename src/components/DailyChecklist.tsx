import { useState, useEffect } from 'react';
import { Check, Droplets, Utensils, Dumbbell, CakeSlice, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motivationalQuotes } from '@/data/testimonials';
import { toast } from 'sonner';

interface CheckItem {
  id: string;
  dbColumn: 'recipe_completed' | 'exercise_completed' | 'water_completed' | 'sugar_avoided';
  label: string;
  icon: React.ElementType;
  color: string;
}

const checkItems: CheckItem[] = [
  { id: 'recipe', dbColumn: 'recipe_completed', label: 'Bebeu receita do dia', icon: Utensils, color: 'bg-terracotta-light text-primary' },
  { id: 'exercise', dbColumn: 'exercise_completed', label: 'Fez exercício', icon: Dumbbell, color: 'bg-gold-light text-accent-foreground' },
  { id: 'water', dbColumn: 'water_completed', label: 'Bebeu água suficiente', icon: Droplets, color: 'bg-sage text-sage-dark' },
  { id: 'sugar', dbColumn: 'sugar_avoided', label: 'Evitou açúcar', icon: CakeSlice, color: 'bg-secondary text-secondary-foreground' },
];

export function DailyChecklist() {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];
  const [todayChecks, setTodayChecks] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('daily_progress')
      .select('recipe_completed, exercise_completed, water_completed, sugar_avoided')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setTodayChecks({
            recipe: data.recipe_completed,
            exercise: data.exercise_completed,
            water: data.water_completed,
            sugar: data.sugar_avoided,
          });
        }
        setLoading(false);
      });
  }, [user, today]);

  const toggleCheck = async (item: CheckItem) => {
    if (!user) return;
    const newValue = !todayChecks[item.id];
    const newChecks = { ...todayChecks, [item.id]: newValue };
    setTodayChecks(newChecks);

    const upsertData: Record<string, any> = {
      user_id: user.id,
      date: today,
      [item.dbColumn]: newValue,
    };

    // Include all current values so we don't reset other columns
    checkItems.forEach(ci => {
      if (ci.id !== item.id) {
        upsertData[ci.dbColumn] = newChecks[ci.id] || false;
      }
    });

    await supabase
      .from('daily_progress')
      .upsert(upsertData, { onConflict: 'user_id,date' });

    const allCompleted = checkItems.every(ci => newChecks[ci.id]);
    if (allCompleted) {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      toast.success('Parabéns! Completaste o dia!', {
        description: randomQuote,
        duration: 5000,
      });
    }
  };

  const completedCount = checkItems.filter(item => todayChecks[item.id]).length;
  const progressPercent = (completedCount / checkItems.length) * 100;

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold" />
          Checklist Diário
        </h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{checkItems.length}
        </span>
      </div>

      <div className="h-2 bg-muted rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-gold rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-3">
        {checkItems.map((item) => {
          const isChecked = todayChecks[item.id];
          return (
            <button
              key={item.id}
              onClick={() => toggleCheck(item)}
              disabled={loading}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300',
                isChecked
                  ? 'bg-sage/30'
                  : 'bg-muted/50 hover:bg-muted'
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
                  isChecked ? 'bg-sage text-sage-dark' : item.color
                )}
              >
                {isChecked ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <item.icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  'font-medium transition-all duration-300',
                  isChecked
                    ? 'text-sage-dark line-through'
                    : 'text-foreground'
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
