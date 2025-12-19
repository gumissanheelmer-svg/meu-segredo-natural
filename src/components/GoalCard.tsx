import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface GoalCardProps {
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

export function GoalCard({ title, description, icon, selected, onClick }: GoalCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left',
        'hover:shadow-warm hover:-translate-y-1',
        selected
          ? 'border-primary bg-primary/5 shadow-warm'
          : 'border-border bg-card hover:border-primary/50'
      )}
    >
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
}
