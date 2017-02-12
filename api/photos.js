import Vue from 'vue'

export default {
  getPhotosList (url, query, cb){
    Vue.http.post(url, query)
      .then(response => {
        let photosList = response.body.data
        cb(null, response)
      })
      .catch(response => {
        cb(response, null)
      })
  },
  addLike (url, id, cb){
    Vue.http.post(url, {id: id})
        .then(response => {
          cb(null, response)
        })
        .catch(response => {
          cb(response, null)
        })
  }
}
