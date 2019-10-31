import React from 'react';

export default ({ ctx, location, routeTo }) => (
  <div>
    <h1>Demo</h1>
    <pre>{JSON.stringify({ ctx, location }, null, 2)}</pre>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '1rem'
      }}
    >
      <button type="button" onClick={() => routeTo('/acme/sample')}>
        Go to sample
      </button>
      <button type="button" onClick={() => routeTo('/acme/projects')}>
        Go to projects
      </button>
    </div>
  </div>
);
