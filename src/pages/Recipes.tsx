import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { RecipeCard } from '@/components/RecipeCard';
import { recipes, getRecipesByCategory } from '@/data/recipes';
import { Recipe } from '@/types/app';
import { useProfile } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Leaf, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = 'all' | 'bumbum' | 'cintura';

export default function Recipes() {
  const [profile] = useProfile();
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    profile?.goal === 'bumbum' ? 'bumbum' : 
    profile?.goal === 'cintura' ? 'cintura' : 'all'
  );
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : getRecipesByCategory(selectedCategory);

  const categories = [
    { id: 'all' as Category, label: 'Todas', emoji: '✨' },
    { id: 'bumbum' as Category, label: 'Bumbum', emoji: '🍑' },
    { id: 'cintura' as Category, label: 'Cintura', emoji: '🔥' },
  ];

  if (selectedRecipe) {
    return (
      <Layout>
        <div className="animate-fade-in">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar às receitas
          </button>

          <div className={cn(
            'w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto',
            selectedRecipe.category === 'bumbum' ? 'bg-terracotta-light' : 'bg-sage'
          )}>
            {selectedRecipe.category === 'bumbum' ? '🍌' : '🍋'}
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            {selectedRecipe.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {selectedRecipe.bestTime}
            </span>
            <span className="flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              {selectedRecipe.ingredients.length} ingredientes
            </span>
          </div>

          <div className="space-y-6">
            {/* Ingredients */}
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
              <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-lg">🛒</span>
                Ingredientes
              </h2>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation */}
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
              <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-lg">👩‍🍳</span>
                Modo de Preparo
              </h2>
              <p className="text-foreground leading-relaxed">
                {selectedRecipe.preparation}
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
              <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gold" />
                Benefícios
              </h2>
              <ul className="space-y-2">
                {selectedRecipe.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sage-dark text-xs">✓</span>
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tip */}
            <div className="bg-gold-light/30 rounded-2xl p-5 border border-gold-light">
              <p className="text-foreground text-sm">
                <span className="font-semibold">💡 Dica:</span> A consistência é a chave! 
                Usa esta receita regularmente para melhores resultados.
              </p>
            </div>
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
            Receitas Naturais
          </h1>
          <p className="text-muted-foreground">
            Ingredientes simples, resultados incríveis
          </p>
        </div>

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

        {/* Recipe List */}
        <div className="space-y-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-sage/30 rounded-2xl p-5 border border-sage">
          <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
            <Leaf className="h-4 w-4 text-sage-dark" />
            Dica de Ouro
          </h3>
          <p className="text-foreground text-sm leading-relaxed">
            Todas as receitas usam ingredientes naturais que podes encontrar no mercado local 
            ou no teu próprio quintal. Evita produtos químicos e abraça a sabedoria tradicional moçambicana.
          </p>
        </div>
      </div>
    </Layout>
  );
}
