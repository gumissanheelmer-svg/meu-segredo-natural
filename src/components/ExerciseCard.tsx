import { Exercise } from '@/types/app';
import { Clock, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick: () => void;
}

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const isBumbum = exercise.category === 'bumbum';
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-5 rounded-2xl border border-border bg-card',
        'transition-all duration-300 hover:shadow-warm hover:-translate-y-1',
        'text-left group'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
            'transition-transform duration-300 group-hover:scale-110',
            isBumbum ? 'bg-terracotta-light' : 'bg-sage'
          )}
        >
          {isBumbum ? '🍑' : '🔥'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground mb-1">
            {exercise.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {exercise.duration}
            </span>
            <span className="flex items-center gap-1">
              <Repeat className="h-3.5 w-3.5" />
              {exercise.repetitions}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
