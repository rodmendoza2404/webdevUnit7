import React from 'react';
import './Stats.css';

const Stats = ({ stats, filteredCount }) => {
  // Get the top brewery type
  const getTopBreweryType = () => {
    if (!stats.byType || Object.keys(stats.byType).length === 0) return 'N/A';
    
    const topType = Object.entries(stats.byType)
      .sort((a, b) => b[1] - a[1])[0];
    
    return {
      type: topType[0].charAt(0).toUpperCase() + topType[0].slice(1),
      count: topType[1]
    };
  };

  // Get the top state
  const getTopState = () => {
    if (!stats.byState || Object.keys(stats.byState).length === 0) return 'N/A';
    
    const topState = Object.entries(stats.byState)
      .sort((a, b) => b[1] - a[1])[0];
    
    return {
      state: topState[0],
      count: topState[1]
    };
  };

  const topType = getTopBreweryType();
  const topState = getTopState();

  return (
    <div className="stats-container">
      <h2>Dashboard Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Breweries</h3>
          <p className="stat-value">{stats.total}</p>
          <p className="stat-detail">
            {filteredCount !== stats.total ? `(${filteredCount} filtered)` : ''}
          </p>
        </div>
        
        <div className="stat-card">
          <h3>Most Common Type</h3>
          <p className="stat-value">{topType.type}</p>
          <p className="stat-detail">
            {topType.count} breweries ({((topType.count / stats.total) * 100).toFixed(1)}%)
          </p>
        </div>
        
        <div className="stat-card">
          <h3>Most Popular State</h3>
          <p className="stat-value">{topState.state}</p>
          <p className="stat-detail">
            {topState.count} breweries ({((topState.count / stats.total) * 100).toFixed(1)}%)
          </p>
        </div>
        
        <div className="stat-card">
          <h3>Average Latitude</h3>
          <p className="stat-value">{stats.avgLatitude.toFixed(2)}°</p>
          <p className="stat-detail">
            Geographical distribution
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;