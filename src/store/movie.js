import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  // module!
  namespaced:true,

  // data!
  state: () => {
    return {
      movies: [],
      message: '',
      loading: false
    }
  },

  //computed!
  getters: {
    
  },

  // methods!
  // 변이
  // mutations 에서만 데이터를 변경할 수 있다.
  mutations:{
    updateState(state, payload){
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
    async searchMovies({ state, commit }, payload) {
      try {
        const res = await _fatchMovie({ 
          ...payload,
          page: 1
         })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults) // 305 => 31페이지
        console.log(typeof totalResults) // string
  
        const total = parseInt(totalResults, 10)
        const pageLenght = Math.ceil(total / 10)
  
        // 추가 요청, 페이지 설정
        if (pageLenght > 1) {
          for (let page = 2; page <= pageLenght; page += 1) {
            if (page > (payload.number /10)) {
              break
            }
            const res = await _fatchMovie({
              ...payload,
              page: page
            })
            const { Search } = res.data
            commit('updateState' , {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch( message){
        commit('updateState', {
          movies: [],
          message: message
        })
      }
    }
  }
}

function _fatchMovie(payload) {
  const { title, type, year, page } = payload
  const OMDB_API_KEY = '7035c60c'
  const  url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
  return new Promise((reslove, reject) => {
    axios.get(url)
      .then((res) => {
        if (res.data.Error) {
          reject(res.data.Error)
        }
        reslove(res)
      })
      .catch((err) => {
        reject(err.message)
      })
  })
}