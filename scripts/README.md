# 🛠️ Scripts

Utility scripts for development and deployment.

## Available Scripts

### `start.sh`
Starts the development server with automatic dependency installation.

```bash
./scripts/start.sh
```

**What it does:**
- Checks if dependencies are installed
- Installs missing dependencies
- Verifies `.env` configuration
- Starts the server on port 3000

### `prepare-github.sh`
Prepares the project for GitHub publication.

```bash
./scripts/prepare-github.sh
```

**What it does:**
- Validates project structure
- Checks for sensitive files (`.env`)
- Verifies Git configuration
- Optionally creates initial commit
- Provides GitHub publishing instructions

## Usage

Make scripts executable first:

```bash
chmod +x scripts/*.sh
```

Then run them from the project root:

```bash
./scripts/start.sh
# or
./scripts/prepare-github.sh
```

## NPM Scripts

Alternatively, use npm commands from `package.json`:

```bash
npm start          # Start production server
npm run dev        # Start with auto-reload (nodemon)
```
