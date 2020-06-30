/// <reference types="@types/arcgis-js-api" />
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

export default ({
  mapView,
  modules,
  featureLayerId,
}: {
  mapView: __esri.MapView;
  modules: any[];
  featureLayerId: string;
}) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const [intersectingFeatureCount, setIntersectingFeatureCount] = useState<
    number
  >(0);

  const drawCreateHandler: __esri.SketchCreateEventHandler = (
    evt: __esri.SketchCreateEvent
  ) => {
    // Find the feature layer to use:
    const fl: __esri.FeatureLayer = mapView.map.layers.find(
      l => l.id === featureLayerId
    ) as __esri.FeatureLayer;

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
      const sketch: __esri.Sketch = new Sketch({
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
