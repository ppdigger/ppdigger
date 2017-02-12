import blogs from '../../../api/blogs'
import * as types from '../mutation-types'
import router from '../../router'

const state = {
  blogsListPage: 0,
  blogsListLimit: 5,
  blogsNextButton: true,
  blogsListUrl: 'http://120.77.254.193:3000/api/blogsList',
  blogsList: [],
  blogUrl: 'http://120.77.254.193:3000/api/blog',
  blog: null,
  blogsSearch: ''
}

const getters = {
  blogsList: state => state.blogsList,
  blog: state => state.blog,
  blogsNextButton: state => state.blogsNextButton
}

const actions = {
  getBlogsList ({ commit }, search) {
    commit(types.BLOGSLIST_SEARCH, search)
    if(state.blogsList.length == 0){
      blogs.getBlogsList(state.blogsListUrl, {search: state.blogsSearch, page: state.blogsListPage, limit: state.blogsListLimit }, (err, response) => {
        if(err){
          console.log('getBlogsList err: ', err)
          return
        }else if(response){
          let blogsList = response.body.data
          if(blogsList.length != 0){
            commit(types.BLOGSLIST_GET_SUCCESS, { blogsList })
            if(blogsList.length < state.blogsListLimit){
              commit(types.BLOGS_NEXT_BUTTON_CLOSE)
            }
          } else{
            commit(types.BLOGS_NEXT_BUTTON_CLOSE)
          }
        }
      })
    }
  },
  blogsNext ({ commit }) {
    commit(types.BLOGSLIST_NEXT)
    blogs.getBlogsList(state.blogsListUrl, {search: state.blogsSearch, page: state.blogsListPage, limit: state.blogsListLimit }, (err, response) => {
      if(err){
        console.log('getPhotosList err: ',err)
        return
      }else if(response){
        let blogsList = response.body.data
        if(blogsList.length != 0){
          commit(types.BLOGSLIST_GET_SUCCESS, { blogsList })
          if(blogsList.length < state.blogsListLimit){
            commit(types.BLOGS_NEXT_BUTTON_CLOSE)
          }
        } else{
          commit(types.BLOGS_NEXT_BUTTON_CLOSE)
        }
      }
    })
  },
  blogsShow ({ commit }, id) {
    router.push( '/blogs/' + id )
  },
  getBlog ({ commit }, id) {
    let flag = true
    let blogsList = state.blogsList
    if(blogsList.length == 0){
      flag = true
    } else{
      for(var i in blogsList){
        if(id == blogsList[i]._id){
          flag = false
          let blog = blogsList[i]
          commit(types.BLOG_GET_SUCCESS, { blog })
          return
        } else{
          flag = true
        }
      }
    }
    if(flag){
      blogs.getBlog(state.blogUrl, { id: id }, (err, response) => {
        if(err){
          console.log('getBlog err: ', err)
          return
        } else if(response){
          let blog = response.body.data
          commit(types.BLOG_GET_SUCCESS, { blog })
        }
      })
    }
  }
}

const mutations = {
  [types.BLOGSLIST_SEARCH] (state, search) {
    state.blogsSearch = search
  },
  [types.BLOGSLIST_GET_SUCCESS] (state, { blogsList }) {
    state.blogsList = state.blogsList.concat(blogsList)
  },
  [types.BLOGSLIST_NEXT] (state) {
    console.log('BLOGSLIST_NEXT')
    state.blogsListPage++
  },
  [types.BLOG_GET_SUCCESS] (state, { blog }) {
    state.blog = blog
  },
  [types.BLOGS_NEXT_BUTTON_CLOSE] (state) {
    state.blogsNextButton = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
