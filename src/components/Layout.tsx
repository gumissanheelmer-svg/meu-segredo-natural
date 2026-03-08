import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Dumbbell, TrendingUp, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InstallBanner } from '@/components/InstallBanner';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Início' },
  { path: '/receitas', icon: Utensils, label: 'Receitas' },
  { path: '/exercicios', icon: Dumbbell, label: 'Exercícios' },
  { path: '/progresso', icon: TrendingUp, label: 'Progresso' },
  { path: '/perfil', icon: User, label: 'Perfil' },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="font-display text-lg font-semibold text-foreground">
            Beleza Natural
          </h1>
        </div>
      </header>

      {/* Install Banner */}
      <InstallBanner />

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border/50">
        <div className="container max-w-lg mx-auto">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 transition-transform duration-300',
                      isActive && 'scale-110'
                    )}
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute -top-0.5 w-8 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
