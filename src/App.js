import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/pages/LandingPage";

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
      </div>

    );
  }
}

export default App;
