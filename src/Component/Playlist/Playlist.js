import React from 'react';
import ReactDOM from 'react-dom';
import TrackList from '../TrackList';

class PlayList extends React.Component {
  render(){
    return(
      <div className="Playlist">
        <input defaultValue={"New Playlist"}/>
          <TrackList/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  };
}
export default PlayList;