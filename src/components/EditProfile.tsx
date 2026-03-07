import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Save } from 'lucide-react';
import { toast } from 'sonner';

interface EditProfileProps {
  profile: any;
  onBack: () => void;
  onSaved: (updated: any) => void;
  userId: string;
}

const goalOptions = [
  { value: 'bumbum', label: 'Aumentar o Bumbum' },
  { value: 'cintura', label: 'Afinar a Cintura' },
  { value: 'ambos', label: 'Ambos os Objectivos' },
];

const activityOptions = [
  { value: 'sedentaria', label: 'Sedentária' },
  { value: 'moderada', label: 'Moderada' },
  { value: 'ativa', label: 'Activa' },
];

export function EditProfile({ profile, onBack, onSaved, userId }: EditProfileProps) {
  const [name, setName] = useState(profile?.name || '');
  const [age, setAge] = useState(profile?.age?.toString() || '');
  const [height, setHeight] = useState(profile?.height?.toString() || '');
  const [weight, setWeight] = useState(profile?.weight?.toString() || '');
  const [waist, setWaist] = useState(profile?.waist?.toString() || '');
  const [hip, setHip] = useState(profile?.hip?.toString() || '');
  const [goal, setGoal] = useState(profile?.goal || 'ambos');
  const [activityLevel, setActivityLevel] = useState(profile?.activity_level || 'moderada');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('O nome é obrigatório');
      return;
    }
    setSaving(true);
    const updates = {
      name: name.trim(),
      age: age ? parseInt(age) : null,
      height: height ? parseFloat(height) : null,
      weight: weight ? parseFloat(weight) : null,
      waist: waist ? parseFloat(waist) : null,
      hip: hip ? parseFloat(hip) : null,
      goal,
      activity_level: activityLevel,
    };

    const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
    setSaving(false);

    if (error) {
      toast.error('Erro ao guardar alterações');
    } else {
      toast.success('Perfil actualizado! ✨');
      onSaved({ ...profile, ...updates });
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ChevronRight className="h-4 w-4 rotate-180" /> Voltar ao perfil
      </button>

      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Editar Perfil</h1>
        <p className="text-muted-foreground text-sm">Actualiza as tuas informações</p>
      </div>

      <div className="bg-card rounded-2xl p-5 shadow-card border border-border space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Nome</label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="O teu nome" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Idade</label>
          <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Ex: 25" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Altura (cm)</label>
            <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Ex: 165" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Peso (kg)</label>
            <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ex: 60" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Cintura (cm)</label>
            <Input type="number" value={waist} onChange={e => setWaist(e.target.value)} placeholder="Ex: 70" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Quadril (cm)</label>
            <Input type="number" value={hip} onChange={e => setHip(e.target.value)} placeholder="Ex: 95" />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 shadow-card border border-border space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Objectivo</label>
          <div className="space-y-2">
            {goalOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setGoal(opt.value)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                  goal === opt.value
                    ? 'border-primary bg-primary/10 text-foreground font-medium'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Nível de Actividade</label>
          <div className="space-y-2">
            {activityOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setActivityLevel(opt.value)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                  activityLevel === opt.value
                    ? 'border-primary bg-primary/10 text-foreground font-medium'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={handleSave} disabled={saving}>
        <Save className="h-4 w-4 mr-2" /> {saving ? 'A guardar...' : 'Guardar Alterações'}
      </Button>
    </div>
  );
}
