import React, { Component } from 'react';

class App extends Component{

    state = { artistQuery: '' };

    updateArtistQuery = event => {
        console.log('event.target.value => ', event.target.value);
        this.setState({ artistQuery: event.target.value });
    }

    searchArtist =() => {
        console.log('this.state => ', this.state)
    }

    handleKeyPress = event => {
        if(event.key === 'Enter'){
            this.searchArtist();
        }
    }

    render(){
        return(
            <div>
                <h2>Music Master</h2>
                <input
                    onChange={this.updateArtistQuery}
                    placeholder="Search of an Artist"
                    onKeyPress={this.handleKeyPress}
                />
                <button onClick={this.searchArtist}>Search</button>
            </div>
        )
    }
}

export default App