import Helmet from 'react-helmet';
// import { useDispatch } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import { useState } from "react";
import Search from './Search';

function Home() {
    // const dispatch = useDispatch();
    // const { q } = useParams();
    // const history = useHistory();
    // const [search, setSearch] = useState(q || "");

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   history.push("/search/" + search);
    //   // dispatch({ type: "SEARCH", search });
    // };
    return (
        <div className="home">
            <h1>Home</h1>
            <Helmet>
                <title>Experiencias diferentes - Home</title>
            </Helmet>
            Welcome to the web where your adventures can come true
            <Search />
            <hr />
        </div>
    );
}

export default Home;
