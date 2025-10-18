const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet({
    contentSecurityPolicy: false, // Permitir inline scripts para desenvolvimento
}));
app.use(compression());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Rate limiting para prevenir abuso
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 requisições por IP
    message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});
app.use('/api/', limiter);

// Endpoint para transcrição (proxy para Gemini API)
app.post('/api/transcribe', async (req, res) => {
    try {
        const { audioData, language = 'pt-BR' } = req.body;

        if (!audioData) {
            return res.status(400).json({ error: 'Audio data is required' });
        }

        const API_KEY = process.env.GEMINI_API_KEY;
        if (!API_KEY) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        // Prompts por idioma
        const prompts = {
            'pt-BR': 'Você é um especialista em transcrição de áudio. Transcreva o seguinte áudio para português brasileiro. Formate o texto com parágrafos e pontuação adequados. Apenas retorne o texto transcrito, sem qualquer introdução ou comentário.',
            'en-US': 'You are an expert in audio transcription. Transcribe the following audio to English. Format the text with proper paragraphs and punctuation. Only return the transcribed text, without any introduction or comment.',
            'es-ES': 'Eres un experto en transcripción de audio. Transcribe el siguiente audio al español. Formatea el texto con párrafos y puntuación adecuados. Solo devuelve el texto transcrito, sin ninguna introducción o comentario.',
            'fr-FR': 'Vous êtes un expert en transcription audio. Transcrivez l\'audio suivant en français. Formatez le texte avec des paragraphes et une ponctuation appropriés. Ne retournez que le texte transcrit, sans introduction ni commentaire.',
            'de-DE': 'Sie sind ein Experte für Audiotranskription. Transkribieren Sie das folgende Audio auf Deutsch. Formatieren Sie den Text mit entsprechenden Absätzen und Zeichensetzung. Geben Sie nur den transkribierten Text zurück, ohne Einleitung oder Kommentar.'
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

        const payload = {
            contents: [{
                parts: [
                    { text: prompts[language] || prompts['pt-BR'] },
                    { inlineData: { mimeType: 'audio/wav', data: audioData } }
                ]
            }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error('Gemini API error:', responseText);
            return res.status(response.status).json({ 
                error: 'Transcription API error',
                details: responseText 
            });
        }

        const result = JSON.parse(responseText);
        const transcription = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

        res.json({ transcription });

    } catch (error) {
        console.error('Transcription error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// Endpoint para exportação de documentos
app.post('/api/export', async (req, res) => {
    try {
        const { text, format } = req.body;

        if (!text || !format) {
            return res.status(400).json({ error: 'Text and format are required' });
        }

        switch (format) {
            case 'txt':
                res.setHeader('Content-Type', 'text/plain');
                res.setHeader('Content-Disposition', 'attachment; filename="transcription.txt"');
                res.send(text);
                break;

            case 'docx':
                const docx = require('docx');
                const { Document, Packer, Paragraph, TextRun } = docx;

                const doc = new Document({
                    sections: [{
                        properties: {},
                        children: text.split('\n').map(line => 
                            new Paragraph({
                                children: [new TextRun(line)]
                            })
                        )
                    }]
                });

                const buffer = await Packer.toBuffer(doc);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
                res.setHeader('Content-Disposition', 'attachment; filename="transcription.docx"');
                res.send(buffer);
                break;

            case 'pdf':
                const PDFDocument = require('pdfkit');
                const pdf = new PDFDocument();
                
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename="transcription.pdf"');
                
                pdf.pipe(res);
                pdf.fontSize(12);
                pdf.text(text, {
                    width: 500,
                    align: 'left'
                });
                pdf.end();
                break;

            default:
                res.status(400).json({ error: 'Invalid format. Use txt, docx, or pdf' });
        }

    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ 
            error: 'Export failed',
            message: error.message 
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rota principal - serve o HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Transcriber app ready!`);
});
