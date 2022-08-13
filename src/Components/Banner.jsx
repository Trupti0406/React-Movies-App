import React from "react";


// Banner
function Banner() {
  let [firstMovie, setFirstMovie] = React.useState("");
  React.useEffect(function () {
    async function fetchData() {
      // Using fetch() to send a request
      let response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=c5ff736cea18f92d40b30cd299575bbd"
      );
      // The response would be in buffer(binary form), so conerting it to jason
      let data = await response.json();
      // console.log("Data", data);
      let movies = data.results;
      setFirstMovie(movies[0]);
    }
    fetchData();
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
export default Banner;