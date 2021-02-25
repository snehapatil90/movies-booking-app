import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import MovieDetails from "./components/MovieDetails";
import Dashboard from "./dashboard";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            className="movie_data_detail_title"
            path="/"
            exact
            component={Dashboard}
          ></Route>
          <Route
            className="movie_data_detail_title"
            path="/moviedetails/:id"
            exact
            component={MovieDetails}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
