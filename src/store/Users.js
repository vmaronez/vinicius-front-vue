import { defineStore } from 'pinia';
import api from '../services/api';

export const UserStore = defineStore('users' , {
    state:  () =>{
        return {
            users: [],
            languages: [],
            repositories: [],
            saveLocal: '',
        }
    },
    actions: {
         async getUsers() {
            this.users = [];
            const developers = ['wallysonn', 'diego3g', 'filipedeschamps', 'rmanguinho'];
            for (const developer of developers) {
                const response = await api.get(`/users/${developer}`);
                this.users.push(response.data);
            }
        },

        async getRepositories(username) {
            const response = await api.get(`https://api.github.com/users/${username}/repos`);
            this.repositories = await response.data;
        },

        async getLanguages() {
            const response = await api.get('https://api.github.com/repos/wallysonn/BladeOne/forks');
            this.languages = await response.data;
        },

        async postSaveLocal(username) {
            const response = await api.post('http://vinicius-back.test/api/salvar-local/', {username: username});
            this.saveLocal = await response.data;
        },

        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
    },
})