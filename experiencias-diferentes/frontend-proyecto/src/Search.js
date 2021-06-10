import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Helmet from "react-helmet";

function Search() {
  const { q } = useParams();
  const history = useHistory();
  const [search, setSearch] = useState(q || "");
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/search/" + search);
    // dispatch({ type: "SEARCH", search });
  };

  return (
    <div className="search">
      <h1>Activities finder</h1>
      <Helmet>
        <title>Experiencias diferentes - {q ? "Search: " + q : "Search"}</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select name="select">
          <option value="value1">Price</option>
          <option value="value2">Location</option>
          <option value="value3">Date</option>
          <option value="value4">Type</option>
        </select>
        <button>Search</button>
      </form>
    </div>
  );
}

export default Search;
