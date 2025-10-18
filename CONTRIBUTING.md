# 🤝 Contributing Guide

Thanks for considering a contribution to Transcriber App! This guide explains how to contribute effectively.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Style Guide](#style-guide)
- [Commits](#commits)

## 📜 Code of Conduct

### Our Pledge

We are committed to a harassment-free, welcoming experience for everyone, regardless of:
- Experience level
- Gender identity and expression
- Sexual orientation
- Disability
- Personal appearance
- Race and ethnicity
- Age
- Religion
- Nationality

### Expected Behavior

- Be respectful and inclusive
- Accept constructive feedback
- Focus on what’s best for the community
- Show empathy to other members

### Unacceptable Behavior

- Sexualized language or imagery
- Insulting or demeaning comments
- Public or private harassment
- Publishing others’ private information without permission
- Any other conduct deemed inappropriate

## 🎯 How Can I Contribute?

### 🐛 Report Bugs

Before opening a bug report:
1. Check if it’s already reported in [Issues](https://github.com/bielpedrosa/transcriber-app/issues)
2. Use the latest version of the project
3. Gather as much information as possible

Include in your report:
- Clear, descriptive title
- Detailed reproduction steps
- Expected vs. actual behavior
- Screenshots (if applicable)
- Environment info:
  - OS and version
  - Node.js version
  - Browser version
  - Error logs

### 💡 Suggest Improvements

To suggest an enhancement:
1. Use the `enhancement` label
2. Provide a clear, descriptive title
3. Describe the feature in detail
4. Explain why it’s useful
5. Optionally, propose possible implementations

### 🔧 Pull Requests

1. Fork and clone
   ```bash
   git clone https://github.com/bielpedrosa/transcriber-app.git
   cd transcriber-app
   ```

2. Create a branch
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

3. Make changes
   - Write clean, well-documented code
   - Add tests when applicable
   - Update documentation

4. Test locally
   ```bash
   npm install
   npm start
   # Test all affected functionality
   ```

5. Commit
   ```bash
   git add .
   git commit -m "Add: short description of your change"
   ```

6. Push
   ```bash
   git push origin feature/your-feature-name
   ```

7. Open a Pull Request
   - Go to the original repo on GitHub
   - Click “New Pull Request”
   - Select your branch
   - Fill out the template

## 🛠️ Development Process

### Environment Setup

```bash
# 1. Clone the repo
git clone https://github.com/bielpedrosa/transcriber-app.git
cd transcriber-app

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# 4. Start the server
npm start
```

### Project Structure

```
transcriber_app/
├── server.js            # Express backend
├── public/
│   ├── index.html       # Interface
│   ├── app.js           # Main logic
│   ├── cache.js         # Cache system
│   └── audio-worker.js  # Web Worker
├── .env                 # Variables (do NOT commit!)
└── package.json         # Dependencies
```

### Contribution Areas

#### 🎨 Frontend
- UI/UX improvements
- Responsiveness
- Accessibility
- New themes

#### ⚙️ Backend
- Performance optimizations
- New endpoints
- Security
- Error handling

#### 📚 Documentation
- README improvements
- Tutorials
- Usage examples
- Translations

#### 🧪 Tests
- Unit tests
- Integration tests
- E2E tests

#### 🚀 New Features
- Additional languages
- Export formats
- Integrations with other APIs

## 📝 Style Guide

### JavaScript

```javascript
// Use const/let (not var)
const apiKey = process.env.API_KEY;
let counter = 0;

// Descriptive names
function transcribeAudioChunk(audioData) { /* ... */ }

// Arrow functions when appropriate
const processData = (data) => data.map(item => item.value);

// Prefer async/await over .then()
async function fetchData(url) {
  const res = await fetch(url);
  return res.json();
}

// Clear comments
// Calculates estimated time based on current progress
const estimateTime = () => { /* ... */ };
```

### HTML/CSS

```html
<!-- Semantic classes -->
<div class="transcription-container">
  <button class="btn-primary">Transcribe</button>
  
</div>

<!-- Accessibility -->
<label for="audioFile">Audio File</label>
<input id="audioFile" type="file" aria-label="Choose an audio file" />
```

### Formatting

- Indentation: 2–4 spaces (match existing file)
- Semicolons: use
- Quotes: single for strings
- Trailing commas: use where valid

## 💬 Commits

### Format

```
<type>: <short description>

<detailed description (optional)>

<footer (optional)>
```

### Common Types

- `Add`: New feature
- `Fix`: Bug fix
- `Update`: Change to existing feature
- `Remove`: Remove code/feature
- `Refactor`: Code refactor
- `Docs`: Documentation only changes
- `Style`: Formatting, whitespace, etc.
- `Test`: Add or fix tests
- `Chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "Add: Japanese language support"

# Bug fix
git commit -m "Fix: handle large WAV files without crash"

# Docs
git commit -m "Docs: add API usage examples"

# Refactor
git commit -m "Refactor: optimize cache lookup"
```

## ✅ Pull Request Checklist

Before submitting:

- [ ] Code follows the style guide
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No console warnings
- [ ] Tested locally
- [ ] Clear, descriptive commits
- [ ] Branch up to date with main
- [ ] `.env` is not committed

## 🔍 Review Process

1. Automated: CI/CD checks (if configured)
2. Manual: Maintainer review
3. Feedback: Change requests if needed
4. Approval: Merge after approval
5. Credit: You’ll be credited in the PR

## 📧 Questions?

If you have any questions:
- Open an [Issue](https://github.com/bielpedrosa/transcriber-app/issues)
- Contact: your-email@example.com

## 🎉 Thanks!

Your contribution is valuable and helps make this project better for everyone.

— Happy coding! 🚀
