import LightMode from './components/LightMode'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import NavigationBar  from './components/NavigationBar';
import CountryInfo from './components/CountryInfo';
import { createContext, useState } from 'react';
import ReactSwitch from 'react-switch';
import './App.css';

export const ThemeContext = createContext("light");

const App = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light"? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="App" id={theme}>
        <NavigationBar />
        <div className='switch'>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
        </div>
        <Routes>
          <Route index element={<LightMode />}/>
          <Route path='/:countryName' element={<CountryInfo/>} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
