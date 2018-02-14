import React from "react";
import "./App.css";
import LandingPage from "./components/pages/LandingPage";
import HomePage from "./components/pages/HomePage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (

      <div className="App">
				<GuestRoute
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
