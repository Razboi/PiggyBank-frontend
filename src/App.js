import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentWillMount() {
      axios.get("/api/users/").then( ( response ) => {
        this.setState({ "users": response.data });
      }).catch( err => console.log(err) );
    }

  render() {
    console.log(this.state)
    return (

      <div className="App">
        {this.state.users.map((user, index) =>
          <div key={index}>{user.name}</div>
          )}
      </div>

    );
  }
}

export default App;
