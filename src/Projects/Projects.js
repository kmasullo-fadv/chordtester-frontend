import React, { Component } from 'react';
import ProjectsService from '../services/projects-service';
import './Projects.css';
import Context from '../Context';


export default class Projects extends Component {
    static contextType = Context;

    componentDidMount() {
        ProjectsService.getAllProjects()
        .then(res => {
            this.context.storeUserProjects(res)
            })
    }

    render() {
        return (
            <>
                <h2>My Projects</h2>
                <button className="add-project-button">Add Project</button>
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

