import 'react-app-polyfill/ie11';
import "./index.css";
import * as React from 'react';
import {useState} from 'react';
import * as ReactDOM from 'react-dom';

import Map from "./components/Map";
import Wrapper from "./components/Wrapper";

import { setDefaultOptions } from "esri-loader";

// for all Esri maps, load the css:
setDefaultOptions({ css: true });

const App = () => {
  const [mapView, setMapView] = useState(false);

  return (
    <div className="App">
      <Map
        viewReady={(view) => {
          setMapView(view);
        }}
      ></Map>
      <Wrapper mapView={mapView}></Wrapper>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
