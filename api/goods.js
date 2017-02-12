import Vue from 'vue'

export default {
  getGoodsList (url, query, cb){
    Vue.http.post(url, query)
      .then(response => {
        let goodsList = response.body.data
        cb(goodsList)
      })
  },
  getGood (url, query, cb){
    Vue.http.post(url, query)
      .then(response => {
        cb(null, response)
      })
      .catch(response => {
        cb(response, null)
      })
  }
}
