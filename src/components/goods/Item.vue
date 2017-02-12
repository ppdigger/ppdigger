<template>
  <div class="content">
    <div class="row">
      <div class="col col-xs-12" v-for="(todo,index) in list" :class="{ 'col-md-8': index%8 === 0, 'col-md-4': index%8 !== 0}">
        <div class="item">
          <div class="inner" :style="{ backgroundImage: 'url(' + todo.picture + ')' }">
            <span class="overlay"></span>
            <div class="title">
              <h3>{{ todo.title }}</h3>
            </div>
            <div class="subtitle">
              <p>{{ todo.subtitle }}</p>
            </div>
            <a @click="show(todo._id)"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="div-next" v-if="goodsNextButton">
      <a class="btn btn-default" @click="next">NEXT</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: mapGetters({
      goodsListPage: 'goodsListPage',
      goodsListLimit: 'goodsListLimit',
      goodsListUrl: 'goodsListUrl',
      list: 'goodsList',
      goodsNextButton: 'goodsNextButton'
    }),
    methods: mapActions({
      next: 'goodsNext',
      show: 'goodsShow'
    }),
    created () {
      this.$store.dispatch('getGoodsList')
    }

  }
</script>

<style scoped>
  .content{
    width: 100%;
    margin: 0 auto;
  }
  .content .col{
    padding: 0;
  }
  @media (min-width : 1200px) {
    .content{
      width: 1120px;
    }
    .content .row{
      margin-right: -15px;
      margin-left: -15px;
    }
    .content .col{
      padding-left: 5px;
      padding-right: 5px;
    }
  }
  .content .row{
    margin: 0;
  }
  .content .item{
    width: 100%;
    height: 300px;
    background: #ccc;
    margin-bottom: 10px;
  }
  .content .item:hover .overlay{
    background-color: rgba(0,0,0,0.6)
  }
  .content .item:hover .subtitle{
    left: 0;
  }
 .overlay{
    transition: all .5s;
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.2);
  }
  .content .item>.inner{
    position: relative;
    height: 100%;
    background: #eee;
    background-position: center;
    background-size: cover;
    overflow: hidden;
  }
  .title{
    position: absolute;
    bottom: 0;
    padding: 25px 25px 0 25px;
  }
  .title>h3{
    font-weight: bold;
    color: #fff;
    line-height: 1.5em;
  }
  .subtitle{
    transition: all .5s;
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    padding: 20px 15px 0px 15px;
    font-weight: bold;
    line-height: 1.5em;
    color: rgba(221,221,221,.8);
  }
  .content .item>.inner>a{
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
  .div-next{
    text-align: center;
    margin: 20px 0 40px;
  }
</style>
