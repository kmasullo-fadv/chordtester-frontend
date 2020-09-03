import React, { Component } from 'react';
import ProjectsService from '../services/projects-service';
import './Projects.css';
import Context from '../Context';


export default class Projects extends Component {
    state = {
        addingProject: false
    }

    static contextType = Context;

    handleSubmit = e => {
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
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-project-title"> New Project Title:</label>
                    <input type="text" name="new-project-title"/>
                    <button type="submit" >Save</button>
                    <button type="button" onClick={this.setNotAddingProject}>Cancel</button>
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

