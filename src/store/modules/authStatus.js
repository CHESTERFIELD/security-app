const authStatus = {
    state: {
        status: store.getItem('isAuthenticated')
    },
    getters: {
      authStatus: state => {
          return state.status
      }
    }
  }

export default authStatus
