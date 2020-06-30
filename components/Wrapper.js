import * as React from 'react';
import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

import MyWidget from '../../.';

export default function Wrapper({ mapView }) {
  const [modules, setModules] = useState();

  useEffect(() => {
    // this is where we use esri-loader to pass into MyWidget as PROPS any JS API Module we need
    loadModules(['esri/widgets/Sketch']).then(modules => {
      setModules(modules);
    });
  }, []);

  return (
    <div className="wrapperComponent">
      <MyWidget
        mapView={mapView}
        modules={modules}
        featureLayerId={'testLayerId'}
      ></MyWidget>
    </div>
  );
}
