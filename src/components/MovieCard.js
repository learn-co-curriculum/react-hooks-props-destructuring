import React from "react";

function MovieCard({
  title,
  posterSrc = "http://i.imgur.com/bJw8ndW.png",
  genres,
}) {
  return (
    <div className="movie-card">
      <img src={posterSrc} alt={title} />
      <h2>{title}</h2>
      <small>{genres.join(", ")}</small>
    </div>
  );
}

export default MovieCard;
