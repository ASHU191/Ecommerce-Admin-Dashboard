import { useEffect, useState } from "react";

const useDoubleFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);


  useEffect(()=>{
    setLoading(true);
    setError(false);

    Promise.all(url.map(url => fetch(url)))
    .then(res => {
      setLoading(false);
      return Promise.all(res.map(res => res.json()))
    })
    .then(data => {
      setData1(data[0]);
      setData2(data[1])
    })
    .catch(error => {
      setLoading(false)
      setError(error.message)
    })
    // eslint-disable-next-line
  },[])

  return { data1, data2, error, loading };
};

export default useDoubleFetch;
