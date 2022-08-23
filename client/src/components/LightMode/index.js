import NavigationBar from '../NavigationBar'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react';
import {Card} from 'react-bootstrap';
import './index.css';
import {Link} from 'react-router-dom';

const LightMode = () => {
    const [data, setData] = useState([])
    const [isPressed, setIsPressed] = useState(false)
    const [filter, setFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([],)
    const [searchPressed, setSearchPressed] = useState(false)

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
        console.log(filter)
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

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        setSearchPressed(!searchPressed)
    }

    useEffect(() => {
        if(searchTerm !== ''){
            axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`).then(
                res=>{
                    console.log(res)
                    let toInsert = res.data.map((country) =>({
                        name: country.name.common,
                        image: country.flags.png,
                    }))

                    setSearchResults((prev) => [...prev, ...toInsert])
                }
            )
        }
    },[searchTerm])

    const handleSearch = (event) =>{
        console.log(event)
        setSearchPressed(!searchPressed)
        setSearchTerm('')
    }

    console.log(searchResults)

    return(
        <div className='lightmode-content'>
            <div className='search-dropdown'>
                <div>
                    <input 
                        type='search' 
                        className='search-input' 
                        placeholder='Search'
                        value={searchTerm}
                        onChange={handleChange}
                    />
                        {searchPressed ? 
                            <div
                                className='search-results' 
                                style={{overflowY:'auto'}}
                            >
                                {searchResults.map((country, idx) =>(
                                    <Link 
                                        to={`/${country.name}`}
                                        key={idx} 
                                        className='searchItem'
                                        onClick={handleSearch}
                                    >
                                        <img src={country.image} alt='county-img' style={{width: '25px', marginRight:'5px'}}/>
                                        {country.name}
                                        
                                    </Link>
                                ))}
                            </div>: null
                        }

                </div>

                <div className='dropdown'>
                    <button className='dropdown-button' onClick={() => setIsPressed(!isPressed)}>
                        <span>Filter by Region</span>    
                    </button> 
                    {isPressed ? 
                        <div className='dropdown-items'>
                            <a className='dropdown-item' href='africa' onClick={handleAClick}>Africa</a>
                            <a className='dropdown-item' href='america' onClick={handleAClick}>America</a>
                            <a className='dropdown-item' href='asia' onClick={handleAClick}>Asia</a>
                            <a className='dropdown-item' href='europe' onClick={handleAClick}>Europe</a>
                            <a className='dropdown-item' href='oceania`' onClick={handleAClick}>Oceania</a>
                        </div>: null
                    }
                </div>
            </div>
            <div className='grid-box'>
                {data ? data.map((country, idx) =>(
                    <Card className='country-card' key={idx}>
                        <Card.Img src={country.image} style={{height: '175px'}}/>
                        <Card.Title style={{textAlign:'center'}}>{country.name}</Card.Title>
                        <Card.Body>
                            <div>
                                <span className='body-text'>Population:</span> {country.population.toLocaleString(undefined)}
                            </div>
                            <div>
                                <span className='body-text'>Region:</span> {country.region}
                            </div>
                            <div>
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