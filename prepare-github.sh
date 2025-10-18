#!/bin/bash

echo "🚀 Preparando Transcriber App para o GitHub..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se .env existe e contém API key real
if [ -f ".env" ]; then
    if grep -q "AIzaSy" .env; then
        echo -e "${RED}⚠️  AVISO: .env contém uma API key real!${NC}"
        echo -e "${YELLOW}Certifique-se de que .env está no .gitignore${NC}"
        echo ""
    fi
fi

# Verificar se .gitignore está correto
if grep -q "^\.env$" .gitignore; then
    echo -e "${GREEN}✓${NC} .gitignore configurado corretamente"
else
    echo -e "${RED}✗${NC} .env não está no .gitignore!"
    exit 1
fi

# Verificar se .env.example existe
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✓${NC} .env.example presente"
else
    echo -e "${RED}✗${NC} .env.example não encontrado!"
    exit 1
fi

# Verificar arquivos essenciais
REQUIRED_FILES=("README.md" "LICENSE" "CONTRIBUTING.md" "package.json" "server.js")

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file presente"
    else
        echo -e "${RED}✗${NC} $file não encontrado!"
        exit 1
    fi
done

echo ""
echo -e "${GREEN}✓ Todos os arquivos essenciais estão presentes!${NC}"
echo ""

# Perguntar sobre arquivo antigo
if [ -f "trancriber.html" ]; then
    echo -e "${YELLOW}⚠️  Arquivo antigo 'trancriber.html' encontrado${NC}"
    read -p "Deseja removê-lo? (s/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        rm trancriber.html
        echo -e "${GREEN}✓${NC} Arquivo removido"
    fi
    echo ""
fi

# Perguntar sobre pasta routes (se existir e estiver vazia)
if [ -d "routes" ]; then
    if [ -z "$(ls -A routes)" ]; then
        echo -e "${YELLOW}⚠️  Pasta 'routes/' está vazia${NC}"
        read -p "Deseja removê-la? (s/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Ss]$ ]]; then
            rm -rf routes
            echo -e "${GREEN}✓${NC} Pasta removida"
        fi
        echo ""
    fi
fi

# Verificar se git está inicializado
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Git não inicializado. Inicializando...${NC}"
    git init
    echo -e "${GREEN}✓${NC} Repositório git inicializado"
    echo ""
fi

# Pedir informações do usuário
echo "📝 Configuração do Git"
echo ""

read -p "Digite seu nome (para commits): " GIT_NAME
read -p "Digite seu email do GitHub: " GIT_EMAIL

git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

echo -e "${GREEN}✓${NC} Git configurado"
echo ""

# Verificar status do git
echo "📊 Status do Git:"
git status --short
echo ""

# Oferecer fazer o commit inicial
read -p "Deseja fazer o commit inicial agora? (s/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    git add .
    git commit -m "Add: initial commit - Transcriber App v2.0

- API key segura no backend
- Cache inteligente com IndexedDB
- Suporte a 5 idiomas (PT-BR, EN-US, ES-ES, FR-FR, DE-DE)
- Exportação em TXT, DOCX e PDF
- Worker threads para processamento
- Compressão de áudio
- Estimativa de tempo em tempo real
- Interface moderna e responsiva"
    
    echo -e "${GREEN}✓${NC} Commit inicial criado"
    echo ""
fi

echo ""
echo -e "${GREEN}🎉 Preparação completa!${NC}"
echo ""
echo "📌 Próximos passos:"
echo ""
echo "1. Crie um repositório no GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Conecte seu repositório local:"
echo "   ${YELLOW}git remote add origin https://github.com/SEU-USUARIO/transcriber-app.git${NC}"
echo "   ${YELLOW}git branch -M main${NC}"
echo "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "Ou use GitHub CLI:"
echo "   ${YELLOW}gh repo create transcriber-app --public --source=. --push${NC}"
echo ""
echo "📖 Para mais detalhes, leia: GITHUB_GUIDE.md"
echo ""
