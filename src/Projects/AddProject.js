import React, { Component } from 'react';
import ProjectsService from '../services/projects-service';
import './Projects.css';
import Context from '../Context';

export default class AddProject extends Component {
    static contextType = Context;

    render() {
        return (
            <>
                <h2>Add Project</h2>
                <form>
                    <label htmlFor="new-project-title">Title:</label>
                    <input type="text" name="new-project-title"/>
                </form>
            </>
        )
    }
}