import React, { Component } from 'react'
import './MyChords.css'


export default class MyChords extends Component {

    render() {
        return (
            <>
                <h2>My Saved Chords</h2>
                <section className="my-chords" id="my-chords">
                    <div className="song-div">
                        <h3>Song 1</h3>
                    </div>
                    <div className="song-div">
                        <h3>Song 2</h3>
                    </div>
                    <div className="song-div">
                        <h3>Song 3</h3>
                    </div>
                </section>
            </>
        )
    }

}

