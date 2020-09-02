import React, { Component } from 'react';
import ProjectsService from '../services/projects-service';
import './Projects.css';
import Context from '../Context';


export default class Projects extends Component {
    state = {
        addingProject: false
    }

    static contextType = Context;

    componentDidMount() {
        ProjectsService.getAllProjects()
        .then(res => {
            this.context.storeUserProjects(res)
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({addingProject: false})
    }

    setAddProject = () => {
        this.setState({addingProject: true})
    }

    renderAddButton = () => {
        return (<button className="add-project-button" onClick={this.setAddProject}>Add Project</button>)
    }

    renderAddForm = () => {
        return (
                <form>
                    <label htmlFor="new-project-title"> New Project Title:</label>
                    <input type="text" name="new-project-title"/>
                    <button onClick={this.handleSubmit}>Save</button>
                </form>
        )
    }

    render() {
        return (
            <>
                <h2>My Projects</h2>
                {this.state.addingProject ? this.renderAddForm() : this.renderAddButton()}  
                <section className="my-projects" id="my-projects">
                    {this.context.projects.map((project) => {
                        return (
                        <div className="project-div" key={`Project${project.title}`}>
                            <h3>{project.title}</h3>
                        </div>
                        )
                    })}
                </section>

            </>
        )
    }
}

