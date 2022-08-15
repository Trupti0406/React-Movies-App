import React from "react";
// Movie List
function MovieList(props) {
  let [movies, setMovies] = React.useState("");
  let [value, setValue] = React.useState("");
  let [favourites, setFavorite] = React.useState([]);
  function setText(e) {
    let newValue = e.target.value;
    setValue(newValue);
  }

  function setToFavorite(movieID) {
    for (let i = 0; i < movies.length; i++) {
      let movieObj = movies[i];
      if (movieObj.id == movieID) {
        let newFavourites = [...favourites];
        newFavourites.push(movieObj)
        setFavorite(newFavourites);
        break;
      }
    }
  }

  function deleteFavorite(movieID) {
    let filteredFavourites = favourites.filter((movieObj) => {
      return movieObj.id != movieID;
    });
    setFavorite(filteredFavourites);
  }

  function checkContainFav(movieID) {
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id == movieID) {
        return true;
      }
    }
    return false;
  }

  React.useEffect(
    function fn() {
      async function fetchData() {
        // Using fetch() to send a request
        let response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?api_key=c5ff736cea18f92d40b30cd299575bbd&page=" +
            props.pageNo
        );
        // The response would be in buffer(binary form), so conerting it to jason
        let data = await response.json();
        // console.log("Data", data);
        let movies = data.results;
        setMovies(movies);
      }
      fetchData();
    },
    [props.pageNo]
  );

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

                {checkContainFav(movieObj.id) ? (
                  <i
                    className="fa-solid fa-xmark icons"
                    onClick={() => {
                      deleteFavorite(movieObj.id);
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-face-grin-hearts icons"
                    onClick={() => {
                      setToFavorite(movieObj.id);
                    }}
                  ></i>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
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
export default MovieList;
