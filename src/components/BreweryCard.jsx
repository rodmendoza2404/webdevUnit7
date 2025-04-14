import { Link } from 'react-router-dom';

function BreweryCard({ brewery }) {
  return (
    <div className="brewery-card">
      <Link to={`/detail/${brewery.id}`}>
        <h3>{brewery.name}</h3>
      </Link>
      <p>{brewery.city}, {brewery.state}</p>
    </div>
  );
}

export default BreweryCard;
