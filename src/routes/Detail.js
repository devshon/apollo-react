import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getById($id: String!) {
    movie(id: $id) {
      id
      title
      rating
      description_intro
      language
      medium_cover_image
      genres
    }
  }
`;

function Detail() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_MOVIE, {
    variables: { id: id },
  });

  const movie = data?.movie;

  return (
    <>
      {loading && <div></div>}
      {!loading && data && (
        <div>
          <span>{movie.title}</span>
          <span>{movie.description_intro}</span>
          <span>{movie.language}</span>
          <span>{movie.genres}</span>
          <span>{movie.rating}</span>
          <img alt={movie.title} src={movie.medium_cover_image} />
        </div>
      )}
      {error && <div>error 404</div>}
    </>
  );
}

export default Detail;
