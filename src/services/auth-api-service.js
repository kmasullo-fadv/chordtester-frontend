import config from '../config';

const AuthApiService = {
    postLogin(info) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(info),
        })
        .then(res => {
            return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
        })
    },
}

export default AuthApiService;