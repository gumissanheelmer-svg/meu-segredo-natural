

# Plano: Corrigir Manifesto PWA para PWABuilder

## Problema
O `vite-plugin-pwa` está a gerar o manifesto mas remove campos como `id` e `screenshots` porque não os suporta nativamente. O PWABuilder precisa desses campos para validar a PWA.

## Solução
Criar um ficheiro `public/manifest.webmanifest` estático com todos os campos necessários, e configurar o `vite-plugin-pwa` para não gerar o seu próprio manifesto (`manifest: false`). Adicionar manualmente o `<link rel="manifest">` no `index.html`.

## Ficheiros a Alterar

### 1. `public/manifest.webmanifest` (criar)
- Manifesto completo com `id`, `screenshots`, `icons`, `display`, etc.

### 2. `vite.config.ts`
- Remover a secção `manifest` do plugin e definir `manifest: false`
- Manter o workbox e service worker

### 3. `index.html`
- Adicionar `<link rel="manifest" href="/manifest.webmanifest">`

## Resultado
O PWABuilder conseguirá ler o manifesto completo com todos os campos obrigatórios.

