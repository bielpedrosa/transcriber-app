#!/bin/bash

echo "🚀 Iniciando Transcriber App..."

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "📝 Criando .env de exemplo..."
    cat > .env << EOF
# API Configuration
GEMINI_API_KEY=sua_chave_aqui

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF
    echo "✅ Arquivo .env criado. Por favor, adicione sua API key do Gemini!"
    exit 1
fi

echo "✅ Iniciando servidor..."
npm start
