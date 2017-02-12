import photos from '../../../api/photos'
import * as types from '../mutation-types'

const state = {
  photosListPage: 0,
  photosListLimit: 8,
  photosNextButton: true,
  photosListUrl: 'http://120.77.254.193:3000/api/photosList',
  photosList: [],
  photoAddLikeUrl: 'http://120.77.254.193:3000/api/addLike',
  photosSearch: ''
}

const getters = {
  photosList: state => state.photosList,
  photosNextButton: state => state.photosNextButton
}

const actions = {
  getPhotosList ({ commit }, { search, itemWidth }) {
    commit(types.PHOTOSLIST_SEARCH, search)
    if(state.photosList == 0){
      photos.getPhotosList(state.photosListUrl, {search: state.photosSearch, page: state.photosListPage, limit: state.photosListLimit }, (err, response) => {
        if(err){
          console.log('getPhotosList err: ',err)
          return
        }else if(response){
          let photosList = response.body.data
          if(photosList.length != 0){
          commit(types.PHOTOSLIST_GET_SUCCESS, { photosList })
            if(photosList.length < state.photosListLimit){
              commit(types.PHOTOS_NEXT_BUTTON_CLOSE)
            }
          } else{
            commit(types.PHOTOS_NEXT_BUTTON_CLOSE)
          }
          for (var i = 0; i < photosList.length; i++) {
            let height = photosList[i].height
            let width = photosList[i].width
            let photoScale = parseFloat(height/width).toFixed(2)
            photosList[i].imgHeight = itemWidth * photoScale

          }
        }
      })
    }
  },
  photosNext ({ commit }) {
    commit(types.PHOTOSLIST_NEXT)
    photos.getPhotosList(state.photosListUrl, {search: state.photosSearch, page: state.photosListPage, limit: state.photosListLimit }, (err, response) => {
      if(err){
        console.log('getPhotosList err: ',err)
        return
      }else if(response){
        let photosList = response.body.data
        if(photosList.length != 0){
        commit(types.PHOTOSLIST_GET_SUCCESS, { photosList })
          if(photosList.length < state.photosListLimit){
            commit(types.PHOTOS_NEXT_BUTTON_CLOSE)
          }
        } else{
          commit(types.PHOTOS_NEXT_BUTTON_CLOSE)
        }
      }
    })
  },
  photoAddLike({ commit }, id){
    let photo = state.photosList.find( photo => photo._id === id )
    if( typeof photo.likeType === 'undefined' || photo.likeType ){
      photos.addLike(state.photoAddLikeUrl, photo._id, (err, response) => {
        if(err){
          console.log('addLike err: ',err)
        }
      })
      commit(types.PHOTO_ADD_LIKE, {
        id: photo._id
      })
    }
  }
}

const mutations = {
  [types.PHOTOSLIST_SEARCH] (state, search) {
    state.photosSearch = search
  },
  [types.PHOTOSLIST_GET_SUCCESS] (state, { photosList }) {
    state.photosList = state.photosList.concat(photosList)
  },
  [types.PHOTOSLIST_NEXT] (state) {
    console.log('PHOTOSLIST_NEXT')
    state.photosListPage++
  },
  [types.PHOTO_ADD_LIKE] (state, { id }) {
    let photo = state.photosList.find( photo => photo._id === id )
    photo.like++
    photo.likeType = false
  },
  [types.PHOTOS_NEXT_BUTTON_CLOSE] (state) {
    state.photosNextButton = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
