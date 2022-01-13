import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getById($id: Int!) {
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
  const { loading, data } = useQuery(GET_MOVIE, { variables: { id: id } });

  console.log("Detail >>> ", loading, data, id);
  return (
    <div>
      <span>{id}</span>
    </div>
  );
}

export default Detail;
