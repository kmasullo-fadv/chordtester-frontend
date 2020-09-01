import React, { Component } from 'react';
import './App.css';
import NavMenu from './NavMenu/NavMenu'
import Home from './Home/Home'
import HearChords from './HearChords/HearChords'
import MyChords from './MyChords/MyChords'
import Account from './Account/Account'
import { Route } from 'react-router-dom'
import Context from './Context';
import * as Tone from 'tone'

class App extends Component {
  state = {
    notes: []
  }

  addNote = newNote => {
    const notePath = `/Samples/${newNote}.mp3`
    this.setState({ notes: [...this.state.notes, notePath] })
  }

  deleteNote = noteToDelete => {
    const notePath = `/Samples/${noteToDelete}.mp3`
    let currentNotes = this.state.notes.filter(note => note !== notePath)
    this.setState({ notes: [...currentNotes] })
  }

  clearNotes = () => {
    this.setState({ notes: [] })
  }

  buildChord = async () => {
    let chord = [];
    for (let i = 0; i < this.state.notes.length; i++) {
      chord[i] = new Tone.Player(process.env.PUBLIC_URL + `${this.state.notes[i]}`).toDestination();
    }
    try {
      await Tone.loaded()
    }
    catch (e) {
      console.error(e)
      throw (e)
    }
    chord.forEach((note) => note.start())

  }

  render() {
    const value = {
      notes: this.state.notes,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      buildChord: this.buildChord,
      clearNotes: this.clearNotes
    }
    return (
      <Context.Provider value={value}>
        <header><h1>ChordTester</h1></header>
        <NavMenu /><br />
        <Route
          exact
          path='/'
          component={Home}
        />
        <Route
          path='/hearchords'
          component={HearChords}
        />
        <Route
          path='/mychords'
          component={MyChords}
        />
        <Route
          path='/account'
          component={Account}
        />


      </ Context.Provider>
    )
  }
}

export default App;
