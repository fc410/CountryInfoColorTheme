import './index.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const SearchBar = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchPressed, setSearchPressed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if(searchTerm !== ''){
            console.log(searchTerm)
            setSearchResults([])
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

    // const handleSearch = (event) =>{
    //     // console.log(event)
    //     // setSearchPressed(!searchPressed)
    //     // setSearchTerm('')
    // }

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        setSearchPressed(!searchPressed)
    }

    return (
        <div className='search-content'>
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
                            // onClick={handleSearch}
                        >
                            <img src={country.image} alt='county-img' style={{width: '25px', marginRight:'5px'}}/>
                            {country.name}
                        </Link>
                    ))}
                </div>: null
            }
        </div>
    )
}

export default SearchBar;