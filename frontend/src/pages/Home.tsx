import React from 'react';

const Home = (props: {name: string}) => {
  return (
      <>
        <h1>Home Page</h1>
        <p>
          {props.name ? `Welcome back ${props.name}` : 'You are not authenticated'}
        </p>
      </>
  );
}
export default Home
