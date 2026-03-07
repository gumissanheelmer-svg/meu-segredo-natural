import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Onboarding from './Onboarding';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('onboarding_complete')
        .eq('id', user.id)
        .single();

      if (data?.onboarding_complete) {
        setOnboardingDone(true);
        navigate('/dashboard');
      } else {
        setLoading(false);
      }
    };

    checkProfile();
  }, [user, navigate]);

  if (loading && !onboardingDone) {
    if (onboardingDone) return null;
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <Onboarding />;
};

export default Index;
