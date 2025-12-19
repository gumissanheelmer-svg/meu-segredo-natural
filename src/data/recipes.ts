import { Recipe } from '@/types/app';

export const recipes: Recipe[] = [
  // Receitas para Bumbum
  {
    id: 'papinha-banana',
    title: 'Papinha de Banana com Farinha de Milho',
    category: 'bumbum',
    ingredients: [
      '2 bananas maduras',
      '3 colheres de farinha de milho',
      '1 copo de leite ou água',
      'Mel a gosto (opcional)'
    ],
    preparation: 'Amasse as bananas num recipiente. Adicione a farinha de milho e misture bem. Junte o leite ou água aos poucos até obter uma consistência cremosa. Adicione mel se desejar. Consuma imediatamente.',
    bestTime: 'Pequeno-almoço ou lanche da tarde',
    benefits: [
      'Rica em hidratos de carbono para energia',
      'Ajuda no ganho de massa muscular',
      'Fonte natural de potássio',
      'Fácil digestão'
    ]
  },
  {
    id: 'creme-abacate',
    title: 'Creme de Abacate com Óleo de Coco',
    category: 'bumbum',
    ingredients: [
      '1 abacate maduro',
      '2 colheres de óleo de coco',
      '1 colher de mel (opcional)'
    ],
    preparation: 'Retire a polpa do abacate e amasse bem. Misture com o óleo de coco até formar um creme homogéneo. Aplique na região do bumbum com movimentos circulares durante 10-15 minutos. Deixe actuar por 30 minutos e depois lave.',
    bestTime: 'À noite antes de dormir',
    benefits: [
      'Hidrata profundamente a pele',
      'Estimula a circulação local',
      'Rico em vitamina E',
      'Ajuda a tonificar a pele'
    ]
  },
  {
    id: 'smoothie-energia',
    title: 'Smoothie de Banana, Abacate e Milho',
    category: 'bumbum',
    ingredients: [
      '1 banana madura',
      'Meio abacate',
      '2 colheres de farinha de milho',
      '1 copo de leite',
      'Canela a gosto'
    ],
    preparation: 'Bata todos os ingredientes no liquidificador até obter um smoothie cremoso. Adicione um pouco de canela por cima. Beba logo após preparar.',
    bestTime: 'Após o exercício físico',
    benefits: [
      'Combinação perfeita para ganho de massa',
      'Fornece proteínas e hidratos',
      'Sacia a fome por horas',
      'Delicioso e nutritivo'
    ]
  },
  // Receitas para Cintura
  {
    id: 'cha-gengibre',
    title: 'Chá de Gengibre e Limão',
    category: 'cintura',
    ingredients: [
      '1 pedaço de gengibre fresco (3cm)',
      'Sumo de meio limão',
      '1 copo de água quente',
      'Mel a gosto (opcional)'
    ],
    preparation: 'Rale ou corte o gengibre em fatias finas. Ferva a água e adicione o gengibre. Deixe em infusão por 5-10 minutos. Coe, adicione o sumo de limão e o mel. Beba ainda morno.',
    bestTime: 'Em jejum, logo ao acordar',
    benefits: [
      'Acelera o metabolismo',
      'Ajuda na digestão',
      'Reduz inchaço abdominal',
      'Desintoxica o organismo'
    ]
  },
  {
    id: 'agua-detox',
    title: 'Água Detox de Pepino e Limão',
    category: 'cintura',
    ingredients: [
      '1 pepino médio',
      '1 limão',
      '1 litro de água',
      'Folhas de hortelã (opcional)'
    ],
    preparation: 'Corte o pepino e o limão em rodelas finas. Coloque numa jarra com água. Adicione as folhas de hortelã. Deixe repousar no frigorífico por pelo menos 2 horas. Beba ao longo do dia.',
    bestTime: 'Durante todo o dia',
    benefits: [
      'Hidratação profunda',
      'Elimina toxinas',
      'Reduz a retenção de líquidos',
      'Refrescante e saudável'
    ]
  },
  {
    id: 'cha-verde-vinagre',
    title: 'Chá Verde com Vinagre de Maçã',
    category: 'cintura',
    ingredients: [
      '1 saqueta de chá verde',
      '1 colher de vinagre de maçã',
      '1 copo de água quente',
      'Mel ou limão a gosto'
    ],
    preparation: 'Prepare o chá verde normalmente. Deixe arrefecer um pouco. Adicione o vinagre de maçã e misture bem. Pode adicionar mel ou limão para suavizar o sabor.',
    bestTime: '20 minutos antes das refeições principais',
    benefits: [
      'Reduz a absorção de gordura',
      'Controla o apetite',
      'Rico em antioxidantes',
      'Melhora a digestão'
    ]
  }
];

export const getRecipesByCategory = (category: 'bumbum' | 'cintura') => {
  return recipes.filter(recipe => recipe.category === category);
};

export const getRecipeById = (id: string) => {
  return recipes.find(recipe => recipe.id === id);
};
