import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.string().trim().email('Email inválido').max(255);

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      toast.error('Erro ao enviar email de recuperação');
    } else {
      setSent(true);
      toast.success('Email de recuperação enviado!');
    }
  };

  if (sent) {
    return (
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-secondary-foreground" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">Email Enviado!</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Verifica a tua caixa de entrada e segue as instruções para redefinir a tua senha.
        </p>
        <Button variant="outline" onClick={onBack} className="w-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao login
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>

      <h3 className="font-display text-xl font-bold text-foreground mb-1">Esqueceu a senha?</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Insere o teu email e enviaremos instruções para redefinir a tua senha.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="exemplo@email.com"
              required
            />
          </div>
        </div>
        <Button variant="warm" className="w-full" disabled={loading}>
          {loading ? 'A enviar...' : 'Enviar Email de Recuperação'}
        </Button>
      </form>
    </div>
  );
}
