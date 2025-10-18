// Advanced Transcription System
class TranscriptionApp {
    constructor() {
        this.API_BASE = window.location.origin;
        this.cache = new TranscriptionCache();
        this.worker = null;
        this.audioContext = null;
        
    // Settings
    this.CHUNK_DURATION_SECONDS = 540; // 9 minutes
        this.MAX_FILE_SIZE_MB = 500;
        
        // Estado
        this.selectedFile = null;
        this.startTime = null;
        this.processedChunks = 0;
        this.totalChunks = 0;
        
    // DOM elements
        this.initElements();
        this.initEventListeners();
        this.initCache();
    }

    initElements() {
        this.elements = {
            audioFile: document.getElementById('audioFile'),
            language: document.getElementById('language'),
            compressAudio: document.getElementById('compressAudio'),
            transcribeBtn: document.getElementById('transcribeBtn'),
            transcription: document.getElementById('transcription'),
            status: document.getElementById('status'),
            error: document.getElementById('error'),
            copyBtn: document.getElementById('copyBtn'),
            copyFeedback: document.getElementById('copy-feedback'),
            loader: document.getElementById('loader'),
            btnText: document.getElementById('btn-text'),
            progressContainer: document.getElementById('progressContainer'),
            progressBar: document.getElementById('progressBar'),
            progressText: document.getElementById('progressText'),
            progressPercent: document.getElementById('progressPercent'),
            timeEstimate: document.getElementById('timeEstimate'),
            chunksInfo: document.getElementById('chunksInfo'),
            cacheStatus: document.getElementById('cacheStatus'),
            clearCacheBtn: document.getElementById('clearCacheBtn'),
            exportButtons: document.getElementById('exportButtons')
        };
    }

    initEventListeners() {
        this.elements.audioFile.addEventListener('change', (e) => this.handleFileSelect(e));
        this.elements.transcribeBtn.addEventListener('click', () => this.handleTranscription());
        this.elements.copyBtn.addEventListener('click', () => this.copyTranscription());
        this.elements.clearCacheBtn.addEventListener('click', () => this.clearCache());
        
        // Export buttons
        document.querySelectorAll('.export-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const format = e.target.dataset.format;
                this.exportTranscription(format);
            });
        });
    }

    async initCache() {
        try {
            await this.cache.init();
            await this.updateCacheInfo();
        } catch (error) {
            console.error('Cache initialization error:', error);
        }
    }

    async updateCacheInfo() {
        const size = await this.cache.getCacheSize();
    this.elements.cacheStatus.textContent = `Cache: ${size} chunks saved`;
    }

    handleFileSelect(event) {
        this.selectedFile = event.target.files[0];
        this.elements.error.textContent = '';
        this.elements.transcribeBtn.disabled = true;
        this.elements.transcription.value = '';
        this.elements.exportButtons.classList.add('hidden');

        if (this.selectedFile) {
            // Size validation
            if (this.selectedFile.size > this.MAX_FILE_SIZE_MB * 1024 * 1024) {
                this.elements.error.textContent = `File too large (${(this.selectedFile.size / (1024*1024)).toFixed(1)} MB). Limit: ${this.MAX_FILE_SIZE_MB} MB.`;
                this.elements.status.textContent = 'Please select a smaller file.';
                this.elements.audioFile.value = '';
                this.selectedFile = null;
                return;
            }

            const sizeMB = (this.selectedFile.size / (1024 * 1024)).toFixed(2);
            this.elements.status.textContent = `Selected file: ${this.selectedFile.name} (${sizeMB} MB)`;
            this.elements.transcribeBtn.disabled = false;
        } else {
            this.elements.status.textContent = 'Select a file to get started';
        }
    }

    async handleTranscription() {
        if (!this.selectedFile) {
            this.elements.error.textContent = 'Please select an audio file first.';
            return;
        }

        this.setLoadingState(true);
        this.elements.error.textContent = '';
        this.elements.transcription.value = '';
        this.elements.progressContainer.classList.remove('hidden');
        this.startTime = Date.now();
        this.processedChunks = 0;

        try {
            // Initialize AudioContext
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            // Load and decode audio
            this.updateProgress(5, 'Loading file...');
            const arrayBuffer = await this.selectedFile.arrayBuffer();

            this.updateProgress(10, 'Decoding audio...');
            let audioBuffer;
            try {
                audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            } catch (decodeError) {
                throw new Error('Failed to process the audio file. Try converting to MP3 or WAV.');
            }

            // Calculate chunks
            this.totalChunks = Math.ceil(audioBuffer.duration / this.CHUNK_DURATION_SECONDS);
            this.updateProgress(15, 'Preparing processing...');

            const language = this.elements.language.value;
            const shouldCompress = this.elements.compressAudio.checked;

            // Process each chunk
            for (let i = 0; i < this.totalChunks; i++) {
                const progressBase = 15 + ((i / this.totalChunks) * 80);
                this.updateProgress(progressBase, `Processing part ${i + 1} of ${this.totalChunks}...`);
                this.elements.chunksInfo.textContent = `${i}/${this.totalChunks} chunks`;

                const chunkBuffer = this.sliceAudioBuffer(
                    audioBuffer, 
                    i * this.CHUNK_DURATION_SECONDS, 
                    (i + 1) * this.CHUNK_DURATION_SECONDS
                );
                
                if (!chunkBuffer) continue;

                const wavBlob = this.bufferToWave(chunkBuffer, chunkBuffer.length);
                const base64Audio = await this.blobToBase64(wavBlob);
                const audioData = base64Audio.split(',')[1];

                // Check cache
                const cachedTranscription = await this.cache.getChunk(audioData, i);
                let transcriptionPart;

                if (cachedTranscription) {
                    console.log(`✓ Chunk ${i} restored from cache`);
                    transcriptionPart = cachedTranscription;
                } else {
                    // Transcribe via API
                    transcriptionPart = await this.transcribeChunk(audioData, language);
                    
                    // Save to cache
                    await this.cache.saveChunk('file-hash', i, audioData, transcriptionPart);
                    await this.updateCacheInfo();
                }

                // Adicionar ao texto
                this.elements.transcription.value += transcriptionPart + (transcriptionPart.endsWith(' ') ? '' : ' ');
                this.elements.transcription.scrollTop = this.elements.transcription.scrollHeight;

                this.processedChunks = i + 1;
                this.updateTimeEstimate();
            }

            this.updateProgress(100, 'Transcription complete! 🎉');
            this.elements.chunksInfo.textContent = `${this.totalChunks}/${this.totalChunks} chunks`;
            this.elements.exportButtons.classList.remove('hidden');

        } catch (err) {
            console.error('Transcription error:', err);
            this.elements.error.textContent = `Error: ${err.message}`;
            this.elements.status.textContent = 'An error occurred.';
        } finally {
            this.setLoadingState(false);
            setTimeout(() => {
                this.elements.progressContainer.classList.add('hidden');
            }, 3000);
        }
    }

    async transcribeChunk(audioData, language) {
        const maxRetries = 3;
        let delay = 2000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await fetch(`${this.API_BASE}/api/transcribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ audioData, language })
                });

                if (response.status === 429 || response.status === 503) {
                    if (attempt === maxRetries) {
                        throw new Error('Server overloaded. Please try again later.');
                    }
                    console.warn(`Retrying... (${attempt}/${maxRetries})`);
                    this.elements.status.textContent = `Server busy. Retrying (${attempt}/${maxRetries})...`;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                    continue;
                }

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'API error');
                }

                const result = await response.json();
                return result.transcription || '';

            } catch (error) {
                if (attempt === maxRetries) throw error;
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }
        }
    }

    async exportTranscription(format) {
        const text = this.elements.transcription.value;
        
        if (!text) {
            alert('There is no transcription to export!');
            return;
        }

        try {
            const response = await fetch(`${this.API_BASE}/api/export`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, format })
            });

            if (!response.ok) {
                throw new Error('Failed to export file');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `transcription.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            this.showNotification(`✓ ${format.toUpperCase()} file exported successfully!`);

        } catch (error) {
            console.error('Export error:', error);
            alert(`Export error: ${error.message}`);
        }
    }

    updateProgress(percent, text) {
        this.elements.progressBar.style.width = `${percent}%`;
        this.elements.progressPercent.textContent = `${Math.round(percent)}%`;
        this.elements.progressText.textContent = text;
    }

    updateTimeEstimate() {
        if (this.processedChunks === 0) return;

        const elapsed = Date.now() - this.startTime;
        const avgTimePerChunk = elapsed / this.processedChunks;
        const remaining = (this.totalChunks - this.processedChunks) * avgTimePerChunk;

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

    this.elements.timeEstimate.textContent = `Estimated time: ${minutes}m ${seconds}s`;
    }

    sliceAudioBuffer(audioBuffer, startSeconds, endSeconds) {
        const sampleRate = audioBuffer.sampleRate;
        const startOffset = Math.floor(startSeconds * sampleRate);
        let endOffset = Math.floor(endSeconds * sampleRate);

        if (endOffset > audioBuffer.length) {
            endOffset = audioBuffer.length;
        }

        const frameCount = endOffset - startOffset;
        if (frameCount <= 0) return null;

        const newBuffer = this.audioContext.createBuffer(
            audioBuffer.numberOfChannels,
            frameCount,
            sampleRate
        );

        for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
            newBuffer.copyToChannel(audioBuffer.getChannelData(i).subarray(startOffset, endOffset), i);
        }

        return newBuffer;
    }

    bufferToWave(abuffer, len) {
        let numOfChan = abuffer.numberOfChannels,
            length = len * numOfChan * 2 + 44,
            buffer = new ArrayBuffer(length),
            view = new DataView(buffer),
            channels = [],
            i, sample,
            offset = 0,
            pos = 0;

        const setUint16 = (data) => {
            view.setUint16(pos, data, true);
            pos += 2;
        };

        const setUint32 = (data) => {
            view.setUint32(pos, data, true);
            pos += 4;
        };

        setUint32(0x46464952);
        setUint32(length - 8);
        setUint32(0x45564157);
        setUint32(0x20746d66);
        setUint32(16);
        setUint16(1);
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan);
        setUint16(numOfChan * 2);
        setUint16(16);
        setUint32(0x61746164);
        setUint32(length - pos - 4);

        for (i = 0; i < abuffer.numberOfChannels; i++)
            channels.push(abuffer.getChannelData(i));

        while (pos < length) {
            for (i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][offset]));
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++;
        }

        return new Blob([buffer], { type: 'audio/wav' });
    }

    blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    copyTranscription() {
        if (this.elements.transcription.value) {
            this.elements.transcription.select();
            document.execCommand('copy');
            this.showCopyFeedback();
            window.getSelection().removeAllRanges();
        }
    }

    showCopyFeedback() {
        this.elements.copyFeedback.style.opacity = '1';
        setTimeout(() => {
            this.elements.copyFeedback.style.opacity = '0';
        }, 2000);
    }

    showNotification(message) {
        this.elements.status.textContent = message;
    }

    async clearCache() {
        if (confirm('Are you sure you want to clear all cache? This may increase future processing time.')) {
            await this.cache.clearAllCache();
            await this.updateCacheInfo();
            alert('Cache cleared successfully!');
        }
    }

    setLoadingState(isLoading) {
        this.elements.transcribeBtn.disabled = isLoading;
        if (isLoading) {
            this.elements.btnText.textContent = 'Transcribing...';
            this.elements.loader.classList.remove('hidden');
            this.elements.audioFile.disabled = true;
        } else {
            this.elements.btnText.textContent = 'Transcribe Audio';
            this.elements.loader.classList.add('hidden');
            this.elements.audioFile.disabled = false;
        }
    }
}

// Inicializar app quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new TranscriptionApp();
});
