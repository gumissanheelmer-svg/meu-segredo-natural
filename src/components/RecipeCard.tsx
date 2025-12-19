import { Recipe } from '@/types/app';
import { Clock, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const isBumbum = recipe.category === 'bumbum';
  
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
          {isBumbum ? '🍌' : '🍋'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground mb-1 truncate">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {recipe.bestTime}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Leaf className="h-3.5 w-3.5 text-sage-dark" />
            <span className="text-xs text-sage-dark font-medium">
              {recipe.ingredients.length} ingredientes
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
