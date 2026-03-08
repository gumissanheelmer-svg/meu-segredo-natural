

# Plano: Corrigir Tipos dos Ícones no Manifesto PWA

## Problema
O PWABuilder diz "Fix the icon types in your web manifest." — isto acontece porque os ficheiros `icon-192.png` e `icon-512.png` foram gerados como SVG (conteúdo SVG) mas guardados com extensão `.png`. O PWABuilder valida o conteúdo real do ficheiro e detecta que não são PNGs verdadeiros.

## Solução
Regenerar os ícones como ficheiros PNG reais (não SVGs renomeados). Vou criar ícones PNG válidos usando canvas/data URI encoding para garantir que o conteúdo binário é PNG genuíno.

## Ficheiros a Alterar
- `public/icon-192.png` — substituir por PNG real
- `public/icon-512.png` — substituir por PNG real

## Resultado
Os ícones serão PNGs válidos, o PWABuilder deixará de reportar o erro de tipos.

