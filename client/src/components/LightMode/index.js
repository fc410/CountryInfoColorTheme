import NavigationBar from '../NavigationBar'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react';
import {Card} from 'react-bootstrap';
import './index.css';
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar';

const LightMode = () => {
    const [data, setData] = useState([])
    const [isPressed, setIsPressed] = useState(false)
    const [filter, setFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() =>{
        axios.get('https://restcountries.com/v3.1/all').then(res=>{
            let toInsert = res.data.map((country) =>({
                name: country.name.common,
                population: country.population,
                region: country.region,
                capital: country.capital,
                image: country.flags.png
            }))

            setData((prev) => [...prev, ...toInsert])
        })
    }, [])

    const handleAClick = (event) => {
        setFilter(event.target.firstChild.data)
        setIsPressed(!isPressed)
    }

    useEffect(() => {
        setData([])
        if(filter !== ''){
            axios.get(`https://restcountries.com/v3.1/region/${filter}`).then((res) => {
            console.log(res)

            let toInsert = res.data.map((country) =>({
                name: country.name.common,
                population: country.population,
                region: country.region,
                capital: country.capital,
                image: country.flags.png
            }))

            setData((prev) => [...prev, ...toInsert])

        })
        }
        
    },[filter])

    console.log(searchTerm)

    return(
        <div className='lightmode-content'>
            <div className='search-dropdown'>
                <SearchBar />

                <div className='dropdown'>
                    <button className='dropdown-button' onClick={() => setIsPressed(!isPressed)}>
                        <span>Filter by Region</span>    
                    </button> 
                    {isPressed ? 
                        <div className='dropdown-items'>
                            <a className='dropdown-item' onClick={handleAClick}>Africa</a>
                            <a className='dropdown-item' onClick={handleAClick}>America</a>
                            <a className='dropdown-item' onClick={handleAClick}>Asia</a>
                            <a className='dropdown-item' onClick={handleAClick}>Europe</a>
                            <a className='dropdown-item' onClick={handleAClick}>Oceania</a>
                        </div>: null
                    }
                </div>
            </div>
            <div className='grid-box'>
                {data ? data.map((country, idx) =>(
                    <Card className='country-card' key={idx}>
                        <Link
                            to={`/${country.name}`}
                        >
                            <Card.Img src={country.image} style={{height: '175px'}}/>
                        </Link>
                        <Card.Title style={{textAlign:'center', marginTop: '5px'}} className='card-title'>{country.name}</Card.Title>
                        <Card.Body style={{fontSize: '14px'}}>
                            <div className='card-text'>
                                <span className='body-text'>Population:</span> {country.population.toLocaleString(undefined)}
                            </div>
                            <div className='card-text'>
                                <span className='body-text'>Region:</span> {country.region}
                            </div>
                            <div className='card-text'>
                                <span className='body-text'>Capital:</span> {country.capital}
                            </div>
                        </Card.Body>
                    </Card>
                )) : null}
            </div>
        </div>
    )
}

export default LightMode;