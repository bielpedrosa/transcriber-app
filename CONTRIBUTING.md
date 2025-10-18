# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Transcriber App! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Guia de Estilo](#guia-de-estilo)
- [Commits](#commits)

## 📜 Código de Conduta

### Nosso Compromisso

Estamos comprometidos em proporcionar uma experiência acolhedora e livre de assédio para todos, independentemente de:
- Experiência
- Identidade e expressão de gênero
- Orientação sexual
- Deficiência
- Aparência pessoal
- Raça
- Etnia
- Idade
- Religião
- Nacionalidade

### Comportamentos Esperados

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

### Comportamentos Inaceitáveis

- Uso de linguagem ou imagens sexualizadas
- Comentários insultuosos ou depreciativos
- Assédio público ou privado
- Publicação de informações privadas de outros sem permissão
- Outras condutas consideradas inapropriadas

## 🎯 Como Posso Contribuir?

### 🐛 Reportar Bugs

Antes de criar um relatório de bug:
1. Verifique se o bug já não foi reportado nas [Issues](https://github.com/seu-usuario/transcriber-app/issues)
2. Use a versão mais recente do projeto
3. Colete o máximo de informações possível

**Ao reportar, inclua:**
- Título claro e descritivo
- Passos detalhados para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Informações do ambiente:
  - SO e versão
  - Versão do Node.js
  - Versão do navegador
  - Logs de erro

### 💡 Sugerir Melhorias

Para sugerir uma melhoria:
1. Use a tag `enhancement`
2. Forneça um título claro
3. Descreva detalhadamente a funcionalidade
4. Explique por que seria útil
5. Liste possíveis implementações (opcional)

### 🔧 Pull Requests

1. **Fork e Clone**
   ```bash
   git clone https://github.com/seu-usuario/transcriber-app.git
   cd transcriber-app
   ```

2. **Crie uma Branch**
   ```bash
   git checkout -b feature/nome-da-feature
   # ou
   git checkout -b fix/nome-do-fix
   ```

3. **Faça suas Alterações**
   - Escreva código limpo e bem documentado
   - Adicione testes se aplicável
   - Atualize a documentação

4. **Teste Localmente**
   ```bash
   npm install
   npm start
   # Teste todas as funcionalidades afetadas
   ```

5. **Commit**
   ```bash
   git add .
   git commit -m "Add: nova funcionalidade X"
   ```

6. **Push**
   ```bash
   git push origin feature/nome-da-feature
   ```

7. **Abra um Pull Request**
   - Vá até o repositório original no GitHub
   - Clique em "New Pull Request"
   - Selecione sua branch
   - Preencha o template

## 🛠️ Processo de Desenvolvimento

### Setup do Ambiente

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/transcriber-app.git
cd transcriber-app

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env
# Adicione sua GEMINI_API_KEY no .env

# 4. Inicie o servidor de desenvolvimento
npm start
```

### Estrutura do Projeto

```
transcriber_app/
├── server.js           # Backend Express
├── public/
│   ├── index.html     # Interface
│   ├── app.js         # Lógica principal
│   ├── cache.js       # Sistema de cache
│   └── audio-worker.js # Web Worker
├── .env               # Variáveis (não commitar!)
└── package.json       # Dependências
```

### Áreas de Contribuição

#### 🎨 Frontend
- Melhorias na UI/UX
- Responsividade
- Acessibilidade
- Novos temas

#### ⚙️ Backend
- Otimizações de performance
- Novos endpoints
- Segurança
- Tratamento de erros

#### 📚 Documentação
- Melhorias no README
- Tutoriais
- Exemplos de uso
- Tradução para outros idiomas

#### 🧪 Testes
- Testes unitários
- Testes de integração
- Testes E2E

#### 🚀 Novas Features
- Novos idiomas
- Formatos de exportação
- Integrações com outras APIs

## 📝 Guia de Estilo

### JavaScript

```javascript
// Use const/let (não var)
const apiKey = process.env.API_KEY;
let counter = 0;

// Nomes descritivos
function transcribeAudioChunk(audioData) { ... }

// Arrow functions quando apropriado
const processData = (data) => {
    return data.map(item => item.value);
};

// Async/await ao invés de .then()
async function fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Comentários claros
// Calcula o tempo estimado baseado no progresso atual
const estimateTime = () => { ... };
```

### HTML/CSS

```html
<!-- Use classes semânticas -->
<div class="transcription-container">
    <button class="btn-primary">Transcrever</button>
</div>

<!-- Acessibilidade -->
<label for="audioFile">Arquivo de Áudio</label>
<input id="audioFile" type="file" aria-label="Escolha um arquivo de áudio">
```

### Formatação

- Indentação: 4 espaços
- Ponto e vírgula: usar
- Aspas: simples para strings
- Trailing commas: usar

## 💬 Commits

### Formato

```
<tipo>: <descrição curta>

<descrição detalhada (opcional)>

<footer (opcional)>
```

### Tipos de Commit

- `Add`: Nova funcionalidade
- `Fix`: Correção de bug
- `Update`: Atualização de funcionalidade existente
- `Remove`: Remoção de código/funcionalidade
- `Refactor`: Refatoração de código
- `Docs`: Mudanças na documentação
- `Style`: Formatação, espaços em branco, etc
- `Test`: Adição ou correção de testes
- `Chore`: Tarefas de manutenção

### Exemplos

```bash
# Feature
git commit -m "Add: suporte para idioma japonês"

# Bug fix
git commit -m "Fix: erro ao processar arquivos WAV grandes"

# Documentação
git commit -m "Docs: adiciona exemplos de uso da API"

# Refatoração
git commit -m "Refactor: otimiza função de cache"
```

## ✅ Checklist do Pull Request

Antes de submeter:

- [ ] Código segue o guia de estilo
- [ ] Comentários adicionados onde necessário
- [ ] Documentação atualizada
- [ ] Sem warnings no console
- [ ] Testado localmente
- [ ] Commits são claros e descritivos
- [ ] Branch atualizada com main
- [ ] `.env` não está commitado

## 🔍 Processo de Review

1. **Automático**: Checks de CI/CD (se configurado)
2. **Manual**: Review por mantenedores
3. **Feedback**: Possíveis solicitações de mudanças
4. **Aprovação**: Merge após aprovação
5. **Agradecimento**: Você será creditado!

## 📧 Dúvidas?

Se tiver qualquer dúvida:
- Abra uma [Issue](https://github.com/seu-usuario/transcriber-app/issues)
- Entre em contato: seu-email@example.com

## 🎉 Obrigado!

Sua contribuição é valiosa e ajuda a tornar este projeto melhor para todos!

---

**Feliz codificação! 🚀**
