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
    getProjectById(projectId) {
        return fetch(`${config.API_ENDPOINT}/projects/${projectId}`, {
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
    getChordById(id) {
        return fetch(`${config.API_ENDPOINT}/chords/${id}`, {
            headers: {
                Authorization: `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            (!res.ok)
            ? res.json().then(e => e.Promise.reject(e))
            : res.json()
        })
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
    },
    deleteProject(projectId) {
        return fetch(`${config.API_ENDPOINT}/projects/${projectId}`, {
            method: 'DELETE',
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
    deleteChord(id) {
        return fetch(`${config.API_ENDPOINT}/chords/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
        .then(res => 
            (!res.ok)
            ? res.json().then(e => e.Promise.reject(e))
            : null
        )
        .catch(error => {
            console.error({error})
        })
    }
}

export default ProjectsService;