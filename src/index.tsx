import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

export default ({ mapView, modules, featureLayerId }) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const [intersectingFeatureCount, setIntersectingFeatureCount] = useState<
    number
  >(0);

  const drawCreateHandler = evt => {
    // Find the feature layer to use:
    const fl = mapView.map.layers.find(l => l.id === featureLayerId);

    // The first time, clear out the grapics in the layer
    if (evt.state === 'start') {
      mapView.graphics.removeAll();
    }

    // When complete, query the feature service for the count.
    if (evt.state === 'complete' && fl) {
      const queryParams = fl.createQuery();
      queryParams.geometry = evt.graphic.geometry;
      fl.queryFeatureCount(queryParams).then(
        result => {
          setIntersectingFeatureCount(result);
        },
        err => {
          console.log('error', err);
        }
      );
    }
  };

  useEffect(() => {
    if (mapView && modules) {
      // JS API MapView is ready - do anything you need to do here!
      console.log('MyWidget:: mapView Ready!', mapView);

      const [Sketch] = modules;

      // Create the sketch widget:
      const sketch = new Sketch({
        layer: mapView.graphics,
        view: mapView,
        availableCreateTools: ['polygon', 'rectangle', 'circle'],
        container: sketchRef.current,
      });

      sketch.on('create', drawCreateHandler);
    }
  }, [mapView, modules, featureLayerId]);
  return (
    <div>
      <div ref={sketchRef}></div>
      <div>Intersecting Features: {intersectingFeatureCount}</div>
    </div>
  );
};
