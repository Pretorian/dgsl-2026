## Quick Start

### Prerequisites:

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Extract the ZIP file** to your desired location

2. **Navigate to the project directory**
   ```bash
   cd dgsl-schedule-filter
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to that URL manually

## Project Structure

```
dgsl-schedule-filter/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js          # Main application component with embedded schedule data
│   ├── index.js        # Application entry point
│   └── index.css       # Base styles
├── package.json        # Project dependencies
└── README.md          # This file
```

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with optimized files ready for deployment.

## Data Structure

The schedule data is embedded directly in the `App.js` file. Each game contains:

- **date**: Game date (YYYY-MM-DD format)
- **ageGroup**: "6-8", "9-10", or "11-13"
- **time**: Game time
- **team1**: Home team name
- **team2**: Away team name
- **field**: "Upper Fields 1-3"
- **status**: "Rain Make Up" (optional, only for makeup games)