import React, { Component } from 'react';
import 'spectre.css/dist/spectre.min.css';
import './App.css';
import data from './services/data';


class App extends Component {
  state = { tracks: [] };
  componentDidMount() {
    data.getTracks().then(tracks => { this.setState({ tracks }); });
  }
  render() {
    return (
      <div className="App container">
        <h1>One year of youtube digging</h1>
        <p>During all the year I did record one track a day forr this project, here is the result :</p>
        <ul>
          { this.state.tracks.map((track, i) => (
            <li key={ i }>
              <strong>{ track.date }</strong> { `${track.title} - ${ track.artist }` }
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

export default App;
