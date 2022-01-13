import React, { useState } from "react";

import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

function Movie(props) {
  const { id, title, rating, medium_cover_image, genres } = props;
  const [hover, setHover] = useState(false);
  return (
    <Link to={`/movie/${id}`} style={{ zIndex: hover ? 1 : 0 }}>
      <div className="MoviePoster">
        <div className="MoviePosterShadow">
          <img
            className="MoviePosterImg"
            alt={title}
            src={medium_cover_image}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
          <div
            className="MovieHoverSider"
            style={{ justifyContent: "space-between" }}
          >
            <span
              style={{
                justifyContent: "space-between",
                flexWrap: "nowrap",
                marginLeft: "5px",
                marginTop: "5px",
                marginRight: "5px",
              }}
            >
              <span style={{ fontSize: "22px" }}>{title}</span>
              <span style={{ color: "#ffeb3b", display: "flex" }}>
                <BsStarFill />
                <span
                  style={{
                    marginLeft: "5px",
                  }}
                >
                  {rating}
                </span>
              </span>
            </span>
            <span>
              {genres &&
                genres.map((item) => {
                  return (
                    <span
                      key={item}
                      style={{
                        margin: "5px",
                      }}
                    >
                      {" "}
                      #{item}{" "}
                    </span>
                  );
                })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Movie;
