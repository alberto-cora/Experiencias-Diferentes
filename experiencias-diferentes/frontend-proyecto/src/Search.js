import './Search.css';
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
            <h2>Resultados:</h2> <hr></hr>
            {results &&
                results?.map((activity) => (
                    <li>
                        <div className="search-results">
                            <Link to={`/activity/${activity.id}`}>
                                Ir a...{activity.title}
                            </Link>
                            <br />
                            <img src={activity.image} alt="foto-actividad" />
                            <p>
                                <strong>Descripción:</strong>
                                {activity.description}
                            </p>
                            <p>
                                <strong>Precio:</strong>
                                {activity.price}€
                            </p>
                            <p>
                                <strong>Lugar:</strong>
                                {activity.location}
                            </p>
                            <p>
                                <strong>Fecha inicio:</strong>
                                {activity.startDate}
                            </p>
                            <p>
                                Search.css
                                <strong>Plazas totales:</strong>
                                {activity.totalPlaces}
                            </p>
                        </div>
                    </li>
                ))}
            {!results && <i>Loading...</i>}
            {results && results.length === 0 && <i>No hay resultados!</i>}
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
            <h1>Buscador actividades</h1>

            <Helmet>
                <title>Experiencias diferentes</title>
            </Helmet>
            <form className="formSearch">
                <label for="type">
                    <h2>Tipo de actividad:</h2>
                </label>
                <select
                    name="type"
                    id="type"
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value=""></option>
                    <option value="barranquismo">Barranquismo</option>
                    <option value="buceo">Buceo</option>
                    <option value="masaje">Masaje</option>
                    <option value="surf">Surf</option>
                    <option value="velero">Velero</option>
                </select>
                <h2>Lugar:</h2>

                <input
                    name="location"
                    placeholder="location..."
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <h2>Fecha inicio:</h2>

                <input
                    name="date"
                    placeholder="date..."
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <h2>Precio:</h2>

                <input
                    name="price"
                    placeholder="price..."
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button className="button-search">Buscar</button>
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
