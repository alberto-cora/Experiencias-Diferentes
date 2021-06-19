import { useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import { useLocation } from 'react-router-dom';

function SearchResults({ searchQuery }) {
    const results = useFetch(
        `http://localhost:3080/api/activities?${searchQuery}`
    );

    return (
        <div className="results">
            <h2>Results:</h2> <hr></hr>
            {results &&
                results?.map((activity) => (
                    <li>
                        <div>
                            <Link to={`/activity/${activity.id}`}>
                                {activity.title}
                            </Link>
                            <img src={activity.image} alt="" />
                            <p>{activity.description}</p>
                            <p>{activity.price}</p>
                            <p>{activity.location}</p>
                            <p>{activity.startDate}</p>
                        </div>
                    </li>
                ))}
            {!results && <i>Loading...</i>}
            {results && results.length === 0 && <i>No results found!</i>}
        </div>
    );
}

function Search() {
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');

    const search = useLocation().search;
    const locationParam = new URLSearchParams(search).get('location');
    const typeParam = new URLSearchParams(search).get('type');
    const priceParam = new URLSearchParams(search).get('price');
    const dateParam = new URLSearchParams(search).get('date');

    return (
        <div className="search">
            <h1>Activities finder</h1>

            <Helmet>
                <title>Experiencias diferentes</title>
            </Helmet>
            <form>
                <input
                    name="type"
                    placeholder="type..."
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />

                <input
                    name="location"
                    placeholder="locatio.."
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <input
                    name="date"
                    placeholder="date..."
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    name="price"
                    placeholder="price..."
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button>Search</button>
            </form>
            {(locationParam || typeParam || priceParam || dateParam) && (
                <SearchResults
                    searchQuery={
                        (locationParam && `location=${locationParam}`) +
                        (typeParam && `&type=${typeParam}`) +
                        (priceParam && `&price=${priceParam}`) +
                        (dateParam && `&date=${dateParam}`)
                    }
                />
            )}
        </div>
    );
}

export default Search;
