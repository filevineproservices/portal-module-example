import React from 'react';

export default ({ ctx, location, routeTo }) => (
  <div>
    <h1>Sample</h1>
    <pre>{JSON.stringify({ ctx, location }, null, 2)}</pre>
    <button type="button" onClick={() => routeTo('/acme')}>
      Go back to demo
    </button>
  </div>
);
