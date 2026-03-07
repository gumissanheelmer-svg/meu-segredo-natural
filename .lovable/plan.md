

# Plano: Módulo de Login e Autenticação

## Resumo
Adicionar autenticação completa com login, registro, recuperação de senha e login social (Google), integrado ao fluxo existente do app. Os dados de perfil e progresso serão persistidos na base de dados em vez de localStorage.

## Alterações na Base de Dados

Criar duas tabelas e infraestrutura:

1. **`profiles`** — armazena dados do perfil da usuária (nome, idade, altura, peso, medidas, objetivo, nível de atividade, data de início)
2. **`daily_progress`** — armazena o checklist diário e medidas (peso, cintura, quadril, receita, exercício, água, açúcar)
3. **Trigger `handle_new_user`** — cria automaticamente um perfil vazio quando uma nova usuária se regista
4. **Políticas RLS** — cada usuária só pode ver/editar os seus próprios dados

## Novas Páginas e Componentes

1. **`src/pages/Auth.tsx`** — página de login/registro com:
   - Abas "Entrar" e "Criar Conta"
   - Campos: email, senha (e nome + confirmação no registro)
   - Login social com Google (gerido automaticamente pelo Lovable Cloud)
   - Link "Esqueci minha senha"
   - Mensagem de boas-vindas cultural
   - Validação com zod

2. **`src/pages/ResetPassword.tsx`** — página para definir nova senha após recuperação

3. **`src/components/ForgotPassword.tsx`** — modal/formulário para solicitar recuperação de senha

4. **`src/contexts/AuthContext.tsx`** — contexto de autenticação com:
   - Estado da sessão (`onAuthStateChange` + `getSession`)
   - Funções: login, registro, logout, resetPassword
   - Provider que envolve toda a app

5. **`src/components/ProtectedRoute.tsx`** — componente que redireciona para `/auth` se não autenticada

## Alterações em Ficheiros Existentes

- **`src/App.tsx`** — envolver com `AuthProvider`, adicionar rotas `/auth` e `/reset-password`, proteger rotas existentes com `ProtectedRoute`
- **`src/pages/Index.tsx`** — verificar sessão autenticada em vez de apenas localStorage
- **`src/hooks/useLocalStorage.ts`** — manter como fallback, mas criar novos hooks que sincronizam com a base de dados
- **`src/pages/Profile.tsx`** — adicionar botão de logout
- **`src/pages/Onboarding.tsx`** — salvar perfil na base de dados após completar

## Fluxo da Usuária

```text
App abre → Verifica sessão
  ├─ Sem sessão → Página de Login/Registro
  │   ├─ Login → Dashboard
  │   └─ Registro → Onboarding → Dashboard
  └─ Com sessão
      ├─ Sem perfil completo → Onboarding
      └─ Com perfil → Dashboard
```

## Detalhes Técnicos

- Confirmação de email desativada (para facilitar o acesso, conforme o público-alvo)
- Google OAuth gerido automaticamente pelo Lovable Cloud
- Sessão persistente até logout
- Mensagem motivacional após login: "Hoje é o dia de cuidar de você! 🌸"

