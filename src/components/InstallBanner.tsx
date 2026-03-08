import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X, Share } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (localStorage.getItem('pwa-banner-dismissed')) return;

    const iosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iosDevice);

    if (iosDevice) {
      setShow(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setShow(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-3">
      <div className="container max-w-lg mx-auto flex items-center gap-3">
        <Download className="h-5 w-5 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            Instala o app no teu telemóvel!
          </p>
        </div>

        {isIOS ? (
          <Button size="sm" variant="outline" onClick={() => setShowIOSTip(!showIOSTip)} className="shrink-0">
            <Share className="h-4 w-4 mr-1" />
            Como?
          </Button>
        ) : (
          <Button size="sm" onClick={handleInstall} className="shrink-0">
            Instalar
          </Button>
        )}

        <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground p-1">
          <X className="h-4 w-4" />
        </button>
      </div>

      {showIOSTip && isIOS && (
        <div className="container max-w-lg mx-auto mt-2 text-xs text-muted-foreground space-y-1">
          <p>1. Toca no ícone <Share className="inline h-3 w-3" /> de Partilhar</p>
          <p>2. Seleciona "Adicionar ao Ecrã Inicial"</p>
          <p>3. Confirma tocando em "Adicionar"</p>
        </div>
      )}
    </div>
  );
}
