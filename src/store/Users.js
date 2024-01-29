import {defineStore} from 'pinia';
import api from '../services/front';
import http from '../services/back';

export const UserStore = defineStore('users', {
    state: () => {
        return {
            users: [],
            languages: [],
            repositories: [],
            saveLocal: '',
        }
    },
    actions: {
        getUsers() {
            this.users = [];
            const developers = ['wallysonn', 'diego3g', 'filipedeschamps', 'rmanguinho'];
            for (const developer of developers) {
                api.get(`/users/${developer}`)
                    .then((response) => {
                        this.users.push(response.data);
                    });
            }
        },

        getRepositories(username) {
            api.get(`/users/${username}/repos`)
                .then((response) => {
                    this.repositories = response.data;
                });
        },

        getLanguages(username, repository) {
            api.get(`/repos/${username}/${repository}/forks`)
                .then((response) => {
                    this.languages = response.data;
                });
        },

        postSaveLocal(username) {
            http.post('/salvar-local', {username: username});
        },

        formatDate(dateString) {
            const options = {year: 'numeric', month: 'long', day: 'numeric'};
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
    },
})