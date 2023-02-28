import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {PlayList} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchResults:[],
            playlistName:"",
            playlistTracks:[]
        };
        this.addTrack=this.addTrack.bind(this);
        this.removeTrack=this.removeTrack.bind(this);
        this.updatePlaylistName=this.updatePlaylistName.bind(this);
        this.savePlayList=this.savePlayList.bind(this);
        this.search =this.search.bind(this);
 }   
    addTrack(track){
        const newPlaylistTracks=this.state.playlistTracks;
        const check=false;
        newPlaylistTracks.forEach(item => { 
            if( item.id == track.id) {
              check=true;
            }
        });
        if (check ? newPlaylistTracks : newPlaylistTracks.push(track));
        this.setState({playlistTracks:newPlaylistTracks});
    }
    removeTrack(track){
      const newPlaylistTrack=this.state.playlistTracks.filter(ele => ele.id!==track.id);
      this.setState({playlistTracks:newPlaylistTrack});
    }
    updatePlaylistName(newName){
        this.setState({playlistName:newName})
    }
    async savePlayList(){
        const TrackURIs=this.state.playlistTracks.map(track=> track.uri);
        Spotify.savePlaylist(this.state.playlistName,TrackURIs).then(()=>{
            this.setState({playlistName:"New Playlist",
            playlistTracks:[]
         });
        });
    }
    search(term) {
      Spotify.searchTracks(term).then(searchResults=> {
        this.setState({searchResults:searchResults});
      });
    }
    render(){
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} 
                                       onAdd={this.addTrack}/>
                        <PlayList playlistName={this.state.playlistName} 
                                  playlistTracks={this.state.playlistTracks} 
                                  onRemove={this.removeTrack} 
                                  onNameChange={this.updatePlaylistName}
                                  onSave={this.savePlayList}/>
                    </div>
                </div>
            </div>
        );
    }
};

