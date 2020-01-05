import React from 'react';

function Loading() {
  return (
    <div className="spinner-wrapper p-3">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
