import React from 'react';

function About(props) {
  return (
    <div className="about">
      <div className="container">
        <h2>About</h2>
        <h2>{JSON.stringify(props)}</h2>
      </div>
    </div>
  );
}

export default About;
