import * as React from 'react';
import { useMap, useWatch } from 'esri-loader-hooks';
import { loadModules } from 'esri-loader';

export default function Map({ viewReady }) {
  const map = {
    basemap: 'hybrid',
  };
  const options = {
    view: {
      center: [-70, -20],
      zoom: 4,
    },
  };
  // https://github.com/tomwayson/esri-loader-hooks#usemap
  const [ref, view] = useMap(map, options);

  const onUpdateChange = async evt => {
    if (evt === true) {
      // View is ready.

      // Add a FeatureLayer to snap to in GoodBoundaries.js
      const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);

      // If your layer is private, uncomment this section (from
      // https://developers.arcgis.com/javascript/latest/sample-code/identity-oauth-basic/index.html)
      // var info = new OAuthInfo({
      //   appId: "",
      //   popup: false
      // });
      // esriId.registerOAuthInfos([info]);

      const testingFeatureLayer = new FeatureLayer({
        portalItem: {
          id: '6996f03a1b364dbab4008d99380370ed',
        },
        id: 'testLayerId'
      });

      view.map.layers.add(testingFeatureLayer);

      // Lift the "view" state UP to the parent component:
      // https://reactjs.org/docs/lifting-state-up.html
      viewReady(view);
    }
  };
  // https://github.com/tomwayson/esri-loader-hooks#usewatch
  useWatch(view, 'ready', onUpdateChange);

  return <div className="MapComponent" ref={ref} />;
}
