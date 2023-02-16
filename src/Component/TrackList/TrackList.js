import React from 'react';
import ReactDOM from 'react-dom';
import Track from '../Track';

class TrackList extends React.Component {
    render(){
        return(
            <div className="TrackList">
              <Track/>
              <Track/>
              <Track/>
            </div>
        )
    };
};
export default TrackList;

