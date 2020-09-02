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
}

export default ProjectsService;