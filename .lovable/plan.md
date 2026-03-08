

# Plano: Banner de Instalação do App (PWA)

## O que vai ser feito
Criar um banner/notificação que aparece automaticamente nas páginas da app (dentro do Layout) a sugerir ao utilizador instalar o aplicativo no telemóvel. O banner só aparece se a app ainda não estiver instalada e pode ser fechado pelo utilizador.

## Alterações

### 1. Criar componente `InstallBanner.tsx`
- Banner fixo no topo (abaixo do header) com botão "Instalar App"
- Detecta o evento `beforeinstallprompt` (Android/Chrome) para instalar diretamente
- No iOS, mostra instruções de como adicionar ao ecrã inicial
- Esconde-se se a app já estiver instalada (standalone mode)
- Botão de fechar que guarda no localStorage para não voltar a aparecer
- Design compacto e visualmente coerente com o tema da app

### 2. Adicionar o `InstallBanner` ao `Layout.tsx`
- Inserir o componente logo abaixo do header para ser visível em todas as páginas protegidas

## Ficheiros
- **Criar:** `src/components/InstallBanner.tsx`
- **Editar:** `src/components/Layout.tsx` (importar e usar o banner)

