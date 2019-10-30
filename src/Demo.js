import React from 'react';

export default ({ ctx, location, routeTo }) => (
  <div>
    <h1>Demo</h1>
    <pre>{JSON.stringify({ ctx, location }, null, 2)}</pre>
    <button type="button" onClick={() => routeTo('/acme/sample')}>
      Go to sample
    </button>
  </div>
);
