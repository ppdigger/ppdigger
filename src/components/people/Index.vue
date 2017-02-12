<template>
  <div class="loading" v-if="loading">
    <h1>loading……</h1>
  </div>
  <div v-else>
    <div class="people-index"  v-if="info.length != 0">
      <div class="row">
        <div class="col-md-2 avatar">
            <img src="/static/img/53f3395a71ebe217.jpg" alt="" width="100" height="100">
        </div>
        <div class="col-md-8">
          <div class="row">
            <h3 class="name">{{ info.name }}</h3>
          </div>
          <div class="row">
            <h5 class="email">email：{{ info.email }}</h5>
          </div>
          <div class="row">
            <div class="count">
              <span><router-link :to="{ path: '/photos', query: { search: id } }">摄影作品 · {{ info.photoscount }}</router-link></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span><router-link :to="{ path: '/blogs', query: { search: id } }">博客 · {{ info.blogscount }}</router-link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="not-find" v-else>
      <h3>{{ err }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data: function(){
    return {
      loading: true,
      info: '',
      notFind: false,
      err: 'No such person'
    }
  },
  created: function(){
    console.log(this.id)
    this.$http.post('http://120.77.254.193:3000/api/people', { id: this.id })
      .then(response => {
        let data = response.data.data
        console.log(data)
        if(data.length == 0){
        } else{
          this.info = response.data.data
        }
        this.loading = false
      })
      .catch(response => {
        this.loading = false
        this.notFind = true
      })
  }
}
</script>

<style scoped>
  .loading>h1{
    text-align: center;
  }
  .people-index .name{
    font-weight: bold;
    color: #555;
  }
  .people-index .email{
      margin: 0;
      font-weight: bold;
      text-indent: 1em;
      color: #888
    }
  .avatar>img{
    border-radius: 100%;
    border: 0px solid;
    box-shadow: 0px 0px 20px #aaa;
  }
  .count{
    margin-top: 10px;
  }
  .count a{
    line-height: 2em;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
  }
  .not-find>h3{
    text-align: center;
    color: red;
    font-weight: 900
  }
</style>
