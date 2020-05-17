import React from "react";
import { Link } from "@reach/router";

// props are the attributes passed by the parent
export default function Pet({ name, animal, breed, media, location, id }) {

  let hero = 'http://placecorgi.com/300/300';

  if (media.length) {
    hero = media[0].small;
  }
    return (
      /* If we use Link, the theme is kept between pages because it's kept at the App level 
    and App is never unmounted so its state persists between route changes; if we use navigate, 
  with <a> tag this will not work */
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
        </div>
      </Link>
    );

  /*  return React.createElement("div", {}, [
        React.createElement("h1", {}, name),
        React.createElement("h2", {}, animal),
        React.createElement("h2", {}, breed)
    ]); */

  /* return (
    <div>
      <h1>{name}</h1>
      <h2>{animal}</h2>
      <h2>{breed}</h2>
    </div>
  ); */
}

