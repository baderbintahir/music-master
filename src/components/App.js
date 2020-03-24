import React, { Component } from 'react';
import Search from './Search';
import Artist from './Artist';
import Tracks from './Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

class App extends Component{

    state = { artist: null, tracks: [] };

    searchArtist = artistQuery => {
        fetch(`${API_ADDRESS}/artist/${artistQuery}`)
        .then(res => res.json())
        .then(res => {
            if(res.artists.total > 0){
                const artist = res.artists.items[0];
                this.setState({ artist });

                fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
                .then(res => res.json())
                .then(res => this.setState({ tracks: res.tracks }))
                .catch(err => alert(err.message))
            }
        })
        .catch(err => alert(err.message))
    }

    render(){
        console.log('state => ', this.state)
        return(
            <div>
                <h2>Music Master</h2>
                <Search searchArtist={this.searchArtist} />
                <Artist artist={this.state.artist} />
                <Tracks tracks={this.state.tracks} />
            </div>
        )
    }
}

export default App