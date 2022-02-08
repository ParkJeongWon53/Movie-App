import axios from 'axios'

export default {
  // module!
  namespaced:true,

  // data!
  state: () => {
    return {
      movies: []
    }
  },

  //computed!
  getters: {
    
  },

  // methods!
  // 변이
  // mutations 에서만 데이터를 변경할 수 있다.
  mutations:{
    updatedState(state, payload){
      // ['movies', 'message', 'loading'] payload 전달된 겍체데이터는 Object.keys 를 통해 배열데이터로 forEach를 통해 반복
      Object.keys( payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // 비동기
  actions: {
    async searchMovies(context, payload) {
      const { title, type, number ,year } = payload
      const OMDB_API_KEY = '7035c60c'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalReults } = res.data
      context.commit('updatedState', {
        movies: Search,
        message: 'Hello world!',
        loading: true
      })
    }
  }
}