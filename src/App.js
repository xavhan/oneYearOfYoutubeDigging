import React, { Component } from 'react';
import classNames from 'classnames';
import 'spectre.css/dist/spectre.min.css';
import './App.css';
import data from './services/data';
import { version } from './../package.json';

class App extends Component {
  state = {
    tracks: JSON.parse(localStorage.getItem(`1yoyd_tracks`)) || [],
    selected: {},
  };

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
  selectTrack(track) {
    this.setState({ selected: track });
  }
  closeModal() {
    this.setState({ selected: {} });
  }
  render() {
    const modalClasses = classNames({
      modal: true,
      active: Object.keys(this.state.selected).length > 0,
    });

    return (
      <div className="App container">
        <h1>One year of youtube digging</h1>
        <p>During all the year I did record one track a day for this project, here is the result :</p>

        <ul>
          { this.state.tracks.map((track, i) => (
            <li key={ i }>
              <strong>{ track.date }: </strong>
              { track.ytid ?
                (<a href="#" onClick={() => this.selectTrack(track)}>{ `${track.title} - ${ track.artist }` }</a>) :
                (<span> {track.title + ' - ' + track.artist}  <a href={ track.link } target="_blank">Search</a></span>)
              }
            </li>
          )) }
        </ul>
        <div className={modalClasses}>
          <div className="modal-overlay"></div>
          <div className="modal-container">
            <div className="modal-header">
              <button className="btn btn-clear float-right" onClick={() => this.closeModal()}></button>
              <div className="modal-title">
                {this.state.selected.artist + ' - ' + this.state.selected.title}
              </div>
            </div>
            <div className="modal-body">
              <div className="content">
                <iframe width="100%" height="315" frameBorder="0" allowFullScreen
                  src={`https://www.youtube.com/embed/${this.state.selected.ytid}?autoplay=1`}>
                </iframe>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-link" onClick={() => this.closeModal()}>Close</button>
              <a className="btn btn-primary" href={`//www.youtube.com/watch?v=${this.state.selected.ytid}`} target="_blank">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
