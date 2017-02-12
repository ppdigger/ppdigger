<template>
  <div class="content">
    <article v-if="good">
      <header :style="{ backgroundImage: 'url(' + good.picture + ')' }">
        <span class="overlay"></span>
        <h1>{{ good.title }}</h1>
        <div class="info">
          <a href="#">{{ good.author.name }}</a>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <span>{{ good.time }}</span>
        </div>
      </header>
      <div class="contenter">
        <blockquote v-show="good.subtitle">
          <p>{{ good.subtitle }}</p>
        </blockquote>
        <p class="c-article-content s-single-article js-article" v-html="good.content"></p>
      </div>
      <footer>
        <comment type="good" :article-id="id" :token="token"></comment>
      </footer>
    </article>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import comment from '../components/comment'

  export default {
    components: {
      comment
    },
    computed: mapGetters({
      good: 'good',
      token: 'token'
    }),
    data: function(){
      return {
        id: this.$route.params.id
      }
    },
    created: function(){
        this.$store.dispatch('getgood', this.id)
    }
  }
</script>

<style scoped>
  @import 'http://ifanr-cdn.b0.upaiyun.com/wp-content/themes/ifanr-4.0/static/dist/app-46e009d50f.min.css?ver=4.6.1';
  .content{
    width: 100%;
    margin:0;
    padding: 0;
  }
  .content a{
    text-decoration: none;
    cursor: pointer;
  }
  article header{
    position: relative;
    width: 100%;
    height: 500px;
    padding: 200px 50px 0;
    background-size: cover;
    background-position: center
  }
  article header .overlay{
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
  }
  article header h1{
    position: absolute;
    font-size: 46px;
    line-height: 1.4em;
    font-weight: bold;
    bottom: 150px;
    color: #fff;
  }
  article header .info{
    position: absolute;
    bottom: 50px;
    color: rgba(255, 255, 255, 0.5);
  }
  article header .info>a{
    color: rgba(255, 255, 255, 0.5);
  }
  article .contenter{
    max-width: 850px;
    margin: 0 auto;
    padding-top: 50px;
    font-size: 17px;
    line-height: 1.7em;
    color: rgba(0, 0, 0, 0.8);
  }
  article > footer{
    width: 70%;
    margin: 0 auto;
  }
</style>
