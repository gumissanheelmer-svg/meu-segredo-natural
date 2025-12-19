import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingComplete } from '@/hooks/useLocalStorage';
import Onboarding from './Onboarding';

const Index = () => {
  const navigate = useNavigate();
  const [onboardingComplete] = useOnboardingComplete();

  useEffect(() => {
    if (onboardingComplete) {
      navigate('/dashboard');
    }
  }, [onboardingComplete, navigate]);

  if (onboardingComplete) {
    return null;
  }

  return <Onboarding />;
};

export default Index;
