import goods from '../../../api/goods'
import * as types from '../mutation-types'
import router from '../../router'

const state = {
  goodsListPage: 0,
  goodsListLimit: 8,
  goodsNextButton: true,
  goodsListUrl: 'http://120.77.254.193:3000/api/goodsList',
  goodsList: [],
  goodUrl: 'http://120.77.254.193:3000/api/good',
  good: null
}

const getters = {
  goodsListPage: state => state.goodsListPage,
  goodsListLimit: state => state.goodsListLimit,
  goodsListUrl: state => state.goodsListUrl,
  goodsList: state => state.goodsList,
  good: state => state.good,
  goodsNextButton: state => state.goodsNextButton
}

const actions = {
  getGoodsList ({ commit }) {
    if(state.goodsList.length == 0){
      goods.getGoodsList(state.goodsListUrl, { page: state.goodsListPage, limit: state.goodsListLimit }, goodsList => {
        if(goodsList.length != 0){
        commit(types.GOODSLIST_GET_SUCCESS, { goodsList })
          if(goodsList.length < state.goodsListLimit){
            commit(types.GOODS_NEXT_BUTTON_CLOSE)
          }
        } else{
          commit(types.GOODS_NEXT_BUTTON_CLOSE)
        }
      })
    }
  },
  goodsNext ({ commit }) {
    commit(types.GOODSLIST_NEXT)
    goods.getGoodsList(state.goodsListUrl, { page: state.goodsListPage, limit: state.goodsListLimit }, goodsList => {
      if(goodsList.length != 0){
      commit(types.GOODSLIST_GET_SUCCESS, { goodsList })
        if(goodsList.length < state.goodsListLimit){
          commit(types.GOODS_NEXT_BUTTON_CLOSE)
        }
      } else{
        commit(types.GOODS_NEXT_BUTTON_CLOSE)
      }
    })
  },
  goodsShow ({ commit }, id) {
    router.push( '/goods/' + id )
  },
  getgood ({ commit }, id) {
    let flag = true
    let goodsList = state.goodsList
    if(goodsList.length == 0){
      flag = true
    } else{
      for(var i in goodsList){
        if(id == goodsList[i]._id){
          flag = false
          let good = goodsList[i]
          commit(types.GOOD_GET_SUCCESS, { good })
          return
        } else{
          flag = true
        }
      }
    }
    console.log(flag)
    if(flag){
      goods.getGood(state.goodUrl, { id: id }, (err, response) => {
        if(err){
          console.log('getGood err: ', err)
          return
        } else if(response){
          let good = response.body.data
          commit(types.GOOD_GET_SUCCESS, { good })
        }
      })
    }
  }
}

const mutations = {
  [types.GOODSLIST_GET_SUCCESS] (state, { goodsList }) {
    state.goodsList = state.goodsList.concat(goodsList)
  },
  [types.GOODSLIST_NEXT] (state) {
    state.goodsListPage++
  },
  [types.GOOD_GET_SUCCESS] (state, { good }) {
    state.good = good
  },
  [types.GOODS_NEXT_BUTTON_CLOSE] (state) {
    state.goodsNextButton = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
