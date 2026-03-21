# DGSL Spring Game Schedule 2026 - Filter App

A React-based web application for viewing and filtering the Durham Girls Soccer League (DGSL) Spring 2026 game schedule.

## Features

- **Filter by Age Group**: 6-8, 9-10, or 11-13
- **Filter by Team**: Select any team to see their matches
- **Filter by Date**: View games on specific dates
- **Filter by Game Type**: All games, scheduled games, or rain make-ups
- **Sortable Columns**: Click on Date, Time, or Home Team headers to sort (ascending/descending)
- **Visual Indicators**: Rain Make Up games highlighted in yellow
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Quick Start

### Prerequisites

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

## Schedule Information

- **Season**: Spring 2026
- **Dates**: March 14 - June 6, 2026
- **Location**: Merrick Moore Park (632 N. Hoover Road, Durham NC 27703)
- **Weather Line**: 919-560-4636 Press #4
- **Coordinator**: Robert Edoukou (919-560-4355, Robert.Edoukou@durhamnc.gov)

### Special Dates

- **April 11**: No games (Merrick Moore unavailable)
- **May 16, May 30, June 6**: Rain Make Up dates

## Updating the Schedule

To update the schedule data, edit the `scheduleDataJson` array in `src/App.js`. Follow the existing data structure format.

## Troubleshooting

**Port already in use**
If port 3000 is already in use, you can:
- Stop the other application using port 3000
- Or start on a different port: `PORT=3001 npm start`

**Dependencies not installing**
Try deleting `node_modules/` and `package-lock.json`, then run `npm install` again.

**App not updating**
Hard refresh your browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

Created for Durham Girls Soccer League (DGSL)

## Support

For questions about the schedule or games, contact:
- Robert Edoukou: 919-560-4355
- Email: Robert.Edoukou@durhamnc.gov