import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Movie from "../components/Movie";
import { BsLayoutThreeColumns, BsGrid3X3, BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;
// const REFRESH_MOVIES = gql`
//   subscription {
//     refreshMovies {
//       id
//       title
//       rating
//       description_intro
//       language
//       medium_cover_image
//       genres
//     }
//   }
// `;

const GET_MOVIES = gql`
  query {
    movies {
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

function Home() {
  const { loading, error, data, refetch } = useQuery(GET_MOVIES);
  const [layout, setLayout] = useState(0);

  console.log("get movies > ", loading, error, data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (layout === 0) {
      document.getElementsByTagName("body")[0].style = "overflow:auto;";
    } else {
      document.getElementsByTagName("body")[0].style = "overflow:hidden";
    }
  }, [layout]);

  return (
    <Layout>
      <Header>
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Link to="/create">
            <span style={{ margin: "0px 10px" }}>
              <BsPlusSquare size={24} />
            </span>
          </Link>
          <span
            style={{ margin: "0px 10px" }}
            onClick={() => {
              layout > 0 ? setLayout(0) : setLayout(1);
            }}
          >
            {layout === 0 ? (
              <BsLayoutThreeColumns size={24} />
            ) : (
              <BsGrid3X3 size={24} />
            )}
          </span>
        </div>
        <div
          style={{
            height: "200px",
            alignItems: "center",
            display: "flex",
            width: "100%",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "rgb(255 0 0)",
              fontWeight: "900",
              flex: 1,
              fontSize: "44px",
              fontFamily: "system-ui",
            }}
          >
            Son's Movie Collection
          </span>
        </div>
      </Header>
      <Content>
        <div
          style={
            layout === 0
              ? {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  justifyItems: "center",
                }
              : { display: "flex", overflow: "auto" }
          }
        >
          {loading && <div>Loading...</div>}
          {!loading &&
            data &&
            data.movies &&
            data.movies.map((movie) => {
              return (
                <div
                  key={movie.id}
                  style={layout !== 0 ? { margin: "0px 10px" } : {}}
                >
                  <Movie {...movie} />
                </div>
              );
            })}
          {error && <div>Error!</div>}
        </div>
      </Content>
    </Layout>
  );
}
export default Home;
