import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { DailyChecklist } from '@/components/DailyChecklist';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motivationalQuotes, testimonials } from '@/data/testimonials';
import { recipes } from '@/data/recipes';
import { weeklyPlan } from '@/data/exercises';
import { Button } from '@/components/ui/button';
import { ArrowRight, Flame, Calendar, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [streak, setStreak] = useState(0);
  const [quote, setQuote] = useState('');
  const [testimonial, setTestimonial] = useState(testimonials[0]);

  const today = new Date();
  const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const dayOfWeek = dayNames[today.getDay()];
  const todayPlan = weeklyPlan.find(p => p.day === dayOfWeek);

  useEffect(() => {
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    setTestimonial(testimonials[Math.floor(Math.random() * testimonials.length)]);
  }, []);

  useEffect(() => {
    if (!user) return;

    // Load profile
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
      .then(({ data }) => { if (data) setProfile(data); });

    // Calculate streak from DB
    supabase.from('daily_progress')
      .select('date, recipe_completed, exercise_completed, water_completed, sugar_avoided')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(60)
      .then(({ data }) => {
        if (!data) return;
        let s = 0;
        // Check consecutive days ending today or yesterday
        const todayStr = new Date().toISOString().split('T')[0];
        const sorted = data.sort((a, b) => b.date.localeCompare(a.date));
        
        for (const row of sorted) {
          const allDone = row.recipe_completed && row.exercise_completed && row.water_completed && row.sugar_avoided;
          if (allDone) {
            s++;
          } else {
            break;
          }
        }
        setStreak(s);
      });
  }, [user]);

  const firstName = profile?.name?.split(' ')[0] || 'Amiga';

  const getRecommendedRecipe = () => {
    if (profile?.goal === 'cintura') return recipes.find(r => r.category === 'cintura');
    if (profile?.goal === 'bumbum') return recipes.find(r => r.category === 'bumbum');
    return recipes[Math.floor(Math.random() * recipes.length)];
  };

  const recommendedRecipe = getRecommendedRecipe();

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Greeting Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-gold p-6 text-primary-foreground shadow-warm">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-foreground/10 rounded-full blur-2xl" />
          <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-primary-foreground/10 rounded-full blur-xl" />
          
          <div className="relative">
            <p className="text-primary-foreground/80 text-sm mb-1">Olá,</p>
            <h1 className="font-display text-2xl font-bold mb-2">
              {firstName}! 👋
            </h1>
            <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-[200px]">
              {quote}
            </p>
          </div>

          {streak > 0 && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-primary-foreground/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Flame className="h-4 w-4 text-gold-light" />
              <span className="font-semibold text-sm">{streak} dias</span>
            </div>
          )}
        </div>

        {/* Today's Plan */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Plano de Hoje
            </h2>
            <span className="text-sm text-muted-foreground">{dayOfWeek}</span>
          </div>

          {todayPlan && (
            <div className="space-y-3">
              {todayPlan.bumbum.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-terracotta-light/30 rounded-xl">
                  <span className="text-xl">🍑</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {todayPlan.bumbum.length} exercício(s) para bumbum
                    </p>
                  </div>
                </div>
              )}
              {todayPlan.cintura.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-sage/30 rounded-xl">
                  <span className="text-xl">🔥</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {todayPlan.cintura.length} exercício(s) para cintura
                    </p>
                  </div>
                </div>
              )}
              <Link to="/exercicios">
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Ver exercícios de hoje
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Daily Checklist */}
        <DailyChecklist />

        {/* Recommended Recipe */}
        {recommendedRecipe && (
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Star className="h-4 w-4 text-gold" />
                Receita Recomendada
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center text-3xl',
                recommendedRecipe.category === 'bumbum' ? 'bg-terracotta-light' : 'bg-sage'
              )}>
                {recommendedRecipe.category === 'bumbum' ? '🍌' : '🍋'}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">
                  {recommendedRecipe.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {recommendedRecipe.bestTime}
                </p>
              </div>
            </div>

            <Link to="/receitas">
              <Button variant="sage" size="sm" className="w-full mt-4">
                Ver todas as receitas
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* Testimonial */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center flex-shrink-0">
              <Quote className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-foreground text-sm italic leading-relaxed mb-3">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                <span className="text-muted-foreground text-sm">•</span>
                <p className="text-muted-foreground text-sm">{testimonial.location}</p>
              </div>
              <p className="text-primary text-sm font-medium mt-1">{testimonial.result}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
