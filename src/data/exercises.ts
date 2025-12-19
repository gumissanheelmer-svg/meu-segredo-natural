import { Exercise } from '@/types/app';

export const exercises: Exercise[] = [
  // Exercícios para Bumbum
  {
    id: 'agachamento-simples',
    title: 'Agachamento Simples',
    category: 'bumbum',
    description: 'Fique de pé com os pés à largura dos ombros. Dobre os joelhos e desça como se fosse sentar numa cadeira invisível. Mantenha as costas rectas e os joelhos alinhados com os dedos dos pés. Suba devagar apertando o bumbum.',
    duration: '10 minutos',
    repetitions: '3 séries de 15 repetições'
  },
  {
    id: 'subir-escadas',
    title: 'Subir Escadas',
    category: 'bumbum',
    description: 'Suba escadas de forma controlada, focando em empurrar com o calcanhar. Se não tiver escadas, use um degrau ou banco baixo. Alterne as pernas e mantenha a postura erecta.',
    duration: '15 minutos',
    repetitions: '2-3 vezes por dia'
  },
  {
    id: 'elevacao-quadril',
    title: 'Elevação de Quadril',
    category: 'bumbum',
    description: 'Deite-se de barriga para cima com os joelhos dobrados e os pés apoiados no chão. Levante o quadril contraindo o bumbum até formar uma linha recta dos ombros aos joelhos. Desça devagar.',
    duration: '8 minutos',
    repetitions: '3 séries de 20 repetições'
  },
  {
    id: 'agachamento-isometrico',
    title: 'Agachamento Isométrico',
    category: 'bumbum',
    description: 'Encoste as costas na parede e desca até as coxas ficarem paralelas ao chão. Mantenha a posição o máximo que conseguir. Aperte o bumbum durante todo o exercício.',
    duration: '5 minutos',
    repetitions: 'Manter 30-60 segundos, 3 vezes'
  },
  // Exercícios para Cintura
  {
    id: 'torcoes-pe',
    title: 'Torções em Pé',
    category: 'cintura',
    description: 'Fique de pé com os pés à largura dos ombros. Coloque as mãos na cintura ou atrás da cabeça. Rode o tronco para a direita e depois para a esquerda, mantendo o quadril fixo.',
    duration: '8 minutos',
    repetitions: '3 séries de 20 rotações (cada lado)'
  },
  {
    id: 'danca-tradicional',
    title: 'Danças Tradicionais Moçambicanas',
    category: 'cintura',
    description: 'Dance ao som de marrabenta ou outras músicas moçambicanas. Movimente a cintura e o quadril ao ritmo da música. Este exercício queima calorias enquanto celebra a nossa cultura!',
    duration: '20 minutos',
    repetitions: 'Diariamente'
  },
  {
    id: 'caminhada',
    title: 'Caminhada Diária',
    category: 'cintura',
    description: 'Caminhe em ritmo moderado a rápido. Mantenha a postura erecta e balance os braços naturalmente. Pode fazer ao ar livre ou mesmo em casa, andando no mesmo lugar.',
    duration: '30 minutos',
    repetitions: 'Uma vez por dia'
  },
  {
    id: 'respiracao-abdominal',
    title: 'Respiração Abdominal',
    category: 'cintura',
    description: 'Sente-se ou deite-se confortavelmente. Inspire profundamente expandindo a barriga. Expire lentamente contraindo o abdómen, puxando o umbigo em direcção à coluna. Repita calmamente.',
    duration: '5 minutos',
    repetitions: '10-15 respirações profundas, 2 vezes ao dia'
  }
];

export const getExercisesByCategory = (category: 'bumbum' | 'cintura') => {
  return exercises.filter(exercise => exercise.category === category);
};

export const getExerciseById = (id: string) => {
  return exercises.find(exercise => exercise.id === id);
};

export const weeklyPlan = [
  { day: 'Segunda-feira', bumbum: ['agachamento-simples', 'elevacao-quadril'], cintura: ['torcoes-pe', 'respiracao-abdominal'] },
  { day: 'Terça-feira', bumbum: ['subir-escadas'], cintura: ['caminhada', 'danca-tradicional'] },
  { day: 'Quarta-feira', bumbum: ['agachamento-isometrico', 'agachamento-simples'], cintura: ['torcoes-pe', 'respiracao-abdominal'] },
  { day: 'Quinta-feira', bumbum: ['elevacao-quadril', 'subir-escadas'], cintura: ['danca-tradicional'] },
  { day: 'Sexta-feira', bumbum: ['agachamento-simples', 'agachamento-isometrico'], cintura: ['caminhada', 'torcoes-pe'] },
  { day: 'Sábado', bumbum: ['elevacao-quadril'], cintura: ['danca-tradicional', 'respiracao-abdominal'] },
  { day: 'Domingo', bumbum: [], cintura: ['caminhada'] }
];
