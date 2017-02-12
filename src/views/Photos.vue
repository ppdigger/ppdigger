<template>
  <div id="photos">

    <item @zoomIn="zoomIn"></item>
    <div class="fullPhoto" v-show="fullPhotoType">
      <div class="top">
        <div class="right">
          <button type="button" class="btn btn-defult btn-sm" @click="addLike(photo._id)">
            <span class="glyphicon glyphicon-heart red"></span>
            {{ photo.like }}
          </button>
            <a :href="photo.src" download type="button" class="btn btn-info btn-sm">
              DOWNLOAD
            </a>
        </div>
      </div>
      <div class="middle" @click="zoomOut" :style="{ backgroundImage: 'url(' + photo.src + ')' }">

      </div>
      <div class="bottom">

      <div>
    </div>
  </div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Item from '../components/photos/Item.vue'
  var photoWidth,
      photoHeight
  function create(width, height){
    photoWidth = width
    photoHeight = height
    calc()
    window.onresize = function(){
      calc()
    }
  }
  function destroy(){
    window.onresize = null
  }
  function calc(){
    var clientWidth = document.documentElement.clientWidth,
        clientHeight =document.documentElement.clientHeight,
        clientScale = parseFloat(clientWidth/clientHeight).toFixed(2),
        photoScale = parseFloat(photoWidth/photoHeight).toFixed(2),
        middleDiv = document.querySelector('.fullPhoto>.middle')
    if( photoScale>clientScale ){
      middleDiv.style.height = '100vh'
      middleDiv.style.overflowY = 'hidden'
    } else{
      middleDiv.style.overflowY = 'scroll'
      middleDiv.style.height = (clientWidth/photoWidth)*photoHeight + 'px'
    }
  }

  export default {
    components: {
      Item
    },
    data: function(){
      return {
        fullPhotoType: false,
        photo: {}
      }
    },
    methods: {
      ...mapActions({
        addLike: 'photoAddLike'
      }),
      zoomIn: function(photo){
        this.fullPhotoType = true
        this.photo = photo
        create(photo.width, photo.height)
        document.querySelector('body').style.overflowY = 'hidden'
      },
      zoomOut: function(){
      destroy()
      document.querySelector('body').style.overflowY = 'visible'
        this.fullPhotoType = false
      }
    }

  }

</script>

<style scoped>
  #photos{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding-bottom: 50px;
  }
  .red{
    color: red;
  }
  .fullPhoto{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
	.fullPhoto::-webkit-scrollbar {
    display:none
  }
  .fullPhoto .top{
    position: absolute;
    top: 0;
    width: 100%;
    padding: 15px 20px;
    pointer-events: none;
    z-index: 999;
  }
  .fullPhoto .top .right{
    float: right;
    pointer-events: auto;
  }
  .fullPhoto .middle{
    position: absolute;
    width: 100vw;
    background: #000;
    background-size: cover;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    cursor: zoom-out;
  }
	.fullPhoto .middle::-webkit-scrollbar {
    display:none;
  }
  .fullPhoto .bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 15px 20px;
  }
</style>
