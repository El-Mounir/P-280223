import React from 'react';
import ReactDOM from'react-dom';
import '../SearchResults';
import TrackList from '../TrackList';

class SearchResults extends React.Component {
      render(){
        return (
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList/>
          </div>
        )
      };
}
export default SearchResults;