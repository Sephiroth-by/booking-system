import React from 'react';

function Home(props) {
  const movies = props.movies.movies.map((movie) => (
    <div key={movie._id}>{movie.name}</div>
  ));

  return (
    <div>
      <h4>Home</h4>
      {movies}
    </div>
  );
}

export default Home;
