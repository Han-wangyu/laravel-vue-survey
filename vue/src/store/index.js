import {createStore} from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        surveys: [
            {
                id: 1,
                image: '/vite.svg',
                title: 'test',
                description: 'test<br>test',
                questions: [
                    {
                        id: 1,
                        type: "select",
                        question: "From which country are you?",
                        description: null,
                        data: {
                            options: [
                                {uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "USA"},
                                {
                                    uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440",
                                    text: "Georgia",
                                },
                                {
                                    uuid: "b5c09733-a49e-460a-ba8a-526863010729",
                                    text: "Germany",
                                },
                                {uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513", text: "India"},
                                {
                                    uuid: "8d14341b-ec2b-4924-9aea-bda6a53b51fc",
                                    text: "United Kingdom",
                                },
                            ],
                        },
                    },
                    {
                        id: 2,
                        type: "checkbox",
                        question: "Which language videos do you want to see on my channel?",
                        description:
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
                        data: {
                            options: [
                                {
                                    uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
                                    text: "JavaScript",
                                },
                                {uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440", text: "PHP"},
                                {
                                    uuid: "b5c09733-a49e-460a-ba8a-526863010729",
                                    text: "HTML + CSS",
                                },
                                {
                                    uuid: "b5c09733-a49e-460a-ba8a-526863010729",
                                    text: "All of the above",
                                },
                                {
                                    uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
                                    text: "Everything Zura thinks will be good",
                                },
                            ],
                        },
                    },
                ]
            },
            {
                id: 2,
                image: '/vite.svg',
                title: 'test',
                description: 'test<br>test',
                questions: []
            },
            {
                id: 3,
                image: '/vite.svg',
                title: 'test',
                description: 'test<br>test',
                questions: []
            },
            {
                id: 4,
                image: '/vite.svg',
                title: 'test',
                description: 'test<br>test',
                questions: []
            },
        ],  // TODO
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    },
    getters: {},
    actions: {
        saveSurvey({commit}, survey) {
            let response;
            if (survey.id) {
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit("updateSurvey", res.data);
                        return res;
                    });
            } else {
                response = axiosClient
                    .post("/survey", survey)
                    .then((res) => {
                        commit("saveSurvey", res.data);
                        return res;
                    });
            }
        },
        register({commit}, user) {
            return axiosClient.post('/registers', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        login({commit}, user) {
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        logout({commit}) {
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout');
                    return response;
                });
        }
    },
    mutations: {
        saveSurvey: (state, survey) => {
            state.surveys = [...state.surveys, survey.data];
        },
        updateSurvey: (state, survey) => {
            state.surveys = state.surveys.map((s) => {
                if (s.id === survey.data.id) {
                    return survey.data;
                }
                return s;
            })
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {}
})

export default store
