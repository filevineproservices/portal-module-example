import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Demo from './Demo';
import Sample from './Sample';

function App() {
  const [ctx, setCtx] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    function handlePortalEvent(ev) {
      console.log('from portal:', ev);
      if (ev.data && ev.data.source === 'portal') {
        if (ev.data.type === 'context') {
          setCtx(ev.data.payload);
        } else if (ev.data.type === 'location') {
          setLocation(ev.data.payload);
        }
      }
    }

    parent.postMessage({
      source: window.name,
      type: 'ready'
    });

    window.addEventListener('message', handlePortalEvent);

    return () => {
      window.removeEventListener('message', handlePortalEvent);
    };
  }, []);

  function routeTo(to) {
    parent.postMessage({
      source: window.name,
      type: 'route',
      payload: to
    });
  }

  const filevineProps = { ctx, location, routeTo };

  return (
    <Router>
      <Switch location={location}>
        <Route
          exact
          path="/acme/sample"
          render={routeProps => <Sample {...routeProps} {...filevineProps} />}
        />
        <Route
          exact
          path="/acme"
          render={routeProps => <Demo {...routeProps} {...filevineProps} />}
        />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
console.log('Rendering to the portal...');
