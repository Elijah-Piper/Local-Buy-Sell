import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteNav from './Component/SiteNav';

import 'bootstrap/dist/css/bootstrap.min.css';
import Listings from './Component/Listings';

function App() {
  

  return (
    <div className="App">
      <SiteNav />
      <Listings />
    </div>
  );
}

export default App;
