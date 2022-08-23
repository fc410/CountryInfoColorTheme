import './index.css';
import { useEffect } from 'react';
import axios from 'axios';

const CountryInfo = () => {
    let countryName = window.location.pathname

    countryName = countryName.replace('/', '')
    console.log(countryName)

    useEffect(() => {
       axios.get(`https://restcountries.com/v3.1/name/${countryName}`).then(response => {
        console.log(response);
       }) 
    },[])

    return(
        <div className='country-info-content'>
            {countryName}
        </div>
    )
}

export default CountryInfo;