import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { v4 as uuidv4 } from "uuid";
import { IoMdArrowBack } from "react-icons/io";
import { Modal, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

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
  // const [craeteModal, setCraeteModal] = useState(false);

  const ratingMap = ["0", "1", "2", "3", "4", "5"];
  const languageMap = ["EN", "KO", "JP", "CA"];
  const genresMap = ["drama", "action", "comic", "romance"];

  function onCreate() {
    if (title === "") {
      alert("영화명을 입력해주세요!");
      return;
    }
    if (medium_cover_image === "") {
      alert("영화포스터 이미지 링크를 입력해주세요!");
      return;
    }
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
    <Layout
      style={{
        height: "100%",
      }}
    >
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "90%",
          margin: "0px 30%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <IoMdArrowBack
            style={{ fill: "#ffff" }}
            size="24px"
            onClick={() => {
              // Modal.success({ content: "게시물 등록에 성공했습니다!!" });
              props.history.goBack();
            }}
          />
          <div>
            <input
              className="create_empty_box"
              style={{ width: "100%" }}
              type="text"
              placeholder="*영화명 입력"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              className="create_empty_box"
              style={{ width: "100%" }}
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
            <input
              className="create_empty_box"
              style={{ width: "100%" }}
              type="text"
              placeholder="*영화포스터 이미지 링크 입력"
              value={medium_cover_image}
              onChange={(e) => {
                setMedium_cover_image(e.target.value);
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                marginRight: "10px",
                padding: "0px",
              }}
            >
              <span style={{ margin: "20px 20px 20px 0px" }}>평점</span>
              <select
                className="create_empty_box"
                style={{ flex: 1 }}
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
            <div style={{ flex: 1, display: "flex" }}>
              <span style={{ margin: "20px" }}>언어</span>
              <select
                className="create_empty_box"
                style={{ flex: 1 }}
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
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ margin: "20px 20PX 20PX 0PX" }}>장르</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {genresMap.map((_genres, i) => {
                return (
                  <span key={i} style={{ margin: "10px 00px" }}>
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
          </div>
        </div>
        <div
          className="create_createbutton create_empty_box"
          onClick={() => {
            onCreate();
          }}
        >
          <span>create</span>
        </div>
        {/* <Modal visible={true}>
          <div>
            <span>TESTTESTTEST</span>
          </div>
        </Modal> */}
      </Content>
    </Layout>
  );
};

export default Create;
