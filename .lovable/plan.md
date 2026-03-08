

# Plano: PWA Completa com Ícones Múltiplos e Banner de Instalação

## Situação Atual
A app já tem `vite-plugin-pwa` configurado com manifesto válido, service worker Workbox, e ícones 192x192 e 512x512. Faltam: ícones em tamanhos intermédios (48, 72, 96, 128, 144, 152, 384) e um banner de instalação visível ao utilizador.

## O que será feito

### 1. Adicionar ícones em todos os tamanhos ao manifesto
Como só existem dois ficheiros de ícone reais (192 e 512), vamos referenciar esses dois nos tamanhos pedidos pelo PWABuilder. O ícone de 192px será usado para tamanhos ≤192 e o de 512px para tamanhos maiores. Isto é válido — o browser redimensiona automaticamente. Adicionamos todas as entradas no array `icons` do manifesto no `vite.config.ts`.

### 2. Separar `purpose` dos ícones
PWABuilder recomenda ícones separados para `any` e `maskable`. Vamos duplicar as entradas: uma com `purpose: "any"` e outra com `purpose: "maskable"` para os tamanhos principais (192 e 512).

### 3. Criar componente `InstallBanner.tsx`
Banner compacto e fixo (abaixo do header) que:
- Captura `beforeinstallprompt` para instalação directa (Android/Chrome)
- No iOS mostra instruções de "Adicionar ao Ecrã Inicial"
- Esconde-se se a app já estiver instalada (standalone)
- Botão de fechar com persistência em `localStorage`

### 4. Adicionar `InstallBanner` ao `Layout.tsx`
Inserir o componente entre o header e o conteúdo principal.

## Ficheiros
- **Editar:** `vite.config.ts` — expandir array de ícones, separar purpose
- **Criar:** `src/components/InstallBanner.tsx`
- **Editar:** `src/components/Layout.tsx` — importar e renderizar InstallBanner

