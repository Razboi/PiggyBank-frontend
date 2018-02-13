import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/pages/LandingPage";
import HomePage from "./components/pages/HomePage";
import UserRoute from "./components/routes/UserRoute";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (

      <div className="App">
				<Route
					location={this.props.location}
					path="/"
					exact component={ LandingPage }
				/>
				<UserRoute
					location={this.props.location}
					path="/home"
					exact component={ HomePage }
				/>
      </div>

    );
  }
}

export default App;
