import React from "react";
import "./Header.css";
import "./Banner.css";

function Home() {
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <MovieList></MovieList>
      <Pagination></Pagination>
    </>
  );
}

export default Home;

// Header
function Header() {
  return (
    <div className="flex">
      <img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png" />
      <h2>Movies</h2>
      <h2>Favourites</h2>
    </div>
  );
}

// Banner
function Banner() {
  // state variable
  let [firstMovie, setMovie] = React.useState("");
  React.useEffect(
    function () {

    }, []);
  console.log("render");
  return (
    <>
      <h1>I am Banner</h1>
    </>
  );
}














// Movie List
function MovieList() {
  return <h2>Movie List</h2>;
}

// Pagination
function Pagination() {
  return <h2>Pagination</h2>;
}
