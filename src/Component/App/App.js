// import logo from '../../../public';
import React from 'react';
import ReactDOM from 'react-dom';
// import '../App/App.css';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import PlayList from '../Playlist';

class App extends React.Component {
    render(){
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                      <SearchResults/>
                      <PlayList/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;