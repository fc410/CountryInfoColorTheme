import NavigationBar from '../NavigationBar'
import axios from 'axios'
import {useState, useEffect, useRef} from 'react';
import {Card} from 'react-bootstrap';
import './index.css';

const LightMode = () => {
    const [data, setData] = useState([])
    const [isPressed, setIsPressed] = useState(false)
    const [filter, setFilter] = useState('')

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
    },[filter])

    console.log(data)
    return(
        <div className='lightmode-content'>
            <NavigationBar />
            <div className='search-dropdown'>
                <input type='text' className='search-input' placeholder='Search'/>
                <div className='dropdown'>
                    <button className='dropdown-button' onClick={() => setIsPressed(!isPressed)}>
                        <span>Filter by Region</span>    
                    </button> 
                    {isPressed ? 
                        <div className='dropdown-items'>
                            <a className='dropdown-item' href='#' onClick={handleAClick}>Africa</a>
                            <a className='dropdown-item' href='#' onClick={handleAClick}>America</a>
                            <a className='dropdown-item' href='#' onClick={handleAClick}>Asia</a>
                            <a className='dropdown-item' href='#' onClick={handleAClick}>Europe</a>
                            <a className='dropdown-item' href='#' onClick={handleAClick}>Oceania</a>
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