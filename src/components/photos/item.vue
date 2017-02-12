<template>
  <div class="content">
    <div class="row">
      <div class="item" v-for="(todo, index) in list">
        <a @click="zoomIn(todo)">
          <img :src="todo.src" alt="" :height="todo.imgHeight">
        </a>
        <div class="bottom">
          <div class="left">
            <button type="button" class="btn btn-defult btn-sm" @click="addLike(todo._id)">
              <span class="glyphicon glyphicon-heart red"></span>
              {{ todo.like }}
            </button>
            <button type="button" class="btn btn-defult btn-sm">
              <span class="glyphicon glyphicon-plus"></span>
            </button>
          </div>
          <div class="middle">
            <a @click="jump(todo.author._id)">{{ todo.author.name }}</a>
          </div>
          <div class="right">
            <a :href="todo.src" download type="button" class="btn btn-info btn-sm">
              DOWNLOAD
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="div-next" v-if="photosNextButton">
      <a class="btn btn-default" @click="next">NEXT</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  let w = $('.item')
  console.log(w.width());
  export default {
    data: function(){
      return {
        search: this.$route.query.search
      }
    },
    computed: mapGetters({
      list: 'photosList',
      photosNextButton: 'photosNextButton'
    }),
    created () {
      let itemWidth = document.body.clientWidth
      if (itemWidth >= 1200) {
        this.$store.dispatch('getPhotosList', { search: this.search, itemWidth: 1120 })
      } else{
        this.$store.dispatch('getPhotosList', { search: this.search, itemWidth: itemWidth })
      }
    },
    methods: {
      ...mapActions({
        next: 'photosNext',
        addLike: 'photoAddLike',
        jump: 'peopleJump'
      }),
      zoomIn: function(photo){
        this.$emit('zoomIn', photo)
      }
    }
  }
</script>

<style scoped>
  .red{
    color: red;
  }
  a{
    cursor: pointer;
  }
  .content{
    width: 100%;
    margin: 0 auto;
  }
	@media (min-width: 1200px) {
    .content{
      max-width: 1120px;
      margin: 0 auto;
    }
  }
  .content .row{
    margin-bottom: 70px;
    margin-left: 0px;
    margin-right: 0px;
  }
  .content .item{
    width: 100%;
    margin-bottom: 10px;
  }
  .content .item>a{
    display: block;
    width: 100%;
    cursor: zoom-in;
    margin-bottom: 18px;
  }
  .content .item>a>img{
    display: block;
    width: 100%;
  }
  .content .item .bottom{
    width: 98%;
    height: 32px;
    overflow: hidden;
    color: #999;
    margin: 0 auto;
  }
  .content .item .bottom>.left{
    display: inline-block;
    width: 20%;
  }
  .content .item .bottom>.middle{
    display: inline-block;
    width: 59%;
    text-align: center;
    text-decoration: underline;
  }
  .content .item .bottom>.right{
    display: inline-block;
    width: 19%;
    text-align: right;
    font-weight: block;
  }
  .div-next{
    text-align: center;
    margin: 20px 0 40px;
  }
</style>
