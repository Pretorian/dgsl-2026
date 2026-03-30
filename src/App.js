import React, { useState, useMemo, useEffect } from 'react';

// Country code mapping for team flags
const countryCodeMap = {
  'Argentina': 'ar',
  'Brazil': 'br',
  'Egypt': 'eg',
  'Chile': 'cl',
  'Costa Rica': 'cr',
  'Scotland': 'gb-sct',
  'Japan': 'jp',
  'Mexico': 'mx',
  'Madagascar': 'mg',
  'Spain': 'es',
  'New Zealand': 'nz',
  'Germany': 'de',
  'Norway': 'no',
  'France/Egypt': 'fr',
  'Italy': 'it'
};

// Helper function to get flag URL
const getFlagUrl = (teamName) => {
  const code = countryCodeMap[teamName];
  if (!code) return null;
  // Using flagcdn.com for high-quality flag images
  // Format: https://flagcdn.com/w40/{country-code}.png
  return `https://flagcdn.com/w40/${code}.png`;
};

// Helper function to get age group color
const getAgeGroupColor = (ageGroup) => {
  switch(ageGroup) {
    case '6-8':
      return '#3B82F6'; // Blue
    case '9-10':
      return '#10B981'; // Green
    case '11-13':
      return '#F59E0B'; // Orange
    default:
      return '#6B7280'; // Gray
  }
};

// TeamFlag component
const TeamFlag = ({ teamName }) => {
  const flagUrl = getFlagUrl(teamName);

  if (!flagUrl) {
    return <span>{teamName}</span>;
  }

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <img
        src={flagUrl}
        alt={teamName}
        style={{ width: '28px', height: 'auto', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'inline';
        }}
      />
      <span style={{ display: 'none' }}>{teamName}</span>
      <span>{teamName}</span>
    </span>
  );
};

// Weather widget component
const WeatherWidget = ({ weather }) => {
  if (!weather) {
    return null;
  }

  // Simple weather emoji mapping based on condition
  const getWeatherEmoji = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return '⛈️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
    return '🌤️';
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.25rem 0.75rem',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '1rem',
      fontSize: '0.95rem',
      fontWeight: '600'
    }}>
      <span>{getWeatherEmoji(weather.condition)}</span>
      <span>{weather.temp}°F</span>
      <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.9 }}>
        {weather.condition}
      </span>
    </span>
  );
};

// Schedule data embedded directly
const scheduleDataJson = [
  {"date":"2026-03-14","ageGroup":"6-8","time":"9:00","team1":"Argentina","team2":"Brazil","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"6-8","time":"10:00","team1":"Madagascar","team2":"Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"6-8","time":"11:00","team1":"Costa Rica","team2":"Mexico","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"6-8","time":"12:00","team1":"Scotland","team2":"Japan","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"9-10","time":"9:00","team1":"Egypt","team2":"New Zealand","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"9-10","time":"10:00","team1":"Costa Rica","team2":"Scotland","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"9-10","time":"11:00","team1":"Spain","team2":"Brazil","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"9-10","time":"12:00","team1":"Madagascar","team2":"Chile","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"11-13","time":"9:00","team1":"Madagascar","team2":"Germany","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"11-13","time":"10:10","team1":"Norway","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"11-13","time":"11:20","team1":"France/Egypt","team2":"Italy","field":"Upper Fields 1-3"},
  {"date":"2026-03-14","ageGroup":"11-13","time":"12:30","team1":"Chile","team2":"Japan","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"6-8","time":"9:00","team1":"Mexico","team2":"Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"6-8","time":"10:00","team1":"Costa Rica","team2":"Brazil","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"6-8","time":"11:00","team1":"Madagascar","team2":"Scotland","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"6-8","time":"12:00","team1":"Japan","team2":"Argentina","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"9-10","time":"9:00","team1":"Scotland","team2":"Brazil","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"9-10","time":"10:00","team1":"Egypt","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"9-10","time":"11:00","team1":"Spain","team2":"Chile","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"9-10","time":"12:00","team1":"New Zealand","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"11-13","time":"9:00","team1":"Costa Rica","team2":"Italy","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"11-13","time":"10:10","team1":"Chile","team2":"Norway","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"11-13","time":"11:20","team1":"France/Egypt","team2":"Germany","field":"Upper Fields 1-3"},
  {"date":"2026-03-21","ageGroup":"11-13","time":"12:30","team1":"Japan","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"6-8","time":"9:00","team1":"Brazil","team2":"Japan","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"6-8","time":"10:00","team1":"Argentina","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"6-8","time":"11:00","team1":"Costa Rica","team2":"Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"6-8","time":"12:00","team1":"Scotland","team2":"Mexico","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"9-10","time":"9:00","team1":"Chile","team2":"New Zealand","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"9-10","time":"10:00","team1":"Brazil","team2":"Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"9-10","time":"11:00","team1":"Madagascar","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"9-10","time":"12:00","team1":"Spain","team2":"Scotland","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"11-13","time":"9:00","team1":"Madagascar","team2":"Norway","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"11-13","time":"10:10","team1":"Italy","team2":"Chile","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"11-13","time":"11:20","team1":"Germany","team2":"Japan","field":"Upper Fields 1-3"},
  {"date":"2026-03-28","ageGroup":"11-13","time":"12:30","team1":"France/Egypt","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"6-8","time":"9:00","team1":"Mexico","team2":"Argentina","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"6-8","time":"10:00","team1":"Japan","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"6-8","time":"11:00","team1":"Egypt","team2":"Scotland","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"6-8","time":"12:00","team1":"Madagascar","team2":"Brazil","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"9-10","time":"9:00","team1":"Brazil","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"9-10","time":"10:00","team1":"New Zealand","team2":"Spain","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"9-10","time":"11:00","team1":"Costa Rica","team2":"Chile","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"9-10","time":"12:00","team1":"Scotland","team2":"Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"11-13","time":"9:00","team1":"Japan","team2":"France/Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"11-13","time":"10:10","team1":"Italy","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"11-13","time":"11:20","team1":"Norway","team2":"Germany","field":"Upper Fields 1-3"},
  {"date":"2026-04-04","ageGroup":"11-13","time":"12:30","team1":"Costa Rica","team2":"Chile","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"6-8","time":"9:00","team1":"Scotland","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"6-8","time":"10:00","team1":"Brazil","team2":"Mexico","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"6-8","time":"11:00","team1":"Japan","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"6-8","time":"12:00","team1":"Argentina","team2":"Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"9-10","time":"9:00","team1":"Egypt","team2":"Spain","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"9-10","time":"10:00","team1":"Chile","team2":"Brazil","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"9-10","time":"11:00","team1":"Costa Rica","team2":"New Zealand","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"9-10","time":"12:00","team1":"Madagascar","team2":"Scotland","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"11-13","time":"9:00","team1":"Chile","team2":"France/Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"11-13","time":"10:10","team1":"Germany","team2":"Italy","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"11-13","time":"11:20","team1":"Norway","team2":"Japan","field":"Upper Fields 1-3"},
  {"date":"2026-04-18","ageGroup":"11-13","time":"12:30","team1":"Madagascar","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"6-8","time":"9:00","team1":"Mexico","team2":"Japan","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"6-8","time":"10:00","team1":"Egypt","team2":"Brazil","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"6-8","time":"11:00","team1":"Costa Rica","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"6-8","time":"12:00","team1":"Scotland","team2":"Argentina","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"9-10","time":"9:00","team1":"Egypt","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"9-10","time":"10:00","team1":"Scotland","team2":"Chile","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"9-10","time":"11:00","team1":"Brazil","team2":"New Zealand","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"9-10","time":"12:00","team1":"Spain","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"11-13","time":"9:00","team1":"Chile","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"11-13","time":"10:10","team1":"Costa Rica","team2":"Germany","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"11-13","time":"11:20","team1":"Italy","team2":"Japan","field":"Upper Fields 1-3"},
  {"date":"2026-04-25","ageGroup":"11-13","time":"12:30","team1":"France/Egypt","team2":"Norway","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"6-8","time":"9:00","team1":"Argentina","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"6-8","time":"10:00","team1":"Egypt","team2":"Japan","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"6-8","time":"11:00","team1":"Brazil","team2":"Scotland","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"6-8","time":"12:00","team1":"Madagascar","team2":"Mexico","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"9-10","time":"9:00","team1":"Madagascar","team2":"Spain","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"9-10","time":"10:00","team1":"New Zealand","team2":"Scotland","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"9-10","time":"11:00","team1":"Chile","team2":"Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"9-10","time":"12:00","team1":"Costa Rica","team2":"Brazil","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"11-13","time":"9:00","team1":"Madagascar","team2":"France/Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"11-13","time":"10:10","team1":"Japan","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"11-13","time":"11:20","team1":"Germany","team2":"Chile","field":"Upper Fields 1-3"},
  {"date":"2026-05-02","ageGroup":"11-13","time":"12:30","team1":"Norway","team2":"Italy","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"6-8","time":"9:00","team1":"Japan","team2":"Scotland","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"6-8","time":"10:00","team1":"Brazil","team2":"Argentina","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"6-8","time":"11:00","team1":"Egypt","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"6-8","time":"12:00","team1":"Mexico","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"9-10","time":"9:00","team1":"Chile","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"9-10","time":"10:00","team1":"New Zealand","team2":"Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"9-10","time":"11:00","team1":"Scotland","team2":"Costa Rica","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"9-10","time":"12:00","team1":"Brazil","team2":"Spain","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"11-13","time":"9:00","team1":"Japan","team2":"Chile","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"11-13","time":"10:10","team1":"Germany","team2":"Madagascar","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"11-13","time":"11:20","team1":"Costa Rica","team2":"Norway","field":"Upper Fields 1-3"},
  {"date":"2026-05-09","ageGroup":"11-13","time":"12:30","team1":"Italy","team2":"France/Egypt","field":"Upper Fields 1-3"},
  {"date":"2026-05-16","ageGroup":"6-8","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"6-8","time":"10:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"6-8","time":"11:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"6-8","time":"12:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"9-10","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"9-10","time":"10:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"9-10","time":"11:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"9-10","time":"12:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"11-13","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"11-13","time":"10:10","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"11-13","time":"11:20","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-16","ageGroup":"11-13","time":"12:30","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"6-8","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"6-8","time":"10:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"6-8","time":"11:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"6-8","time":"12:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"9-10","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"9-10","time":"10:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"9-10","time":"11:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"9-10","time":"12:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"11-13","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"11-13","time":"10:10","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"11-13","time":"11:20","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-05-30","ageGroup":"11-13","time":"12:30","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"6-8","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"6-8","time":"10:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"6-8","time":"11:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"6-8","time":"12:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"9-10","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"9-10","time":"10:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"9-10","time":"11:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"9-10","time":"12:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"11-13","time":"9:00","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"11-13","time":"10:10","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"11-13","time":"11:20","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"},
  {"date":"2026-06-06","ageGroup":"11-13","time":"12:30","team1":"Rain Make Up","team2":"Rain Make Up","field":"Upper Fields 1-3","status":"Rain Make Up"}
];

const App = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [showGames, setShowGames] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [gameStatuses, setGameStatuses] = useState({});
  const [weather, setWeather] = useState(null);

  // Load game statuses from localStorage on mount
  useEffect(() => {
    const savedStatuses = localStorage.getItem('dgsl-game-statuses');
    if (savedStatuses) {
      try {
        setGameStatuses(JSON.parse(savedStatuses));
      } catch (e) {
        console.error('Failed to load game statuses:', e);
      }
    }
  }, []);

  // Fetch weather data for Durham, NC
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using wttr.in API for simple weather data (no API key needed)
        const response = await fetch('https://wttr.in/Durham,NC?format=j1');
        const data = await response.json();

        if (data && data.current_condition && data.current_condition[0]) {
          const current = data.current_condition[0];
          setWeather({
            temp: current.temp_F,
            condition: current.weatherDesc[0].value,
            icon: current.weatherCode,
            feelsLike: current.FeelsLikeF,
            humidity: current.humidity,
            windSpeed: current.windspeedMiles
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Save game statuses to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(gameStatuses).length > 0) {
      localStorage.setItem('dgsl-game-statuses', JSON.stringify(gameStatuses));
    }
  }, [gameStatuses]);

  // Generate unique game ID
  const getGameId = (match) => {
    return `${match.date}-${match.time}-${match.ageGroup}`;
  };

  // Get the current status of a game
  const getGameStatus = (match) => {
    const gameId = getGameId(match);
    return gameStatuses[gameId] || match.status || 'Scheduled';
  };

  // Update game status
  const updateGameStatus = (match, newStatus) => {
    const gameId = getGameId(match);
    setGameStatuses(prev => ({
      ...prev,
      [gameId]: newStatus
    }));
  };

  const uniqueDates = useMemo(() => {
    const dates = [...new Set(scheduleDataJson.map(match => match.date))];
    return dates.sort();
  }, []);

  const allTeams = useMemo(() => {
    const teams = new Set();
    scheduleDataJson.forEach(match => {
      teams.add(match.team1);
      teams.add(match.team2);
    });
    return Array.from(teams).sort();
  }, []);

  const filteredMatches = useMemo(() => {
    let matches = scheduleDataJson.filter(match => {
      const currentStatus = getGameStatus(match);
      const ageGroupMatch = selectedAgeGroup === 'all' || match.ageGroup === selectedAgeGroup;
      const fieldMatch = selectedField === 'all' || match.field === selectedField;
      const dateMatch = selectedDate === 'all' || match.date === selectedDate;
      const teamMatch = selectedTeam === 'all' ||
        match.team1 === selectedTeam || match.team2 === selectedTeam;
      const gameMatch = showGames === 'all' ||
        (showGames === 'rain' && currentStatus === 'Rain Make Up') ||
        (showGames === 'scheduled' && currentStatus === 'Scheduled') ||
        (showGames === 'played' && currentStatus === 'Played') ||
        (showGames === 'cancelled' && currentStatus === 'Cancelled');

      return ageGroupMatch && fieldMatch && dateMatch && teamMatch && gameMatch;
    });

    // Apply sorting
    if (sortConfig.key) {
      matches.sort((a, b) => {
        let aValue, bValue;
        
        if (sortConfig.key === 'date') {
          aValue = new Date(a.date);
          bValue = new Date(b.date);
        } else if (sortConfig.key === 'time') {
          const timeToMinutes = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
          };
          aValue = timeToMinutes(a.time);
          bValue = timeToMinutes(b.time);
        } else if (sortConfig.key === 'team1') {
          aValue = a.team1.toLowerCase();
          bValue = b.team1.toLowerCase();
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return matches;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAgeGroup, selectedField, selectedDate, selectedTeam, showGames, sortConfig, gameStatuses]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return ' ↕';
    }
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  const formatDate = (dateStr) => {
    // Parse date as local time to avoid timezone issues
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <span style={styles.icon}>⚽</span> DGSL Spring Game Schedule 2026
        </h1>
        <p style={styles.headerText}>Field Location: Merrick Moore Park (632 N. Hoover Road, Durham NC 27703)</p>
        <p style={styles.headerTextSmall}>DPR Values: Inclusivity, Fun, Stewardship, Leadership through Service, and Safety</p>
        <p style={styles.headerTextTiny}>Weather Cancellation Line: 919-560-4636 Press #4 for Soccer announcements</p>
        <p style={styles.headerTextTiny}>Weather cancellation line will be updated by 4:30pm on weekdays and by 7:30am on weekends</p>
        <p style={styles.headerTextTiny}>League Coordinator: Robert Edoukou 919-560-4355 or at Robert.Edoukou@durhamnc.gov</p>
      </div>

      <div style={styles.ageBanner}>
        <h2 style={styles.ageBannerText}>
          <span>🏆</span>
          {selectedAgeGroup === 'all' ? 'All Age Groups (6-13)' : `Ages ${selectedAgeGroup}`}
          {' • '}
          {filteredMatches.length} {filteredMatches.length === 1 ? 'Game' : 'Games'}
          {selectedTeam !== 'all' && ` • Team: ${selectedTeam}`}
          {selectedDate !== 'all' && ` • Date: ${formatDate(selectedDate)}`}
          {showGames !== 'all' && ` • ${showGames.charAt(0).toUpperCase() + showGames.slice(1)}`}
          {weather && (
            <>
              <span style={{ margin: '0 0.25rem' }}>•</span>
              <WeatherWidget weather={weather} />
            </>
          )}
        </h2>
      </div>

      <div style={styles.rainNotice}>
        <p style={styles.rainNoticeText}>
          <span>ℹ️</span> Game Status Colors: Green = Played | Red = Cancelled | Yellow = Rain Make Up
          <span style={{ margin: '0 0.5rem' }}>•</span>
          Age Groups:
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginLeft: '0.25rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3B82F6', display: 'inline-block' }}></span>
            6-8
          </span>
          {' | '}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
            9-10
          </span>
          {' | '}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B', display: 'inline-block' }}></span>
            11-13
          </span>
        </p>
      </div>

      <div style={styles.filtersContainer}>
        <div style={styles.filtersGrid}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>AGE GROUP</label>
            <select
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Ages</option>
              <option value="6-8">Ages 6-8</option>
              <option value="9-10">Ages 9-10</option>
              <option value="11-13">Ages 11-13</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>FILTER BY FIELD</label>
            <select
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Fields</option>
              <option value="Upper Fields 1-3">Upper Fields 1-3</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>FILTER BY TEAM</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Teams</option>
              {allTeams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>FILTER BY DATE</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Dates</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>{formatDate(date)}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>SHOW GAMES</label>
            <select
              value={showGames}
              onChange={(e) => setShowGames(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Games</option>
              <option value="scheduled">Scheduled</option>
              <option value="played">Played</option>
              <option value="cancelled">Cancelled</option>
              <option value="rain">Rain Make Ups</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th
                  style={{...styles.th, cursor: 'pointer', userSelect: 'none'}}
                  onClick={() => handleSort('date')}
                >
                  DATE{getSortIndicator('date')}
                </th>
                <th
                  style={{...styles.th, cursor: 'pointer', userSelect: 'none'}}
                  onClick={() => handleSort('time')}
                >
                  TIME{getSortIndicator('time')}
                </th>
                <th style={styles.th}>AGE GROUP</th>
                <th style={styles.th}>FIELD</th>
                <th
                  style={{...styles.th, cursor: 'pointer', userSelect: 'none'}}
                  onClick={() => handleSort('team1')}
                >
                  HOME TEAM{getSortIndicator('team1')}
                </th>
                <th style={styles.thCenter}></th>
                <th style={styles.th}>AWAY TEAM</th>
                <th style={styles.th}>LOCATION</th>
                <th style={styles.th}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, idx) => {
                  const currentStatus = getGameStatus(match);
                  let rowColor;
                  if (currentStatus === 'Played') {
                    rowColor = '#dcfce7'; // Light green
                  } else if (currentStatus === 'Cancelled') {
                    rowColor = '#fee2e2'; // Light red
                  } else if (currentStatus === 'Rain Make Up') {
                    rowColor = '#fef3c7'; // Yellow
                  } else {
                    rowColor = idx % 2 === 0 ? '#ffffff' : '#f9fafb'; // Default alternating
                  }

                  return (
                    <tr
                      key={idx}
                      style={{
                        ...styles.tableRow,
                        backgroundColor: rowColor
                      }}
                    >
                      <td style={styles.td}>{formatDate(match.date)}</td>
                      <td style={{...styles.td, color: '#3562A6', fontWeight: '500'}}>{match.time}</td>
                      <td style={styles.td}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: getAgeGroupColor(match.ageGroup),
                            display: 'inline-block',
                            flexShrink: 0
                          }}></span>
                          <span style={{ fontWeight: '500' }}>{match.ageGroup}</span>
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.fieldBadge}>
                          {match.field}
                        </span>
                      </td>
                      <td style={{...styles.td, fontWeight: '500'}}>
                        <TeamFlag teamName={match.team1} />
                      </td>
                      <td style={{...styles.td, textAlign: 'center', color: '#9ca3af', fontSize: '12px'}}>vs</td>
                      <td style={{...styles.td, fontWeight: '500'}}>
                        <TeamFlag teamName={match.team2} />
                      </td>
                      <td style={{...styles.td, color: '#6b7280'}}>Merrick-Moore</td>
                      <td style={styles.td}>
                        <select
                          value={currentStatus}
                          onChange={(e) => updateGameStatus(match, e.target.value)}
                          style={styles.statusSelect}
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Played">Played</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Rain Make Up">Rain Make Up</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" style={styles.noResults}>
                    No matches found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #091442, #0E1E5B)',
  },
  header: {
    backgroundColor: '#0E1E5B',
    color: 'white',
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  icon: {
    fontSize: '1.875rem',
  },
  headerText: {
    fontSize: '1.125rem',
    marginBottom: '0.25rem',
  },
  headerTextSmall: {
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
  },
  headerTextTiny: {
    fontSize: '0.75rem',
    marginBottom: '0.25rem',
  },
  ageBanner: {
    backgroundColor: '#3562A6',
    color: 'white',
    padding: '0.75rem 1rem',
    textAlign: 'center',
  },
  ageBannerText: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    margin: 0,
    lineHeight: '1.6',
  },
  rainNotice: {
    backgroundColor: '#6594C0',
    color: '#0B0B0B',
    padding: '0.5rem 1rem',
    textAlign: 'center',
  },
  rainNoticeText: {
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    margin: 0,
  },
  filtersContainer: {
    backgroundColor: 'white',
    padding: '1rem',
  },
  filtersGrid: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  filterLabel: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.25rem',
    textTransform: 'uppercase',
  },
  select: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    backgroundColor: 'white',
  },
  tableContainer: {
    padding: '1rem',
  },
  tableWrapper: {
    maxWidth: '1280px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#091442',
    color: 'white',
  },
  th: {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  thCenter: {
    padding: '0.75rem 1rem',
    textAlign: 'center',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
    transition: 'background-color 0.2s',
  },
  td: {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
  },
  fieldBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    backgroundColor: '#3562A6',
    color: 'white',
  },
  noResults: {
    padding: '2rem 1rem',
    textAlign: 'center',
    color: '#6b7280',
  },
  statusSelect: {
    padding: '0.375rem 0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '110px',
  },
};

export default App;