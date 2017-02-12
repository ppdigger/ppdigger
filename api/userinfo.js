import Vue from 'vue'

export default {
  login (url, query, cb){
    Vue.http.post(url, query)
      .then(response => {
        let body = response.body
        cb(body)
      })
  },
  logon (url, query, cb){
    Vue.http.post(url, query)
      .then(response => {
        let body = response.body
        cb(body)
      })
  }
}
