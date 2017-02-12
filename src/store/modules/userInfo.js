import userinfo from '../../../api/userinfo'
import * as types from '../mutation-types'
import router from '../../router'

const state = {
  checkStatus: '0',
  token: '',
  name: '',
  id: '',
  loginUrl: 'http://120.77.254.193:3000/api/authenticate',
  logonUrl: 'http://120.77.254.193:3000/api/logon'
}

const getters = {
  checkStatus : state => state.checkStatus,
  token : state => state.token,
  name : state => state.name,
  id: state => state.id
}

const actions = {
  checkSuccess: function({ commit }, query){
    let token = query.token
    let name = query.name
    let id = query.id
    commit(types.CHECK_SUCCESS, { token, name, id })
  },
  checkFail: function({ commit }){
    commit(types.CHECK_FAIL)
  },
  login: function({ commit }, query){
    userinfo.login(state.loginUrl, {email: query.email, password: query.password}, response => {
      if(response.status == 0){
        let token = response.data.token
        let name = response.data.name
        let id = response.data.id
        window.localStorage.setItem('ppdiggertoken', token)
        router.go(-1)
        commit(types.LOGIN_SUCCESS, { token, name, id })
      } else{
        alert(response.message)
      }
    })
  },
  logon: function({ commit }, query){
    userinfo.logon(state.logonUrl, { email: query.email, password: query.password, name: query.name }, response => {
      let status = response.status
      if(status == 1){
        alert(response.message)
      } else if(status == 0){
        router.push('login')
      }
    })
  },
  quit: function({ commit }){
    window.localStorage.removeItem('ppdiggertoken')
    commit(types.QUIT_SUCCESS)
  },
  peopleJump: function({ commit }, id){
    console.log(state.id)
    if(id == undefined){
      id = state.id
    }
    router.push({ path: '/people/' + id })
  }
}

const mutations = {
  [types.LOGIN_SUCCESS] (state, { token, name, id }){
    state.token = token
    state.name = name
    state.id = id
  },
  [types.CHECK_SUCCESS] (state, { token, name, id }){
    state.checkStatus = '1'
    state.token = token
    state.name = name
    state.id = id
  },
  [types.CHECK_FAIL] (state){
    state.checkStatus = '1'
    state.token = ''
  },
  [types.QUIT_SUCCESS] (state){
    state.token = ''
    state.name = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
