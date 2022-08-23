import LightMode from './components/LightMode'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import NavigationBar  from './components/NavigationBar';
import CountryInfo from './components/CountryInfo';

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route index element={<LightMode />}/>
        <Route path='/:countryName' element={<CountryInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
