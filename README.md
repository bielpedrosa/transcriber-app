# 🎤 Transcriber App - AI-Powered Audio Transcription

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Modern web app for audio transcription powered by Google Gemini API. Supports multiple languages, smart caching, and export to various formats.

[Demo](#-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [Contributing](#-how-to-contribute)

</div>

---

## 🚀 Features

### ✨ New in v2.0

- **🔐 API Key Segura**: API key movida para backend (não exposta no frontend)
- **💾 Cache Inteligente**: Sistema de cache usando IndexedDB para chunks já processados
- **⚡ Worker Threads**: Processamento pesado em background
- **🗜️ Compressão de Áudio**: Opção para comprimir áudio antes do envio
- **🌍 Múltiplos Idiomas**: Suporte para PT-BR, EN-US, ES-ES, FR-FR, DE-DE
- **📄 Exportação Avançada**: Exportar em TXT, DOCX e PDF
- **⏱️ Estimativa de Tempo**: Cálculo em tempo real do tempo restante
- **📊 Barra de Progresso**: Visualização detalhada do progresso
- **🔄 Sistema de Retry**: Tentativas automáticas em caso de falha

### Funcionalidades Originais

- Upload de arquivos de áudio (MP3, M4A, WAV, etc.)
- Processamento de arquivos grandes (até 500MB)
- Divisão automática em chunks de 9 minutos
- Interface responsiva com modo escuro

## 📦 Quick Start

### Prerequisites

- Node.js 16.x ou superior
- npm ou yarn
- Chave da API do Google Gemini ([Obter aqui](https://makersuite.google.com/app/apikey))

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/bielpedrosa/transcriber-app.git
cd transcriber-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
# GEMINI_API_KEY=your_api_key_here
```

4. **Start the server**
```bash
npm start
```

5. **Open in your browser**
```
http://localhost:3000
```

🎉 Done! The app is up and running.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** + **Express**: Servidor e API
- **dotenv**: Gerenciamento de variáveis de ambiente
- **helmet**: Segurança HTTP
- **cors**: Controle de CORS
- **compression**: Compressão de respostas
- **express-rate-limit**: Limitação de requisições
- **docx**: Geração de documentos Word
- **pdfkit**: Geração de PDFs

### Frontend
- **Vanilla JavaScript**: Lógica da aplicação
- **Tailwind CSS**: Estilização
- **Web Audio API**: Processamento de áudio
- **IndexedDB**: Cache local
- **Web Workers**: Processamento em background

## 📁 Project Structure

```
transcriber_app/
├── server.js                # Express backend server
├── package.json            # Dependencies
├── .env                    # Environment variables (not in repo)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
├── README.md               # Main documentation
├── CONTRIBUTING.md         # Contribution guidelines
├── .github/                # GitHub templates
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                   # Additional documentation
│   ├── README.md
│   ├── DEMO.md            # Interface demo
│   ├── GUIA_RAPIDO.md     # Quick guide (PT)
│   ├── MELHORIAS.md       # Improvements (PT)
│   └── ...
├── public/                 # Frontend files
│   ├── index.html         # Main UI
│   ├── app.js             # Main logic
│   ├── cache.js           # Cache system (IndexedDB)
│   └── audio-worker.js    # Web Worker
└── scripts/                # Utility scripts
    ├── start.sh           # Dev server starter
    └── prepare-github.sh  # GitHub prep script
```

## 🔧 Como Usar

1. **Selecione o idioma** da transcrição
2. **Escolha um arquivo de áudio** (máximo 500MB)
3. **Opcionalmente**, ative a compressão de áudio
4. **Clique em "Transcrever Áudio"**
5. **Aguarde o processamento** (acompanhe pela barra de progresso)
6. **Copie ou exporte** o resultado em TXT, DOCX ou PDF

## 💡 Dicas

- **Cache**: Chunks já processados são salvos localmente, acelerando reprocessamentos
- **Compressão**: Recomendada para arquivos grandes e conexões lentas
- **Idiomas**: Escolha o idioma correto para melhor qualidade
- **Formatos**: 
  - TXT: Texto puro
  - DOCX: Word (editável)
  - PDF: Documento final

## 🔒 Segurança

- API key mantida no servidor (nunca exposta ao cliente)
- Rate limiting para prevenir abuso
- Helmet.js para headers de segurança
- CORS configurável

## ⚙️ Configurações Avançadas

### Ajustar tamanho dos chunks
No arquivo `public/app.js`, modifique:
```javascript
this.CHUNK_DURATION_SECONDS = 540; // Padrão: 9 minutos
```

### Ajustar limite de arquivo
```javascript
this.MAX_FILE_SIZE_MB = 500; // Padrão: 500MB
```

### Configurar cache
No arquivo `public/cache.js`:
```javascript
async clearOldCache(daysOld = 7) // Cache válido por 7 dias
```

## 🐛 Troubleshooting

**Erro: "API key not configured"**
- Verifique se o arquivo `.env` está configurado corretamente

**Erro: "Falha ao processar o arquivo"**
- Arquivo pode estar corrompido
- Tente converter para MP3 ou WAV

**Cache não funciona**
- Verifique se o navegador suporta IndexedDB
- Limpe o cache do navegador e tente novamente

**Servidor não inicia**
- Verifique se a porta 3000 está disponível
- Execute: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)

## 📝 Scripts NPM

```bash
npm start        # Inicia o servidor em produção
npm run dev      # Inicia com nodemon (auto-reload)
```

## 🎯 Roadmap

Planejamos adicionar estas funcionalidades:

- [ ] Suporte a mais idiomas (japonês, chinês, russo, etc.)
- [ ] Integração com outras APIs de transcrição (Whisper, AssemblyAI)
- [ ] Upload direto para cloud storage (Google Drive, Dropbox)
- [ ] Histórico de transcrições com busca
- [ ] Timestamps no texto transcrito
- [ ] Editor de transcrições integrado
- [ ] Suporte a vídeos (extrair áudio automaticamente)
- [ ] API REST para integração com outros apps
- [ ] Autenticação de usuários
- [ ] Temas customizáveis

## 🤝 How to Contribute

Contribuições são muito bem-vindas! Aqui está como você pode ajudar:

### Report Bugs
1. Check if the bug is already reported in the [Issues](https://github.com/bielpedrosa/transcriber-app/issues)
2. Crie uma nova issue com detalhes do bug
3. Inclua: SO, versão do Node, passos para reproduzir

### Suggest Improvements
1. Abra uma issue com a tag `enhancement`
2. Descreva a funcionalidade desejada
3. Explique o caso de uso

### Submit a Pull Request
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Code of Conduct
- Seja respeitoso e construtivo
- Teste suas mudanças antes de enviar
- Documente código novo
- Siga o estilo de código existente

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

Isso significa que você pode:
- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

## 👨‍💻 Author

**Gabriel Pedrosa**

- GitHub: [@bielpedrosa](https://github.com/bielpedrosa)

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) for the AI API
- [Tailwind CSS](https://tailwindcss.com/) for the CSS framework
- Open source community

## 📞 Support

Found a problem? Have a question?

- 🐛 [Report a Bug](https://github.com/bielpedrosa/transcriber-app/issues)
- 💡 [Suggest a Feature](https://github.com/bielpedrosa/transcriber-app/issues)
- 📧 Email: your-email@example.com

## ⭐ Show Your Support

If this project helped you, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Desenvolvido com ❤️ usando Google Gemini API**

[⬆ Voltar ao topo](#-transcriber-app---transcrição-de-áudio-com-ia)

</div>
