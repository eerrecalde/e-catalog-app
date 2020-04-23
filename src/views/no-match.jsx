import React from 'react';
import { useLocation } from 'react-router-dom';

function NoMatch() {
  const location = useLocation();
  return (
    <div className="container">
      <h3>
        No match for
        <code className="pl-2">{location.pathname}</code>
      </h3>
    </div>
  );
}
export default NoMatch;
