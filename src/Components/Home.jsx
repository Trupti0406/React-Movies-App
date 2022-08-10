/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Header.css";
import "./Banner.css";
import "./MovieList.css";
import "./Pagination.css";
import movies from "./Movies";

function Home() {
    // Paginaation
    const [pageNo, setPageNo] = React.useState(1);
    function increasePageNumber() {
      setPageNo(function (prevState) {
        return prevState + 1;
      });
    }
    function decreasePageNumber() {
      if (pageNo == 1) {
        return;
      }
      setPageNo(function (prevState) {
        return prevState - 1;
      });
    }
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <MovieList pageNo={pageNo}></MovieList>
      {/* Pagination Jsx */}
      <div className="pagination">
      <div className="previous_btn" onClick={decreasePageNumber}>
        Previous
      </div>
      <div className="page_no">{pageNo}</div>
      <div className="next_btn" onClick={increasePageNumber}>
        Next
      </div>
    </div>
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
  let [firstMovie, setFirstMovie] = React.useState("");
  React.useEffect(async function () {
    // Using fetch() to send a request
    let response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=c5ff736cea18f92d40b30cd299575bbd"
    );
    // The response would be in buffer(binary form), so conerting it to jason
    let data = await response.json();
    // console.log("Data", data);
    let movies = data.results;
    setFirstMovie(movies[0]);
  }, []);
  return (
    <>
      {firstMovie === "" ? (
        <h2>Movies are loading...</h2>
      ) : (
        <>
          <h2>{firstMovie.original_title}</h2>
          <img
            src={
              "http://image.tmdb.org/t/p/original" + firstMovie.backdrop_path
            }
            className="banner_img"
          ></img>
        </>
      )}
    </>
  );
}

// Movie List
function MovieList(props) {
  let [movies, setMovies] = React.useState("");
  let [value, setValue] = React.useState("");
  function setText(e) {
    let newValue = e.target.value;
    setValue(newValue);
  }
  React.useEffect(async function () {
    // Using fetch() to send a request
    let response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=c5ff736cea18f92d40b30cd299575bbd&page="+props.pageNo
    );
    // The response would be in buffer(binary form), so conerting it to jason
    let data = await response.json();
    // console.log("Data", data);
    let movies = data.results;
    setMovies(movies);
  }, []);
  // Logic To search movies
  function filterLogic(searchText, movieArray) {
    let filteredMovieArray = [];
    for (let i = 0; i < movieArray.length; i++) {
      let upperSearchText = searchText.toUpperCase();
      let movieName = movieArray[i].original_title;
      let upperText = movieName.toUpperCase();
      let ans = upperText.includes(upperSearchText);
      if (ans == true) {
        filteredMovieArray.push(movieArray[i]);
      }
    }
    return filteredMovieArray;
  }
  let searchedMovies = filterLogic(value, movies);
  return (
    <>
      <h2>Trending Movies</h2>
      <input onChange={setText} value={value}></input>
      {movies === "" ? (
        <h2>Loading trending movies...</h2>
      ) : (
        <div className="trending_box">
          {searchedMovies.map((movieObj, idx) => {
            return (
              <div key={idx} className="poster_box">
                <h2>{movieObj.original_title}</h2>
                <img
                  src={"http://image.tmdb.org/t/p/w500/" + movieObj.poster_path}
                  className="poster_img"
                ></img>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}