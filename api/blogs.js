import Vue from 'vue'

export default {
  getBlogsList (url, query, cb){
    Vue.http.post(url, query)
      .then(response => {
        cb(null, response)
      })
      .catch(response => {
        cb(response, null)
      })
  },
  getBlog (url, query, cb){
    Vue.http.post(url, query)
      .then(response => {
        cb(null, response)
      })
      .catch(response => {
        cb(response, null)
      })
  }
}
