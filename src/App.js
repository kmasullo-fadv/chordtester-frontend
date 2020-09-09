import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NavMenu from './NavMenu/NavMenu';
import Home from './Home/Home';
import PlayChords from './PlayChords/PlayChords';
import LoginPage from './LoginPage/LoginPage';
import NotFound from './NotFound/NotFound';
import ProjectsService from './services/projects-service';
import TokenService from './services/token-service';
import Context from './Context';
import * as Tone from 'tone';
import PublicRoute from './Utils/PublicRoute';

class App extends Component {
  state = {
    notes: [],
    projects: [],
    chords: [],
    hasError: false,
    isLoggedIn: false,
    loading: true
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return {hasError: true}
  };

  componentDidMount() {
    this.setState({chords: []});
    if(TokenService.hasAuthToken()){
      this.setState({loading: true})
      ProjectsService.getAllProjects()
      .then(projects => {
        this.storeUserProjects(projects)
        return Promise.all(projects.map(project => ProjectsService.getProjectById(project.id)))
      })
      .then(chords => {
        this.setState( {loading: false, chords: chords.flat() })
      })
    }
  };


  setLogIn = () => {
    this.setState({isLoggedIn: true})
  };

  setLogOut = () => {
    this.setState({isLoggedIn: false})
  };

  addNote = newNote => {
    this.setState({ notes: [...this.state.notes, newNote] })
  };

  deleteNote = noteToDelete => {
    let currentNotes = this.state.notes.filter(note => note !== noteToDelete)
    this.setState({ notes: [...currentNotes] })
  };

  setNotes = (notes=[]) => {
    this.setState({ notes })
  };

  buildChord = async () => {
    let chord = [];
    for (let i = 0; i < this.state.notes.length; i++) {
      chord[i] = new Tone.Player(process.env.PUBLIC_URL + `/Samples/${this.state.notes[i]}.mp3`).toDestination();
    }
    try {
      await Tone.loaded()
    }
    catch (e) {
      console.error(e)
      throw (e)
    }
    chord.forEach((note) => note.start())
  };

  storeUserProjects = (projects) => {
    this.setState({projects})
  };

  addUserProject = (project) => {
    this.setState({projects: [...this.state.projects, project]})
  };

  deleteUserProject = (id) => {
    let currentProjects = this.state.projects.filter(project => project.id !== id)
    this.setState({projects: [...currentProjects]})
  };



  render() {
    if(this.state.loading && TokenService.hasAuthToken()) {return <p>Loading...</p>}
    const value = {
      notes: this.state.notes,
      projects: this.state.projects,
      chords: this.state.chords,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      buildChord: this.buildChord,
      setNotes: this.setNotes,
      logOut: this.setLogOut,
      logIn: this.setLogIn,
      storeUserProjects: this.storeUserProjects,
      addUserProject: this.addUserProject
    };
    return (
      <Context.Provider value={value}>
        <main>
          {this.state.hasError && <p>There was an error!</p>}
          <NavMenu loggedin={this.state.isLoggedIn}/><br />
          <Switch>
            <Route
              exact
              path='/'
              component={PlayChords}
            />
            <PublicRoute
              path='/login'
              component={LoginPage}
            />
            <Route
              path='/about'
              component={Home}
            />
            <Route 
              path='/:anythingwrong'
              component={NotFound}
            />
          </Switch>
        </main>
      </ Context.Provider>
    );
  };
};

export default App;
