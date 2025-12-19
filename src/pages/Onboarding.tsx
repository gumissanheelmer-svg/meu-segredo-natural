import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GoalCard } from '@/components/GoalCard';
import { useOnboardingComplete, useProfile } from '@/hooks/useLocalStorage';
import { Goal, UserProfile, ActivityLevel } from '@/types/app';
import { Sparkles, Heart, Leaf, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const goals = [
  {
    id: 'bumbum' as Goal,
    title: 'Aumentar o Bumbum',
    description: 'Receitas e exercícios para ganhar volume de forma natural',
    icon: '🍑',
  },
  {
    id: 'cintura' as Goal,
    title: 'Afinar a Cintura',
    description: 'Chás, águas detox e exercícios para definir a cintura',
    icon: '🔥',
  },
  {
    id: 'ambos' as Goal,
    title: 'Ambos os Objectivos',
    description: 'Programa completo para bumbum e cintura',
    icon: '✨',
  },
];

const activityLevels = [
  { id: 'sedentaria' as ActivityLevel, label: 'Sedentária', description: 'Pouca ou nenhuma actividade física' },
  { id: 'moderada' as ActivityLevel, label: 'Moderada', description: 'Actividade física leve 2-3 vezes por semana' },
  { id: 'ativa' as ActivityLevel, label: 'Activa', description: 'Actividade física regular 4+ vezes por semana' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [, setOnboardingComplete] = useOnboardingComplete();
  const [, setProfile] = useProfile();
  const [step, setStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    waist: '',
    hip: '',
    activityLevel: '' as ActivityLevel,
  });

  const handleNext = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1 && selectedGoal) {
      setStep(2);
    } else if (step === 2) {
      // Save profile
      const profile: UserProfile = {
        name: formData.name,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        waist: parseFloat(formData.waist),
        hip: parseFloat(formData.hip),
        activityLevel: formData.activityLevel,
        goal: selectedGoal!,
        startDate: new Date().toISOString(),
      };
      setProfile(profile);
      setOnboardingComplete(true);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const isStep2Valid = 
    formData.name && 
    formData.age && 
    formData.height && 
    formData.weight && 
    formData.waist && 
    formData.hip && 
    formData.activityLevel;

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-terracotta-light/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-48 h-48 bg-sage/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-56 h-56 bg-gold-light/30 rounded-full blur-3xl" />
      </div>

      <div className="relative container max-w-lg mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full transition-all duration-500',
                i === step
                  ? 'w-8 bg-primary'
                  : i < step
                  ? 'w-2 bg-primary/60'
                  : 'w-2 bg-muted'
              )}
            />
          ))}
        </div>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center mb-6 shadow-warm">
              <Sparkles className="h-10 w-10 text-primary-foreground" />
            </div>
            
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Bem-vinda à<br />
              <span className="text-primary">Beleza Natural</span>
            </h1>
            
            <p className="text-muted-foreground mb-8 max-w-xs leading-relaxed">
              Celebra a tua beleza africana com receitas naturais e exercícios simples. 
              O teu corpo, o teu ritmo, os teus resultados.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-terracotta-light flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Amor-próprio</p>
                  <p className="text-sm text-muted-foreground">Cuida de ti com carinho</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-sage-dark" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">100% Natural</p>
                  <p className="text-sm text-muted-foreground">Ingredientes do quintal</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Goal Selection */}
        {step === 1 && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">
              Qual é o teu objectivo?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Escolhe o foco principal do teu programa
            </p>

            <div className="space-y-4 flex-1">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  title={goal.title}
                  description={goal.description}
                  icon={goal.icon}
                  selected={selectedGoal === goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Profile Form */}
        {step === 2 && (
          <div className="flex-1 flex flex-col animate-fade-in">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">
              Conta-nos sobre ti
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Estas informações ajudam a acompanhar o teu progresso
            </p>

            <div className="space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  O teu nome
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Como te chamas?"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Idade
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Anos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="cm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Peso actual (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="kg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Cintura (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.waist}
                    onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="cm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Quadril (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.hip}
                    onChange={(e) => setFormData({ ...formData, hip: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="cm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nível de actividade
                </label>
                <div className="space-y-2">
                  {activityLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setFormData({ ...formData, activityLevel: level.id })}
                      className={cn(
                        'w-full p-3 rounded-xl border text-left transition-all duration-300',
                        formData.activityLevel === level.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-primary/50'
                      )}
                    >
                      <p className="font-medium text-foreground">{level.label}</p>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
          {step > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          )}
          <Button
            variant="warm"
            onClick={handleNext}
            disabled={step === 1 && !selectedGoal || step === 2 && !isStep2Valid}
            className={cn('flex-1', step === 0 && 'w-full')}
          >
            {step === 2 ? 'Começar' : 'Continuar'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
