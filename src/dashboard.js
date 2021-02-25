import axios from "axios";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Select from "react-select";
import Search from "./assets/index";
import Genres from "./constants/ListOptions";
import "./App.css";
import NavbarMenu from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";

class Dashboard extends Component {
  state = {
    movies: [],
    movieDetails: {},
    selectedValue: [],
    setSelectedValue: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getMovieList();
  }

  getMovieList(searchTerm) {
    console.log("searchTerm", searchTerm);
    // let searchTerm=''
    if (searchTerm === undefined) {
      searchTerm = "a";
    }
    // this.setState({ isLoading: true });
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie/?api_key=d88282ba749c9234e734f0fc771addd4&query=${searchTerm}`
      )
      .then((response) => {
        console.log("response-->", response);
        this.setState({ movies: response.data.results, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  handleSearchInput = async () => {
    // console.log("e-->", e.target.value);
    // this.setState({ searchTerm: e.target.value });
    this.getMovieList(this.state.searchTerm);
    console.log("this.state", this.state);
  };

  // handleKeyPress = (e) => {
  //   console.log("e", e);
  //   if (e.key === "Enter") {
  //     this.handleSearchInput();
  //   }
  // };

  handleChange = (e) => {
    console.log("e-->", e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  handleFilter = async (selectedOption) => {
    console.log("e filter-->", selectedOption);
    const selectedValue = selectedOption.value;
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie/?api_key=d88282ba749c9234e734f0fc771addd4&with_genres=${selectedValue}`
      )
      .then((response) => {
        console.log("response-->", response);
        this.setState({ movies: response.data.results });
      })
      .catch((err) => {
        this.setState({ err });
      });
  };

  render() {
    const { movies, selectedOption, isLoading } = this.state;
    console.log("movies", this.state.movies);
    return (
      <Fragment>
        <NavbarMenu />
        <div>
          {!isLoading ? (
            <div className="movies_box_wrapper">
              <form
                onSubmit={this.handleFormSubmit}
                autoComplete="off"
                className="input-group movie_search_group"
              >
                <input
                  className="movie_search_input"
                  type="search"
                  name="searchTerm"
                  placeholder="Search Movie Name Here…"
                  aria-label="Search"
                  // onClick={this.handleSearchInput}
                  onChange={this.handleChange}
                />
                <span className="movie_search_span">
                  <img
                    className="movie_search_icon"
                    src={Search}
                    alt="search"
                    onClick={this.handleSearchInput}
                  />
                </span>
              </form>

              <div className="movies_wrapper">
                <div className="movies_filter">
                  {" "}
                  Filter by Genres
                  <Select
                    className="genre_dropdown"
                    placeholder="Select Option"
                    options={Genres}
                    value={selectedOption}
                    onChange={this.handleFilter}
                  />
                </div>
                <div className="movie_data_container">
                  {movies &&
                    movies.map((data, i) => (
                      <Card
                        className="movie_data_wrapper"
                        onClick={this.handleRedirect}
                        key={i}
                      >
                        <div className="movie_data_header">
                          <img
                            className="movie_data_image"
                            src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
                            alt="poster"
                          />
                        </div>
                        <div
                          className="movie_data_detail"
                          onClick={this.handleRedirect}
                        >
                          <Link
                            className="movie_data_detail_title"
                            // rel="noreferrer"
                            // target="_blank"
                            to={`/moviedetails/${data.id}`}
                            // href={`https://api.themoviedb.org/3/movie/${data.id}?api_key=d88282ba749c9234e734f0fc771addd4`}
                          >
                            {data.title}
                          </Link>

                          <div className="movie_data_detail_date">
                            {data.release_date}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
