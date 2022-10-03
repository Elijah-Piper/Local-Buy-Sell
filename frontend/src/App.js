import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteNav from './Component/SiteNav';

import 'bootstrap/dist/css/bootstrap.min.css';
import Listings from './Component/Listings';
import ListingDetails from './Component/ListingDetails';

function App() {
  

  return (
    <Router>
      <div className="App">
        <SiteNav />
        <Routes>
          <Route path="/" element={ <Listings />} />
          <Route path="/listingdetails/:listingId" element={<ListingDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
