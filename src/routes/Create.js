import React, { useCallback, useRef, useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { v4 as uuidv4 } from "uuid";

const _ = require("lodash");

const CREATE_MOVIE = gql`
  mutation getParams(
    $id: String!
    $title: String!
    $rating: Float
    $description_intro: String
    $language: String
    $medium_cover_image: String
    $genres: [String]
    $postedAt: String!
    $updatedAt: String!
  ) {
    addMovie(
      id: $id
      title: $title
      rating: $rating
      description_intro: $description_intro
      language: $language
      medium_cover_image: $medium_cover_image
      genres: $genres
      postedAt: $postedAt
      updatedAt: $updatedAt
    ) {
      id
    }
  }
`;

const Create = (props) => {
  const [onCreateMovie, { loading, error, data }] = useMutation(CREATE_MOVIE);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("0");
  const [description_intro, setDescription_intro] = useState("");
  const [language, setLanguage] = useState("en");
  const [medium_cover_image, setMedium_cover_image] = useState("");
  const [genres, setGenres] = useState([]);

  const ratingMap = ["0", "1", "2", "3", "4", "5"];
  const languageMap = ["en", "ko", "co", "jp"];
  const genresMap = ["drama", "action", "comic", "romance"];

  function onCreate() {
    onCreateMovie({
      variables: {
        id: uuidv4(),
        title: title,
        rating: Number(rating),
        description_intro: description_intro,
        language: language,
        medium_cover_image: medium_cover_image,
        genres: genres,
        postedAt: String(new Date()),
        updatedAt: String(new Date()),
      },
    });
    setTitle("");
    setRating("0");
    setDescription_intro("");
    setLanguage("en");
    setMedium_cover_image("");
    setGenres([]);
  }

  console.log("create >>> ", loading, error, data);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <input
          type="text"
          placeholder="영화명 입력"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <textarea
          minLength="3"
          placeholder="영화설명 입력"
          rows="6"
          value={description_intro}
          onChange={(e) => {
            setDescription_intro(e.target.value);
          }}
        />
      </div>
      <div>
        <select
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
          }}
        >
          {ratingMap.map((rating, i) => {
            return (
              <option key={i} value={rating}>
                {rating}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          {languageMap.map((lang, i) => {
            return (
              <option key={i} value={lang}>
                {lang}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {genresMap.map((_genres, i) => {
          return (
            <span key={i}>
              <label htmlFor={_genres}>
                <input
                  type="checkbox"
                  id={_genres}
                  checked={genres.includes(_genres)}
                  onChange={(e) => {
                    if (genres.includes(e.target.id)) {
                      const index = genres.indexOf(e.target.id);
                      let arr = genres;
                      arr.splice(index, 1);
                      setGenres(_.union(arr, genres));
                    } else {
                      let arr = [];
                      arr.push(e.target.id);
                      setGenres(_.union(arr, genres));
                    }
                  }}
                />
                {_genres}
              </label>
            </span>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="영화포스터 이미지 링크 입력"
          value={medium_cover_image}
          onChange={(e) => {
            setMedium_cover_image(e.target.value);
          }}
        />
      </div>
      <div
        onClick={() => {
          onCreate();
        }}
      >
        <span>create</span>
      </div>
    </div>
  );
};

export default Create;
