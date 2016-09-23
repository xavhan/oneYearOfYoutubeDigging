import React, { Component } from 'react';
import 'spectre.css/dist/spectre.min.css';
import './App.css';
import data from './services/data';
import { version } from './../package.json';

class App extends Component {
  state = { tracks: JSON.parse(localStorage.getItem(`1yoyd_tracks`)) || [] };

  componentDidMount() {
    if (localStorage.getItem(`1yoyd_version`) !== version) {
      data.getTracks()
        .then(tracks => {
          this.setState({ tracks });
          localStorage.setItem('1yoyd_tracks', JSON.stringify(tracks));
          localStorage.setItem(`1yoyd_version`, version)
        })
    }
  }

  render() {
    return (
      <div className="App container">
        <h1>One year of youtube digging</h1>
        <p>During all the year I did record one track a day for this project, here is the result :</p>
        <ul>
          { this.state.tracks.map((track, i) => (
            <li key={ i }>
              <strong>{ track.date }: </strong>
              { track.ytid ?
                (<a href={ track.link } target="_blank">{ `${track.title} - ${ track.artist }` }</a>) :
                (<span> {track.title + ' - ' + track.artist}  <a href={ track.link } target="_blank">Search</a></span>)
              }
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

export default App;
