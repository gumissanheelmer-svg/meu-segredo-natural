

# Plano: Transformar o App numa PWA compatível com PWABuilder

## Resumo
Instalar e configurar o plugin `vite-plugin-pwa` para gerar automaticamente o service worker e o manifesto Web App, tornando o app instalável e compatível com o PWABuilder.

## O Que Será Feito

### 1. Instalar dependência
- `vite-plugin-pwa`

### 2. Criar ícones PWA
- Criar ícones PNG em `public/` nos tamanhos 192x192 e 512x512 (SVG gerado como placeholder com as cores do app)

### 3. Configurar `vite.config.ts`
- Adicionar `VitePWA` com:
  - `registerType: 'autoUpdate'`
  - Manifesto completo (nome, cores, ícones, display: standalone)
  - `navigateFallbackDenylist: [/^\/~oauth/]` para não interferir com autenticação
  - Workbox runtime caching

### 4. Atualizar `index.html`
- Adicionar meta tags mobile (theme-color, apple-mobile-web-app-capable, apple-touch-icon)
- Atualizar título para "Meu Segredo Natural"

### 5. Criar página `/install`
- Página simples com instruções de instalação e botão para acionar o prompt de instalação do browser

## Ficheiros a Criar/Alterar
- `vite.config.ts` — adicionar plugin PWA
- `index.html` — meta tags mobile + título
- `public/icon-192.svg` e `public/icon-512.svg` — ícones PWA
- `src/pages/Install.tsx` — página de instalação
- `src/App.tsx` — adicionar rota `/install`
- `package.json` — nova dependência

## Resultado
O app ficará instalável no telemóvel, funcionará offline, e o link poderá ser colado no PWABuilder para gerar pacotes nativos (Microsoft Store, Google Play, etc).

