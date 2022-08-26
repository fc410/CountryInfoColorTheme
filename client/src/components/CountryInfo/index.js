import './index.css';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const CountryInfo = () => {
    const [data, setData] = useState()
    const [currencies, setCurrencies] = useState([])
    const [languages, setLanguages] = useState([])
    const [nativeNames, setNativeNames] = useState([])
    const [countryCodes, setCountryCodes] = useState([])
    const [borderCountries, setBorderCountries] = useState([])
    let countryName = window.location.pathname;

    countryName = countryName.replace('/', '');
    countryName = countryName.split('%20');
    countryName = countryName.join(' ');

    useEffect(() => {
       axios.get(`https://restcountries.com/v3.1/name/${countryName}`).then(response => {
        console.log(response.data[0])
        setData({

            name: countryName,
            image: response.data[0].flags.png,
            population: response.data[0].population,
            region: response.data[0].region,
            subRegion: response.data[0].subregion,
            capital: response.data[0].capital[0],
            topLevelDomain: response.data[0].tld[0],
        })
        
        for (let k in response.data[0].currencies) {
            setCurrencies(prev => [...prev, response.data[0].currencies[k].name])
        }

        for(let x in response.data[0].languages) {
            setLanguages(prev => [...prev, response.data[0].languages[x]])
        }

        for(let x in response.data[0].name.nativeName){
            setNativeNames(prev=> [...prev, response.data[0].name.nativeName[x].common])
        }

        if(response.data[0].borders){
            response.data[0].borders.forEach(country =>{
                setCountryCodes(prev => [...prev, country])
            })
        }
        else{
            setCountryCodes(['None'])
        }
       }) 
    },[])


    useEffect(() =>{

        countryCodes.forEach(country => {
            if(country === 'None'){
                setBorderCountries(['None'])
            }
            else{
                axios.get(`https://restcountries.com/v3.1/alpha?codes=${country}`).then(res =>{
                console.log(res.data[0].name.common)
                setBorderCountries(prev => [...prev, res.data[0].name.common])
            })
            }
        })
    }, [countryCodes])

    console.log(borderCountries)

    return(
        <div className='country-info-content'>
            <Link to='/' className='info-button'>
                <button className='button-info'>BACK</button>
            </Link>
            <div className='data-info'>
                {data ? <img src={data.image} className='flag-img'/> : null}
                <div className='country-name'>
                    {data ? <span className='name'>{data.name}</span> : null}
                    <div className='info-description'>
                        <div>
                        {data?
                            <div>
                                <div>
                                <span className='title'>Native Name:</span> {nativeNames[nativeNames.length - 1]}
                                </div>
                                <div>
                                    <span className='title'>Population:</span> {data.population.toLocaleString(undefined)}
                                </div>
                                <div>
                                    <span className='title'>Region:</span> {data.region}
                                </div>
                                <div>
                                    <span className='title'>Sub Region:</span> {data.subRegion}
                                </div>
                                <div>
                                    <span className='title'>Capital:</span> {data.capital}
                                </div> 
                            </div>:null}
                        </div>
                        <div className='right-info'>
                            {data ?
                                <div>
                                    <span className='title'>Top Level Domain:</span> {data.topLevelDomain}
                                </div>: null
                            }
                            {data ? 
                                <div>
                                    <span className='title'>Currency:</span> {currencies.join(', ')}
                                </div>: null
                            }
                            {data ? 
                                <div>
                                    <span className='title'>Languages:</span> {languages.join(', ')}
                                </div>:null
                            }
                        </div>
                    </div>
                    <div className='border-countries'>
                        <span className='title'>Border Countries: </span>
                        <div className='b-country'>
                            {borderCountries.map((country, idx) =>(
                                <div className='border-country' key={idx}>{country}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryInfo;