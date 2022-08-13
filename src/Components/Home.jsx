/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./Header.css";
import "./Banner.css";
import "./MovieList.css";
import "./Pagination.css";
import Header from "./Header";
import Banner from "./Banner";
import MovieList from "./MovieList";

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


