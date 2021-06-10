import { useState, useEffect } from "react";
import { useUser } from "./UserContext";

function useFetch(url) {
  const [data, setData] = useState(null);
  const user = useUser();

  useEffect(() => {
    const opts = {};
    if (user && user.token) {
      opts.headers = { Authorization: "Bearer " + user.token };
    }
    fetch(url, opts)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url, user]);

  return data;
}

export default useFetch;
