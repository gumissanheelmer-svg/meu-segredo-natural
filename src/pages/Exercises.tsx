import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ExerciseCard } from '@/components/ExerciseCard';
import { exercises, getExercisesByCategory, weeklyPlan } from '@/data/exercises';
import { Exercise } from '@/types/app';
import { useProfile } from '@/hooks/useLocalStorage';
import { ArrowLeft, Clock, Repeat, Calendar, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = 'all' | 'bumbum' | 'cintura';

export default function Exercises() {
  const [profile] = useProfile();
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    profile?.goal === 'bumbum' ? 'bumbum' : 
    profile?.goal === 'cintura' ? 'cintura' : 'all'
  );
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showWeeklyPlan, setShowWeeklyPlan] = useState(false);

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : getExercisesByCategory(selectedCategory);

  const categories = [
    { id: 'all' as Category, label: 'Todos', emoji: '✨' },
    { id: 'bumbum' as Category, label: 'Bumbum', emoji: '🍑' },
    { id: 'cintura' as Category, label: 'Cintura', emoji: '🔥' },
  ];

  const today = new Date();
  const dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  if (selectedExercise) {
    return (
      <Layout>
        <div className="animate-fade-in">
          <button
            onClick={() => setSelectedExercise(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar aos exercícios
          </button>

          <div className={cn(
            'w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto',
            selectedExercise.category === 'bumbum' ? 'bg-terracotta-light' : 'bg-sage'
          )}>
            {selectedExercise.category === 'bumbum' ? '🍑' : '🔥'}
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            {selectedExercise.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {selectedExercise.duration}
            </span>
            <span className="flex items-center gap-1">
              <Repeat className="h-4 w-4" />
              {selectedExercise.repetitions}
            </span>
          </div>

          <div className="space-y-6">
            {/* How to do */}
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
              <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Como Fazer
              </h2>
              <p className="text-foreground leading-relaxed">
                {selectedExercise.description}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-terracotta-light/30 rounded-xl p-4 text-center">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Duração</p>
                <p className="font-semibold text-foreground">{selectedExercise.duration}</p>
              </div>
              <div className="bg-sage/30 rounded-xl p-4 text-center">
                <Repeat className="h-6 w-6 text-sage-dark mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Repetições</p>
                <p className="font-semibold text-foreground">{selectedExercise.repetitions}</p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gold-light/30 rounded-2xl p-5 border border-gold-light">
              <h3 className="font-semibold text-foreground mb-2">💡 Dicas Importantes</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Mantém sempre a respiração controlada</li>
                <li>• Faz os movimentos devagar, com controlo</li>
                <li>• Se sentires dor, para imediatamente</li>
                <li>• Bebe água antes e depois do exercício</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (showWeeklyPlan) {
    return (
      <Layout>
        <div className="animate-fade-in">
          <button
            onClick={() => setShowWeeklyPlan(false)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Plano Semanal
          </h1>
          <p className="text-muted-foreground mb-6">
            O teu guia de exercícios para a semana
          </p>

          <div className="space-y-4">
            {weeklyPlan.map((day, index) => {
              const isToday = dayNames[today.getDay()] === day.day;
              const bumbumExercises = day.bumbum.map(id => exercises.find(e => e.id === id)).filter(Boolean);
              const cinturaExercises = day.cintura.map(id => exercises.find(e => e.id === id)).filter(Boolean);

              return (
                <div
                  key={day.day}
                  className={cn(
                    'bg-card rounded-2xl p-4 border transition-all duration-300',
                    isToday ? 'border-primary shadow-warm' : 'border-border'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold text-foreground">
                      {day.day}
                    </h3>
                    {isToday && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Hoje
                      </span>
                    )}
                  </div>

                  {bumbumExercises.length === 0 && cinturaExercises.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">
                      Dia de descanso activo 🌿
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {bumbumExercises.map((exercise) => (
                        <div key={exercise!.id} className="flex items-center gap-2 text-sm">
                          <span>🍑</span>
                          <span className="text-foreground">{exercise!.title}</span>
                        </div>
                      ))}
                      {cinturaExercises.map((exercise) => (
                        <div key={exercise!.id} className="flex items-center gap-2 text-sm">
                          <span>🔥</span>
                          <span className="text-foreground">{exercise!.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Exercícios em Casa
          </h1>
          <p className="text-muted-foreground">
            Sem equipamentos, apenas o teu corpo
          </p>
        </div>

        {/* Weekly Plan Button */}
        <button
          onClick={() => setShowWeeklyPlan(true)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary to-gold rounded-2xl text-primary-foreground shadow-warm hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5" />
            <div className="text-left">
              <p className="font-semibold">Plano Semanal</p>
              <p className="text-sm opacity-90">Ver todos os dias</p>
            </div>
          </div>
          <ArrowLeft className="h-5 w-5 rotate-180" />
        </button>

        {/* Category Tabs */}
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300',
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-warm'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              )}
            >
              <span>{category.emoji}</span>
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Exercise List */}
        <div className="space-y-3">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => setSelectedExercise(exercise)}
            />
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-terracotta-light/30 rounded-2xl p-5 border border-terracotta-light">
          <h3 className="font-display font-semibold text-foreground mb-2">
            🎵 Dica Cultural
          </h3>
          <p className="text-foreground text-sm leading-relaxed">
            Coloca música moçambicana enquanto fazes os exercícios! 
            Marrabenta, pandza ou outras músicas tradicionais tornam o treino mais divertido 
            e celebram a nossa cultura.
          </p>
        </div>
      </div>
    </Layout>
  );
}
