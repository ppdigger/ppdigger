<template>
  <div class="content">
    <article class="item" v-for="(todo, index) in list">
      <header>
        <h2>
          <a @click="show(todo._id)">{{ todo.title }}</a>
        </h2>
        <h5>{{ todo.createTime }}</h5>
      </header>
      <blockquote>
        <p>{{ todo.blockquote }}</p>
      </blockquote>
      <footer>
        ————&nbsp;&nbsp;<a @click="jump(todo.author._id)">{{ todo.author.name }}</a>
      </footer>
    </article>
    <div class="div-next" v-if="blogsNextButton">
      <a class="btn btn-default" @click="next">NEXT</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: function(){
      return {
        search: this.$route.query.search
      }
    },
    computed: mapGetters({
      list: 'blogsList',
      blogsNextButton: 'blogsNextButton'
    }),
    created: function() {
      if(this.$store.blogsList == null){
        this.$store.dispatch('getBlogsList', this.search)
      }
    },
    methods: {
      ...mapActions({
        next: 'blogsNext',
        show: 'blogsShow',
        jump: 'peopleJump'
      })
    }
  }

</script>

<style scoped>
  .content{
    max-width: 850px;
    margin: 90px auto 0;
    padding: 0 1.4em;
  }
  .content a{
    text-decoration: none;
    cursor: pointer;
  }
  article h2{
    margin: .8em 0;
  }
  article h2>a{
    font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    color: #555;
    font-weight: 600;
  }
  article h2>a:visited{
    color: #969696
  }
  article h5{
    margin: .4em 0 1.2em;
    text-indent: 1em;
    color: #7f8c8d
  }
  article blockquote{
    padding: 0 10px 0 20px;
    border-left: 4px solid #42b983;
    font-size: 14px;
    line-height: 2em;
  }
  article footer{
    color: #42b983;
    font-size: 14px;
    text-align: right;
  }
  .div-next{
    text-align: center;
    margin: 20px 0 40px;
  }
</style>
