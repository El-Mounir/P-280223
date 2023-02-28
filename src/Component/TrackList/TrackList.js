import React from 'react';
import ReactDOM from 'react-dom';
import './Tracklist.css';
import {Track} from '../Track/Track';

export class TrackList extends React.Component {
    render(){
        const tracklist= this.props.tracks;
        return (
            <div className="TrackList">
                {
                    tracklist.map(traCk=> {
                     return <Track track={traCk} 
                                   key={traCk.id} 
                                   onAdd={this.props.onAdd} 
                                   onRemove={this.props.onRemove} 
                                   isRemoval={this.props.isRemoval}/>
                    })
                }    
            </div>
        )
    }
}


