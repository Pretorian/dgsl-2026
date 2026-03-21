import React, { useState, useMemo } from 'react';

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
      const ageGroupMatch = selectedAgeGroup === 'all' || match.ageGroup === selectedAgeGroup;
      const fieldMatch = selectedField === 'all' || match.field === selectedField;
      const dateMatch = selectedDate === 'all' || match.date === selectedDate;
      const teamMatch = selectedTeam === 'all' || 
        match.team1 === selectedTeam || match.team2 === selectedTeam;
      const gameMatch = showGames === 'all' || 
        (showGames === 'rain' && match.status === 'Rain Make Up') ||
        (showGames === 'scheduled' && !match.status);
      
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
  }, [selectedAgeGroup, selectedField, selectedDate, selectedTeam, showGames, sortConfig]);

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
          <span>🏆</span> Ages {selectedAgeGroup === 'all' ? '6-13' : selectedAgeGroup}: Upper Fields 1 - 3
        </h2>
      </div>

      <div style={styles.rainNotice}>
        <p style={styles.rainNoticeText}>
          <span>⚠️</span> Rain Make Up games highlighted in yellow
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
              </tr>
            </thead>
            <tbody>
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, idx) => (
                  <tr 
                    key={idx} 
                    style={{
                      ...styles.tableRow,
                      backgroundColor: match.status === 'Rain Make Up' ? '#fef3c7' : (idx % 2 === 0 ? '#ffffff' : '#f9fafb')
                    }}
                  >
                    <td style={styles.td}>{formatDate(match.date)}</td>
                    <td style={{...styles.td, color: '#2563eb', fontWeight: '500'}}>{match.time}</td>
                    <td style={styles.td}>
                      <span style={styles.fieldBadge}>
                        {match.field}
                      </span>
                    </td>
                    <td style={{...styles.td, fontWeight: '500'}}>{match.team1}</td>
                    <td style={{...styles.td, textAlign: 'center', color: '#9ca3af', fontSize: '12px'}}>vs</td>
                    <td style={{...styles.td, fontWeight: '500'}}>{match.team2}</td>
                    <td style={{...styles.td, color: '#6b7280'}}>Merrick-Moore</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={styles.noResults}>
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
    background: 'linear-gradient(to bottom right, #1e3a8a, #1e40af)',
  },
  header: {
    backgroundColor: '#1e40af',
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
    backgroundColor: '#16a34a',
    color: 'white',
    padding: '0.75rem 1rem',
    textAlign: 'center',
  },
  ageBannerText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    margin: 0,
  },
  rainNotice: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
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
    backgroundColor: '#1f2937',
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
    backgroundColor: '#16a34a',
    color: 'white',
  },
  noResults: {
    padding: '2rem 1rem',
    textAlign: 'center',
    color: '#6b7280',
  },
};

export default App;