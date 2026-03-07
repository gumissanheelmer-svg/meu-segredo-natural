import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, Scale, Ruler, Target, Plus, Calendar, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Progress() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [completedDays, setCompletedDays] = useState(0);
  const [showAddMeasurement, setShowAddMeasurement] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState({ weight: '', waist: '', hip: '' });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!user) return;

    // Load profile (initial measurements)
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
      .then(({ data }) => { if (data) setProfile(data); });

    // Load progress history
    supabase.from('daily_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .then(({ data }) => {
        if (!data) return;
        // Measurements with at least one value
        const withMeasures = data.filter(d => d.weight || d.waist || d.hip);
        setMeasurements(withMeasures);

        // Completed days
        const done = data.filter(d => d.recipe_completed && d.exercise_completed && d.water_completed && d.sugar_avoided);
        setCompletedDays(done.length);
      });
  }, [user]);

  const latestMeasurement = measurements[0] || {};

  const calculateChange = (current: number | undefined | null, initial: number | undefined | null) => {
    if (!current || !initial) return null;
    return Number(current) - Number(initial);
  };

  const weightChange = calculateChange(latestMeasurement.weight || profile?.weight, profile?.weight);
  const waistChange = calculateChange(latestMeasurement.waist || profile?.waist, profile?.waist);
  const hipChange = calculateChange(latestMeasurement.hip || profile?.hip, profile?.hip);

  const handleAddMeasurement = async () => {
    if (!user) return;
    const updateData: Record<string, any> = {};
    if (newMeasurement.weight) updateData.weight = parseFloat(newMeasurement.weight);
    if (newMeasurement.waist) updateData.waist = parseFloat(newMeasurement.waist);
    if (newMeasurement.hip) updateData.hip = parseFloat(newMeasurement.hip);

    if (Object.keys(updateData).length === 0) {
      toast.error('Por favor, adiciona pelo menos uma medida');
      return;
    }

    const { error } = await supabase.from('daily_progress').upsert(
      { user_id: user.id, date: today, ...updateData } as any
    );

    if (error) {
      toast.error('Erro ao guardar medidas');
      return;
    }

    // Refresh measurements
    const { data } = await supabase.from('daily_progress')
      .select('*').eq('user_id', user.id).order('date', { ascending: false });
    if (data) {
      setMeasurements(data.filter(d => d.weight || d.waist || d.hip));
    }

    setNewMeasurement({ weight: '', waist: '', hip: '' });
    setShowAddMeasurement(false);
    toast.success('Medidas registadas com sucesso!');
  };

  const TrendIcon = ({ value }: { value: number | null }) => {
    if (value === null) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (value > 0) return <TrendingUp className="h-4 w-4 text-primary" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-sage-dark" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const formatChange = (value: number | null, unit: string) => {
    if (value === null) return '—';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}${unit}`;
  };

  const startDate = profile?.start_date ? new Date(profile.start_date) : new Date();
  const daysSinceStart = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">O Teu Progresso</h1>
          <p className="text-muted-foreground">Acompanha a tua evolução</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-4 shadow-card border border-border text-center">
            <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{daysSinceStart}</p>
            <p className="text-sm text-muted-foreground">Dias no programa</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-card border border-border text-center">
            <Award className="h-6 w-6 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{completedDays}</p>
            <p className="text-sm text-muted-foreground">Dias completos</p>
          </div>
        </div>

        {/* Current Measurements */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Medidas Actuais</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowAddMeasurement(!showAddMeasurement)}>
              <Plus className="h-4 w-4 mr-1" />
              Actualizar
            </Button>
          </div>

          {showAddMeasurement && (
            <div className="mb-4 p-4 bg-muted/50 rounded-xl space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Peso (kg)</label>
                <input type="number" value={newMeasurement.weight}
                  onChange={(e) => setNewMeasurement({ ...newMeasurement, weight: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Ex: 65" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Cintura (cm)</label>
                  <input type="number" value={newMeasurement.waist}
                    onChange={(e) => setNewMeasurement({ ...newMeasurement, waist: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Ex: 75" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Quadril (cm)</label>
                  <input type="number" value={newMeasurement.hip}
                    onChange={(e) => setNewMeasurement({ ...newMeasurement, hip: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Ex: 100" />
                </div>
              </div>
              <Button variant="warm" className="w-full" onClick={handleAddMeasurement}>Guardar Medidas</Button>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-terracotta-light flex items-center justify-center">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peso</p>
                  <p className="font-semibold text-foreground">{latestMeasurement.weight || profile?.weight || '—'} kg</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendIcon value={weightChange} />
                <span className={cn('text-sm font-medium',
                  weightChange && weightChange < 0 ? 'text-sage-dark' : weightChange && weightChange > 0 ? 'text-primary' : 'text-muted-foreground'
                )}>{formatChange(weightChange, 'kg')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center">
                  <Ruler className="h-5 w-5 text-sage-dark" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cintura</p>
                  <p className="font-semibold text-foreground">{latestMeasurement.waist || profile?.waist || '—'} cm</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendIcon value={waistChange} />
                <span className={cn('text-sm font-medium',
                  waistChange && waistChange < 0 ? 'text-sage-dark' : waistChange && waistChange > 0 ? 'text-destructive' : 'text-muted-foreground'
                )}>{formatChange(waistChange, 'cm')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
                  <Target className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quadril</p>
                  <p className="font-semibold text-foreground">{latestMeasurement.hip || profile?.hip || '—'} cm</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendIcon value={hipChange} />
                <span className={cn('text-sm font-medium',
                  hipChange && hipChange > 0 ? 'text-sage-dark' : hipChange && hipChange < 0 ? 'text-destructive' : 'text-muted-foreground'
                )}>{formatChange(hipChange, 'cm')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Measurement History */}
        {measurements.length > 0 && (
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
            <h2 className="font-display font-semibold text-foreground mb-4">Histórico de Medidas</h2>
            <div className="space-y-3">
              {measurements.slice(0, 5).map((data) => (
                <div key={data.date} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">
                    {new Date(data.date).toLocaleDateString('pt-MZ', { day: 'numeric', month: 'short' })}
                  </span>
                  <div className="flex items-center gap-4 text-sm">
                    {data.weight && <span className="text-foreground">{data.weight}kg</span>}
                    {data.waist && <span className="text-foreground">{data.waist}cm</span>}
                    {data.hip && <span className="text-foreground">{data.hip}cm</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Card */}
        <div className="bg-gradient-to-br from-primary to-gold rounded-2xl p-5 text-primary-foreground shadow-warm">
          <h3 className="font-display font-semibold mb-2">Continua Assim! 🌟</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Lembra-te: cada pequeno passo conta. A transformação não acontece da noite para o dia, 
            mas com consistência, vais alcançar os teus objectivos. O teu corpo está a agradecer-te!
          </p>
        </div>
      </div>
    </Layout>
  );
}
