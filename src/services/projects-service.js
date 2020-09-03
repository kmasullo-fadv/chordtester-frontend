import TokenService from './token-service';
import config from '../config';

const ProjectsService = {
    getAllProjects() {
        return fetch(`${config.API_ENDPOINT}/projects`, {
            headers: {
                Authorization: `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(e => e.Promise.reject(e))
            : res.json()
        )
    },
    addProject(newProject) {
        return fetch(`${config.API_ENDPOINT}/projects`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProject)
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(e => e.Promise.reject(e))
            : res.json()
        )
    },
    addChordToProject(projectId, name, notes) {
        return fetch(`${config.API_ENDPOINT}/projects/${projectId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                project_id: projectId,
                name: name,
                notes: notes
            })
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => e.Promise.reject(e))
            : res.json()
        )
    }
}

export default ProjectsService;