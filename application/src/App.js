import logo from './logo.svg';
import './App.css';
import LeafletMap from './components/map/LeafletMap'
import Calculator from './components/Calculator'
import React from "react";
import Routes from './components/Routes'
import NavBar from './components/NavBar'
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import {BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
        const routeComponents = Routes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />);

  return (
    <div className="App">
      <Router>
      <NavBar/>
        {routeComponents}
      </Router>

    </div>
  );
}

export default App;
