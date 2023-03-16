import { useEffect, useState } from "react";
import axios from "axios";



const useSearch = ( toggle: boolean,limit:number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
 
  const [cats, setCats] = useState<any[]>([]);

  useEffect(() => {
    setError(false);
    setLoading(true);
    axios({
      method: "GET",
      url: `https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=${''}`,
    })
      .then((res) => {
       
        setCats([...cats, ...res.data]);
       
        setLoading(false);
        
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });

    
  }, [toggle]);

  return { loading, error, cats };
};

export default useSearch;
