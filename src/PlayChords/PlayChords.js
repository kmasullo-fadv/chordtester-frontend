import React, { Component } from 'react';
import './PlayChords.css';
import Context from '../Context';
import $ from 'jquery';
import TokenService from '../services/token-service';
import ProjectsService from '../services/projects-service';


export default class HearChords extends Component {
    state = {
        addingProject: false,
        currentChords: null
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

    handlesetNotes = () => {
        $('input[type=checkbox]').each(function () {
            this.checked = false;
        });
        this.context.setNotes();
    }

    handleSaveToProject = e => {
        e.preventDefault();
        const notes = this.context.notes;
        const projectId = e.target['select-menu'].value
        const name = e.target['chord-name'].value
        ProjectsService.addChordToProject(projectId, name, notes)
        this.handlesetNotes();
    }

    handleGetProject = e => {
        e.preventDefault();
        const currentProject = this.context.chords.filter(chord => {return chord.project_id === parseInt(e.target.value)})
        this.setState({currentChords: [...currentProject]})
    }

    handleViewChord = e => {
        e.preventDefault();
        console.log(e.target.value)
        const chord = this.context.chords.find(chord => chord.id === parseInt(e.target.value))
        const notes = chord ? chord.notes : []
        this.context.setNotes(notes);
    }

    renderButtons = () => {
        if (!TokenService.hasAuthToken()) {
            return (<>
                <button className='playButtons' onClick={this.context.buildChord}>PlayChord</button>
                <button className='playButtons' onClick={this.handlesetNotes}>Clear Fretboard</button>
            </>)
        } else {
            return (<>
                <div>
                    <form id="save-form" className="select" onSubmit={this.handleSaveToProject}>
                        <select name="select-menu">
                            <option>Save to Project:</option>
                            {this.context.projects.map(project => {
                                return (<option value={project.id} key={`option ${project.title}`}>
                                    {project.title}
                                </option>)
                            })}
                        </select><br/>
                        <label htmlFor="chord-name">Chord Name:</label>
                        <input name="chord-name" />
                        <button type="submit">Save</button>
                    </form>
                    {this.state.addingProject ? this.renderAddForm() : this.renderAddButton()}
                </div>
                <div>
                    <h3>View Saved Chords</h3>
                    <form className="select" name="project-chords-form" id="project-chords-form" action="/action_page.php">
                        Projects: <select name="project" id="project" onChange={this.handleGetProject}>
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
                    </form>
                </div>
                <div>
                    <button className='playButtons' onClick={this.context.buildChord}>PlayChord</button>
                    <button onClick={this.handlesetNotes}>Clear Fretboard</button>
                </div>
            </>)};
    };

    render() {
        return (
            <>
                {this.renderButtons()}
                <section className="guitar-neck" >

                    <div className="string" id="1">
                        <div className="fret" ><label htmlFor="he0" /><input type="checkbox" checked={this.context.notes.includes('he0')} name="he0" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he1" /><input type="checkbox" checked={this.context.notes.includes('he1')} name="he1" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he2" /><input type="checkbox" checked={this.context.notes.includes('he2')} name="he2" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he3" /><input type="checkbox" checked={this.context.notes.includes('he3')} name="he3" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he4" /><input type="checkbox" checked={this.context.notes.includes('he4')} name="he4" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he5" /><input type="checkbox" checked={this.context.notes.includes('he5')} name="he5" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he6" /><input type="checkbox" checked={this.context.notes.includes('he6')} name="he6" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he7" /><input type="checkbox" checked={this.context.notes.includes('he7')} name="he7" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he8" /><input type="checkbox" checked={this.context.notes.includes('he8')} name="he8" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he9" /><input type="checkbox" checked={this.context.notes.includes('he9')} name="he9" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he10" /><input type="checkbox" checked={this.context.notes.includes('he10')} name="he10" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he11" /><input type="checkbox" checked={this.context.notes.includes('he11')} name="he11" onChange={this.handleToggleNote} /></div>
                        <div className="fret">
                            <div className="double-inlay"></div>
                            <label htmlFor="he12" /><input type="checkbox" checked={this.context.notes.includes('he12')} name="he12" onChange={this.handleToggleNote} />
                        </div>
                        <div className="fret"><label htmlFor="he13" /><input type="checkbox" checked={this.context.notes.includes('he13')} name="he13" onChange={this.handleToggleNote} /></div>
                        <div className="fret"><label htmlFor="he14" /><input type="checkbox" checked={this.context.notes.includes('he14')} name="he14" onChange={this.handleToggleNote} /></div>
                        <div className="fret inlay"><label htmlFor="he15" /><input type="checkbox" checked={this.context.notes.includes('he15')} name="he15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="2">
                        <div className="fret" htmlFor="b0"><label /><input type="checkbox" checked={this.context.notes.includes('b0')} name="b0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b1"><label /><input type="checkbox" checked={this.context.notes.includes('b1')} name="b1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b2"><label /><input type="checkbox" checked={this.context.notes.includes('b2')} name="b2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b3"><label /><input type="checkbox" checked={this.context.notes.includes('b3')} name="b3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b4"><label /><input type="checkbox" checked={this.context.notes.includes('b4')} name="b4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b5"><label /><input type="checkbox" checked={this.context.notes.includes('b5')} name="b5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b6"><label /><input type="checkbox" checked={this.context.notes.includes('b6')} name="b6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b7"><label /><input type="checkbox" checked={this.context.notes.includes('b7')} name="b7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b8"><label /><input type="checkbox" checked={this.context.notes.includes('b8')} name="b8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b9"><label /><input type="checkbox" checked={this.context.notes.includes('b9')} name="b9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b10"><label /><input type="checkbox" checked={this.context.notes.includes('b10')} name="b10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b11"><label /><input type="checkbox" checked={this.context.notes.includes('b11')} name="b11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b12"><label /><input type="checkbox" checked={this.context.notes.includes('b12')} name="b12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b13"><label /><input type="checkbox" checked={this.context.notes.includes('b13')} name="b13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b14"><label /><input type="checkbox" checked={this.context.notes.includes('b14')} name="b14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="b15"><label /><input type="checkbox" checked={this.context.notes.includes('b15')} name="b15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="3">
                        <div className="fret" htmlFor="g0"><label /><input type="checkbox" checked={this.context.notes.includes('g0')} name="g0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g1"><label /><input type="checkbox" checked={this.context.notes.includes('g1')} name="g1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g2"><label /><input type="checkbox" checked={this.context.notes.includes('g2')} name="g2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g3"><label /><input type="checkbox" checked={this.context.notes.includes('g3')} name="g3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g4"><label /><input type="checkbox" checked={this.context.notes.includes('g4')} name="g4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g5"><label /><input type="checkbox" checked={this.context.notes.includes('g5')} name="g5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g6"><label /><input type="checkbox" checked={this.context.notes.includes('g6')} name="g6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g7"><label /><input type="checkbox" checked={this.context.notes.includes('g7')} name="g7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g8"><label /><input type="checkbox" checked={this.context.notes.includes('g8')} name="g8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g9"><label /><input type="checkbox" checked={this.context.notes.includes('g9')} name="g9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g10"><label /><input type="checkbox" checked={this.context.notes.includes('g10')} name="g10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g11"><label /><input type="checkbox" checked={this.context.notes.includes('g11')} name="g11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g12"><label /><input type="checkbox" checked={this.context.notes.includes('g12')} name="g12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g13"><label /><input type="checkbox" checked={this.context.notes.includes('g13')} name="g13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g14"><label /><input type="checkbox" checked={this.context.notes.includes('g14')} name="g14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="g15"><label /><input type="checkbox" checked={this.context.notes.includes('g15')} name="g15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="4">
                        <div className="fret" htmlFor="d0"><label /><input type="checkbox" checked={this.context.notes.includes('d0')} name="d0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d1"><label /><input type="checkbox" checked={this.context.notes.includes('d1')} name="d1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d2"><label /><input type="checkbox" checked={this.context.notes.includes('d2')} name="d2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d3"><label /><input type="checkbox" checked={this.context.notes.includes('d3')} name="d3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d4"><label /><input type="checkbox" checked={this.context.notes.includes('d4')} name="d4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d5"><label /><input type="checkbox" checked={this.context.notes.includes('d5')} name="d5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d6"><label /><input type="checkbox" checked={this.context.notes.includes('d6')} name="d6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d7"><label /><input type="checkbox" checked={this.context.notes.includes('d7')} name="d7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d8"><label /><input type="checkbox" checked={this.context.notes.includes('d8')} name="d8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d9"><label /><input type="checkbox" checked={this.context.notes.includes('d9')} name="d9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d10"><label /><input type="checkbox" checked={this.context.notes.includes('d10')} name="d10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d11"><label /><input type="checkbox" checked={this.context.notes.includes('d11')} name="d11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d12"><label /><input type="checkbox" checked={this.context.notes.includes('d12')} name="d12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d13"><label /><input type="checkbox" checked={this.context.notes.includes('d13')} name="d13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d14"><label /><input type="checkbox" checked={this.context.notes.includes('d14')} name="d14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="d15"><label /><input type="checkbox" checked={this.context.notes.includes('d15')} name="d15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="5">
                        <div className="fret" htmlFor="a0"><label /><input type="checkbox" checked={this.context.notes.includes('a0')} name="a0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a1"><label /><input type="checkbox" checked={this.context.notes.includes('a1')} name="a1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a2"><label /><input type="checkbox" checked={this.context.notes.includes('a2')} name="a2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a3"><label /><input type="checkbox" checked={this.context.notes.includes('a3')} name="a3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a4"><label /><input type="checkbox" checked={this.context.notes.includes('a4')} name="a4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a5"><label /><input type="checkbox" checked={this.context.notes.includes('a5')} name="a5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a6"><label /><input type="checkbox" checked={this.context.notes.includes('a6')} name="a6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a7"><label /><input type="checkbox" checked={this.context.notes.includes('a7')} name="a7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a8"><label /><input type="checkbox" checked={this.context.notes.includes('a8')} name="a8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a9"><label /><input type="checkbox" checked={this.context.notes.includes('a9')} name="a9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a10"><label /><input type="checkbox" checked={this.context.notes.includes('a10')} name="a10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a11"><label /><input type="checkbox" checked={this.context.notes.includes('a11')} name="a11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a12"><label /><input type="checkbox" checked={this.context.notes.includes('a12')} name="a12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a13"><label /><input type="checkbox" checked={this.context.notes.includes('a13')} name="a13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a14"><label /><input type="checkbox" checked={this.context.notes.includes('a14')} name="a14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="a15"><label /><input type="checkbox" checked={this.context.notes.includes('a15')} name="a15" onChange={this.handleToggleNote} /></div>
                    </div>

                    <div className="string" id="6">
                        <div className="fret" htmlFor="le0"><label /><input type="checkbox" checked={this.context.notes.includes('le0')} name="le0" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le1"><label /><input type="checkbox" checked={this.context.notes.includes('le1')} name="le1" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le2"><label /><input type="checkbox" checked={this.context.notes.includes('le2')} name="le2" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le3"><label /><input type="checkbox" checked={this.context.notes.includes('le3')} name="le3" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le4"><label /><input type="checkbox" checked={this.context.notes.includes('le4')} name="le4" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le5"><label /><input type="checkbox" checked={this.context.notes.includes('le5')} name="le5" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le6"><label /><input type="checkbox" checked={this.context.notes.includes('le6')} name="le6" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le7"><label /><input type="checkbox" checked={this.context.notes.includes('le7')} name="le7" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le8"><label /><input type="checkbox" checked={this.context.notes.includes('le8')} name="le8" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le9"><label /><input type="checkbox" checked={this.context.notes.includes('le9')} name="le9" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le10"><label /><input type="checkbox" checked={this.context.notes.includes('le10')} name="le10" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le11"><label /><input type="checkbox" checked={this.context.notes.includes('le11')} name="le11" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le12"><label /><input type="checkbox" checked={this.context.notes.includes('le12')} name="le12" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le13"><label /><input type="checkbox" checked={this.context.notes.includes('le13')} name="le13" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le14"><label /><input type="checkbox" checked={this.context.notes.includes('le14')} name="le14" onChange={this.handleToggleNote} /></div>
                        <div className="fret" htmlFor="le15"><label /><input type="checkbox" checked={this.context.notes.includes('le15')} name="le15" onChange={this.handleToggleNote} /></div>
                    </div>

                </section>
            </>
        )
    }
}