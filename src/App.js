import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavMenu from './NavMenu/NavMenu'
import Home from './Home/Home'
import HearChords from './HearChords/HearChords'
import MyChords from './MyChords/MyChords'
import Account from './Account/Account'
import LoginPage from './LoginPage/LoginPage'
import Context from './Context';
import * as Tone from 'tone'
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

class App extends Component {
  state = {
    notes: [],
    hasError: false,
    isLoggedIn: false
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return {hasError: true}
  }

  setLogIn = () => {
    this.setState({isLoggedIn: true})
  }

  setLogOut = () => {
    this.setState({isLoggedIn: false})
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
      clearNotes: this.clearNotes,
      logOut: this.setLogOut,
      logIn: this.setLogIn
    }
    return (
      <Context.Provider value={value}>
        <header><h1>ChordTester</h1></header>
        <main>
          {this.state.hasError && <p>There was an error!</p>}
          <NavMenu loggedin={this.state.isLoggedIn}/><br />
          <Switch>
            <Route
              exact
              path='/'
              component={Home}
            />
            <Route
              path='/hearchords'
              component={HearChords}
            />
            <PrivateRoute
              path='/mychords'
              component={MyChords}
            />
            <PublicRoute
              path='/account'
              component={Account}
            />
            <PublicRoute
              path='/login'
              component={LoginPage}
            />
          </Switch>
        </main>
      </ Context.Provider>
    )
  }
}

export default App;
