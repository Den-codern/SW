import React, { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import { SwapiServiceProvider } from "../swapi-sevice-context";
import "./app.css";
import SwapiService from "../../services/swapi-service";
import ErrorBoundary from "../error-boundary";
import DummySwapiService from "../../services/dummy-service";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";
import { StarshipDetails } from "../sw-components";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service(),
      };
    });
  };

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Route
                path="/"
                render={() => {
                  return <h2>Welcome StarDB</h2>;
                }}
                exact
              />
              <Route path="/people" render={() => <h2>People</h2>} />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route
                path="/starships/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={id} />;
                }}
              />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
