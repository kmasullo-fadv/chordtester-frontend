import React, { Component } from 'react';
import './PlayChords.css';
import Context from '../Context';
import $ from 'jquery';
import TokenService from '../services/token-service';
import ProjectsService from '../services/projects-service';
import String from './String';



export default class HearChords extends Component {
    state = {
        addingProject: false,
        currentChords: [],
        currentChord: null, //id
        currentProject: ''
    }

    static contextType = Context;

    handleSubmitProject = e => {
        e.preventDefault();
        const project = {
            title: e.target['new-project-title'].value
        };
        ProjectsService.addProject(project)
        .then(res => {
            this.context.addUserProject(res)
        })
        .catch(error => {console.error({error})});
        this.setNotAddingProject();
    }

    setAddProject = () => {
        this.setState({addingProject: true})
    }

    setNotAddingProject = () => {
        this.setState({addingProject: false});
    }

    renderAddButton = () => {
        return (<button className="add-project-button" onClick={this.setAddProject}>Add Project</button>)
    }

    renderAddForm = () => {
        return (
                <form onSubmit={this.handleSubmitProject}>
                    <label htmlFor="new-project-title"> New Project Title:</label>
                    <input type="text" name="new-project-title"/>
                    <button type="submit" >Save</button>
                    <button type="button" onClick={this.setNotAddingProject}>Cancel</button>
                </form>
        )
    }
    
    renderChordSelect = (i) => {
        const currentChord = this.state.currentChords[i];
        return(<option key={`chord${i}`} value={currentChord.id}>{currentChord.name}</option>)
    }

    handleToggleNote = e => {
        const note = e.target.name
        if (e.target.checked) {
            this.context.addNote(note)
        } else {
            this.context.deleteNote(note)
        }
    }

    handleSetNotes = () => {
        $('input[type=checkbox]').each(function () {
            this.checked = false;
        });
        this.setState({currentChord: null, currentChords: [], currentProject: ''})
        this.context.setNotes();
    }

    handleSaveToProject = e => {
        e.preventDefault();
        const notes = this.context.notes;
        const projectId = e.target['select-menu'].value;
        const name = e.target['chord-name'].value;
        if(projectId){
            ProjectsService.addChordToProject(projectId, name, notes)
            e.target['chord-name'].value = ''
            e.target['select-menu'].value = ''
            this.handleSetNotes();
        } else return
    }

    handleGetProject = e => {
        e.preventDefault();
        const currentChords = this.context.chords.filter(chord => {return chord.project_id === parseInt(e.target.value)})
        this.setState({currentChords, currentProject: e.target.value})
    }

    handleViewChord = e => {
        e.preventDefault();
        const id = parseInt(e.target.value)
        const chord = this.context.chords.find(chord => chord.id === id)
        const notes = chord ? chord.notes : []
        this.context.setNotes(notes);
        this.setState({currentChord: id})
    }

    handleDeleteProject = e => {
        e.preventDefault();
        ProjectsService.deleteProject(e.target.value)
    }

    handleDeleteChord = e => {
        e.preventDefault();
        ProjectsService.deleteChord(this.state.currentChord)
        .then(() => {
            const currentChords = this.state.currentChords.filter(chord => chord.id !== this.state.currentChord)
            this.setState({currentChords, currentProject: '', currentChord: null});
            this.context.setNotes();
        })
    }

    renderButtons = () => {
        if (!TokenService.hasAuthToken()) {
            return (<div className='playButtons-loggedOut'>
                <button onClick={this.context.buildChord}>Play</button>
                <button onClick={this.handleSetNotes}>Clear</button>
            </div>)
        } else {
            return (<div className="app-controls menu-whole">
                <div className="save-project menu-section">
                    <form id="save-form" className="select" onSubmit={this.handleSaveToProject}>
                        <select name="select-menu">
                            <option value="">Save to Project:</option>
                            {this.context.projects.map(project => {
                                return (<option value={project.id} key={`option ${project.title}`}>
                                    {project.title}
                                </option>)
                            })}
                        </select><br/>
                        <input name="chord-name" placeholder="Save as..." required/>
                        <button type="submit">Save</button>
                    </form>
                    {this.state.addingProject ? this.renderAddForm() : this.renderAddButton()}
                </div>
                <div className='playButtons-big'>
                    <button onClick={this.context.buildChord}>Play</button><br/>
                    <button onClick={this.handleSetNotes}>Clear</button>
                </div>
                <div className="save-chords menu-section">
                    <form className="select" name="project-chords-form" id="project-chords-form" action="/action_page.php">
                        View Project: <select name="project" id="project" value={this.state.currentProject} onChange={this.handleGetProject}>
                            <option value="" defaultValue="selected">Select project</option>
                            {this.context.projects.map(project => {
                                return (<option value={project.id} key={`option ${project.title}`}>
                                    {project.title}
                                </option>)
                            })}
                        </select>
                        <br/><br/>
                        Chords: <select name="chord" id="chord" onChange={this.handleViewChord}>
                            <option value="" defaultValue="selected">Select chord</option>
                            {this.state.currentChords 
                            ? this.state.currentChords.map(chord => {return this.renderChordSelect(this.state.currentChords.indexOf(chord))}) 
                            : <option value="">Please select project first</option>}
                        </select>
                        <button type="button" onClick={this.handleDeleteChord}>Delete Chord</button>
                    </form>
                </div>
                <div className='playButtons-small'>
                    <button onClick={this.context.buildChord}>Play</button>
                    <button onClick={this.handleSetNotes}>Clear</button>
                </div>
            </div>)};
    };

    render() {
        return (
            <> 
                {this.renderButtons()}
                <section className="guitar-neck" >
                    <String stringName="he" className="string" id="1" />
                    <String stringName="b" className="string" id="2" />
                    <String stringName="g" className="string" id="3" />
                    <String stringName="d" className="string" id="4" />
                    <String stringName="a" className="string" id="5" />
                    <String stringName="le" className="string" id="6" />
                </section>
            </>
        )
    }
}