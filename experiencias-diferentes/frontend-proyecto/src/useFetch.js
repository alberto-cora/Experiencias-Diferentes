import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function useFetch(url, n) {
  const [data, setData] = useState(null);
  const user = useSelector((s) => s.user);
  useEffect(() => {
    const opts = {};
    if (user && user.token) {
      opts.headers = { Authorization: 'Bearer ' + user.token };
    }
    fetch(url, opts)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url, user, n]);

  return data;
}

export default useFetch;
