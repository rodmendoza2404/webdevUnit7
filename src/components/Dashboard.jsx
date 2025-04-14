import { useState, useEffect } from 'react';
import Header from './Header';
import BreweryCard from './BreweryCard';
import Stats from './Stats';

function Dashboard() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    byType: {},
    byState: {},
    avgLatitude: 0
  });

  const breweryTypes = ['all', ...new Set(breweries.map(brewery => brewery.brewery_type))].filter(Boolean);
  const states = ['all', ...new Set(breweries.map(brewery => brewery.state))].filter(Boolean);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/breweries?per_page=100`);
        const data = await response.json();
        setBreweries(data);
        setFilteredBreweries(data);
        calculateStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching breweries:', error);
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  useEffect(() => {
    let results = breweries;

    if (searchTerm) {
      results = results.filter(brewery =>
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (brewery.city && brewery.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (brewery.state && brewery.state.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      results = results.filter(brewery => brewery.brewery_type === selectedType);
    }

    if (selectedState !== 'all') {
      results = results.filter(brewery => brewery.state === selectedState);
    }

    setFilteredBreweries(results);
  }, [searchTerm, selectedType, selectedState, breweries]);

  const calculateStats = (data) => {
    const total = data.length;

    const byType = data.reduce((acc, brewery) => {
      const type = brewery.brewery_type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const byState = data.reduce((acc, brewery) => {
      const state = brewery.state || 'unknown';
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});

    const breweriesWithLatitude = data.filter(brewery => brewery.latitude);
    const avgLatitude = breweriesWithLatitude.length
      ? breweriesWithLatitude.reduce((sum, brewery) => sum + parseFloat(brewery.latitude), 0) / breweriesWithLatitude.length
      : 0;

    setStats({
      total,
      byType,
      byState,
      avgLatitude
    });
  };

  return (
    <div className="app">
      <Header />

      <div className="container">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search breweries by name, city, or state"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="filters">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              {breweryTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="filter-select"
            >
              {states.map(state => (
                <option key={state} value={state}>
                  {state === 'all' ? 'All States' : state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Stats stats={stats} filteredCount={filteredBreweries.length} />

        <div className="breweries-list">
          {loading ? (
            <p className="loading">Loading breweries...</p>
          ) : filteredBreweries.length > 0 ? (
            filteredBreweries.map(brewery => (
              <BreweryCard key={brewery.id} brewery={brewery} />
            ))
          ) : (
            <p className="no-results">No breweries found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
