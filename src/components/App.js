import React, { Component } from 'react';
import Artist from './Artist'

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

class App extends Component{

    state = { artistQuery: '', artist: null, tracks: [] };

    updateArtistQuery = event => {
        this.setState({ artistQuery: event.target.value });
    }

    searchArtist =() => {
        fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
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

    handleKeyPress = event => {
        if(event.key === 'Enter'){
            this.searchArtist();
        }
    }

    render(){
        console.log('state => ', this.state)
        return(
            <div>
                <h2>Music Master</h2>
                <input
                    onChange={this.updateArtistQuery}
                    placeholder="Search of an Artist"
                    onKeyPress={this.handleKeyPress}
                />
                <button onClick={this.searchArtist}>Search</button>
                <Artist artist={this.state.artist} />
            </div>
        )
    }
}

export default App