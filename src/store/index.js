import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// Make Axios play nice with Django CSRF
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default new Vuex.Store({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      // obtainJWT: 'http://127.0.0.1:8000/api/v1/auth/obtain_token/',
      // refreshJWT: 'http://127.0.0.1:8000/api/v1/auth/refresh_token/',
      // baseUrl: 'http://localhost:8000/api/v1/'
      obtainJWT: 'http://192.168.0.127/api/v1/auth/obtain_token/',
      refreshJWT: 'http://192.168.0.127/api/v1/auth/refresh_token/',
      baseUrl: 'http://192.168.0.127/api/v1/'
    }
  },
  getters: {
        /* Partially Implemented not for production use */
        loggedIn: state => !!state.isAuthenticated

    },
  mutations: {
    setAuthUser(state, {
      authUser,
      isAuthenticated
    }) {
      Vue.set(state, 'authUser', authUser)
      Vue.set(state, 'isAuthenticated', isAuthenticated)
    },
    updateToken(state, newToken) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.removeItem('token');
      state.jwt = null;
    }
  }
})
