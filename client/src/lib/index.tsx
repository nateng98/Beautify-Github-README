import { useEffect, useState } from "react";
import { config } from '../../config';

export const getData = async(endpoint: string) => {
	try {
		// Distributed Computing
		// await keyword pauses execution until the fetch promise resolves
		const response = await fetch(endpoint, { // makes an HTTP request to the given endpoint using 'GET' method 
			method:'GET', 
			headers: {
				'Content-Type' : 'application/json', // the request includes headers specifying that the content type is json
			},
		});
		if(!response.ok){ // if the status is NOT 'OK'
			throw new Error('Data fetching error' + response?.statusText)
		}
		const data = await response.json();
    return data;
	} catch (error) {
		console.log('Error while fetching data', error);
		throw error;
	}
}

export const fetchHelper = ({props} : {props: String}) => {
	const [things, setThings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/${props}`;
      try {
        const data = await getData(endpoint);
        // console.log('data', data);
        setThings(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);
	return things;
}