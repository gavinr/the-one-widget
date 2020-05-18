import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Widget from '../.';

const App = () => {
  return (
    <div>
      <Widget />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
