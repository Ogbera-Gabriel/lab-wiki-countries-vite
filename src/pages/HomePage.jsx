import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [countries, setCountries] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://ih-countries-api.herokuapp.com/countries');
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container' style={{ maxHeight: "90vh", overflow: "scroll" }}>
           <h1 style={{ fontSize: "24px" }}>WikiCountries: Your Guide to the World</h1> 
            {isLoading && <p>Loading...</p>}
            {countries.map((data) => (
                <div key={data.alpha3Code} className="list-group">
                  
                    <a className='list-group-item list-group-item-action'>  <img src={`https://flagpedia.net/data/flags/icon/72x54/${data.alpha2Code.toLowerCase()}.png`} alt={`${data.name} flag`} width={20} height={20}/>{data.name.common}</a>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
