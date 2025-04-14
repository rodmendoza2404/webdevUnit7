import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';

function DetailView() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/breweries/${id}`);
        const data = await res.json();
        setBrewery(data);
      } catch (error) {
        console.error('Error fetching brewery:', error);
      }
    };

    fetchBrewery();
  }, [id]);

  if (!brewery) return <p>Loading brewery details...</p>;

  return (
    <div className="app">
      <Header />
      <div className="container">
        <h2>{brewery.name}</h2>
        <p><strong>Type:</strong> {brewery.brewery_type}</p>
        <p><strong>City:</strong> {brewery.city}</p>
        <p><strong>State:</strong> {brewery.state}</p>
        <p><strong>Website:</strong> <a href={brewery.website_url} target="_blank">{brewery.website_url}</a></p>
        <p><strong>Address:</strong> {brewery.street}</p>
        <p><strong>Phone:</strong> {brewery.phone}</p>
      </div>
    </div>
  );
}

export default DetailView;
