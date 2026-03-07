import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useProfile, useOnboardingComplete, useDailyProgress } from '@/hooks/useLocalStorage';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { testimonials, motivationalQuotes } from '@/data/testimonials';
import { User, Calendar, Target, Activity, Edit2, RefreshCw, BookOpen, Heart, MessageCircle, Quote, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useProfile();
  const [, setOnboardingComplete] = useOnboardingComplete();
  const [progress, setProgress] = useDailyProgress();
  const [showEducation, setShowEducation] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [dbProfile, setDbProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('*').eq('id', user.id).single()
      .then(({ data }) => { if (data) setDbProfile(data); });
  }, [user]);

  const displayProfile = dbProfile || profile;

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
    toast.success('Até breve! 💕');
  };

  const handleReset = () => {
    if (confirm('Tens a certeza que queres recomeçar? Todos os dados serão apagados.')) {
      setProfile(null);
      setOnboardingComplete(false);
      setProgress({});
      if (user) {
        supabase.from('profiles').update({ onboarding_complete: false }).eq('id', user.id);
      }
      navigate('/');
      toast.success('Programa reiniciado');
    }
  };

  const goalLabels = {
    bumbum: 'Aumentar o Bumbum',
    cintura: 'Afinar a Cintura',
    ambos: 'Ambos os Objectivos',
  };

  const activityLabels = {
    sedentaria: 'Sedentária',
    moderada: 'Moderada',
    ativa: 'Activa',
  };

  const p = displayProfile;
  const startDate = p?.startDate ? new Date(p.startDate) : p?.start_date ? new Date(p.start_date) : null;

  const educationContent = [
    {
      title: 'A Importância da Consistência',
      content: 'Os resultados não aparecem da noite para o dia. A chave é manter uma rotina diária, mesmo nos dias difíceis. Pequenos passos todos os dias levam a grandes transformações.',
      icon: '📅'
    },
    {
      title: 'Evita Produtos Químicos',
      content: 'Os produtos naturais são mais seguros e eficazes a longo prazo. Evita cremes e suplementos com químicos desconhecidos. O teu corpo merece o melhor da natureza.',
      icon: '🚫'
    },
    {
      title: 'Valoriza os Ingredientes Locais',
      content: 'Banana, abacate, gengibre, limão... Tudo o que precisas está no mercado local ou no teu quintal. Estes ingredientes são acessíveis, frescos e poderosos.',
      icon: '🌿'
    },
    {
      title: 'Sabedoria Tradicional Moçambicana',
      content: 'As nossas avós já sabiam destes segredos de beleza. Receitas passadas de geração em geração provam que a natureza sempre foi a melhor aliada da mulher africana.',
      icon: '👵'
    },
    {
      title: 'Hidratação é Fundamental',
      content: 'Bebe pelo menos 8 copos de água por dia. A água ajuda a eliminar toxinas, melhora a pele e potencia os efeitos das receitas e exercícios.',
      icon: '💧'
    },
    {
      title: 'Descanso e Recuperação',
      content: 'O teu corpo precisa de tempo para se recuperar. Dorme bem, evita stress excessivo e ouve o teu corpo. O descanso é parte essencial do processo.',
      icon: '😴'
    }
  ];

  if (showTestimonials) {
    return (
      <Layout>
        <div className="animate-fade-in">
          <button
            onClick={() => setShowTestimonials(false)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Voltar ao perfil
          </button>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Depoimentos
          </h1>
          <p className="text-muted-foreground mb-6">
            Histórias reais de mulheres moçambicanas
          </p>

          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card rounded-2xl p-5 shadow-card border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center flex-shrink-0">
                    <Quote className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground italic leading-relaxed mb-3">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <p className="text-primary text-sm font-medium mt-1">
                      ✨ {testimonial.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (showEducation) {
    return (
      <Layout>
        <div className="animate-fade-in">
          <button
            onClick={() => setShowEducation(false)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Voltar ao perfil
          </button>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Educação & Dicas
          </h1>
          <p className="text-muted-foreground mb-6">
            Conhecimento para a tua jornada
          </p>

          <div className="space-y-4">
            {educationContent.map((item, index) => (
              <div key={index} className="bg-card rounded-2xl p-5 shadow-card border border-border">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center mx-auto mb-4 shadow-warm">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
           <h1 className="font-display text-2xl font-bold text-foreground">
            {displayProfile?.name || 'O Teu Perfil'}
          </h1>
          <p className="text-muted-foreground">
            {displayProfile?.age} anos
          </p>
          <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
        </div>

        {/* Profile Info */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Informações Pessoais
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Altura</span>
              <span className="font-medium text-foreground">{displayProfile?.height} cm</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Peso inicial</span>
              <span className="font-medium text-foreground">{displayProfile?.weight} kg</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Cintura inicial</span>
              <span className="font-medium text-foreground">{displayProfile?.waist} cm</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Quadril inicial</span>
              <span className="font-medium text-foreground">{displayProfile?.hip} cm</span>
            </div>
          </div>
        </div>

        {/* Goal & Activity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
            <Target className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Objectivo</p>
            <p className="font-semibold text-foreground text-sm">
              {(displayProfile?.goal) && goalLabels[displayProfile.goal as keyof typeof goalLabels]}
            </p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
            <Activity className="h-5 w-5 text-sage-dark mb-2" />
            <p className="text-sm text-muted-foreground">Nível</p>
            <p className="font-semibold text-foreground text-sm">
              {(displayProfile?.activityLevel || displayProfile?.activity_level) && 
                activityLabels[(displayProfile.activityLevel || displayProfile.activity_level) as keyof typeof activityLabels]}
            </p>
          </div>
        </div>

        {/* Start Date */}
        {startDate && (
          <div className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Início do programa</p>
              <p className="font-semibold text-foreground">
                {startDate.toLocaleDateString('pt-MZ', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="space-y-3">
          <button
            onClick={() => setShowEducation(true)}
            className="w-full flex items-center justify-between p-4 bg-card rounded-2xl shadow-card border border-border hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-sage-dark" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Educação & Dicas</p>
                <p className="text-sm text-muted-foreground">Aprende mais sobre saúde natural</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowTestimonials(true)}
            className="w-full flex items-center justify-between p-4 bg-card rounded-2xl shadow-card border border-border hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-terracotta-light flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Depoimentos</p>
                <p className="text-sm text-muted-foreground">Histórias de sucesso</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleReset}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Recomeçar Programa
        </Button>

        {/* Footer Quote */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground italic">
            "Cuida do teu corpo com amor, ele é o único lugar onde vives." 💕
          </p>
        </div>
      </div>
    </Layout>
  );
}
