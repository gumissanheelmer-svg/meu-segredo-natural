

# Plano: Migrar Backend para Lovable Cloud

## Situação Actual
O app já tem autenticação e tabelas (`profiles`, `daily_progress`) criadas no backend. No entanto, as páginas **Dashboard**, **DailyChecklist** e **Progress** ainda usam `localStorage` para ler/guardar dados em vez da base de dados. O backend está pronto mas não está a ser usado.

## O Que Falta Fazer

### 1. Migrar DailyChecklist para a base de dados
- Substituir `useDailyProgress()` (localStorage) por queries à tabela `daily_progress`
- Ao marcar/desmarcar um item do checklist, fazer upsert na tabela `daily_progress` (usando `user_id` + `date` como chave)
- Carregar o estado do checklist do dia actual da base de dados ao montar

### 2. Migrar Dashboard para a base de dados
- Carregar perfil da usuária da tabela `profiles` em vez de localStorage
- Calcular streak a partir de registos `daily_progress` da base de dados
- Usar o nome e objectivo do perfil na base de dados

### 3. Migrar Progress para a base de dados
- Carregar histórico de medidas da tabela `daily_progress`
- Guardar novas medidas (peso, cintura, quadril) na tabela `daily_progress`
- Carregar medidas iniciais da tabela `profiles`
- Calcular dias completos a partir da base de dados

### 4. Migrar Profile para a base de dados
- Já carrega parcialmente do DB (`dbProfile`), mas o reset e outras operações ainda usam localStorage
- Limpar dependências de localStorage restantes

### 5. Adicionar trigger de updated_at (em falta)
- A função `update_updated_at()` existe mas não tem triggers associados
- Criar triggers para `profiles` e `daily_progress`

## Ficheiros a Alterar
- `src/components/DailyChecklist.tsx` — reescrever para usar Supabase
- `src/pages/Dashboard.tsx` — substituir localStorage por queries DB
- `src/pages/Progress.tsx` — substituir localStorage por queries DB
- `src/pages/Profile.tsx` — limpar uso de localStorage
- Migration SQL — adicionar triggers de `updated_at`

## Resultado
Todos os dados da usuária ficam persistidos na base de dados, sincronizados entre dispositivos, e protegidos por RLS.

