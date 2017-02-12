<template>
  <div id="goods">
    <div class="header">
    	<div>
	    	<h1>值得购买</h1>
	    	<p>Life in the Future</p>
    	</div>
    </div>
    <item></item>
  </div>
</template>

<script>
  import Item from '../components/goods/Item.vue'

  export default {
    components: {
      Item
    }
  }

</script>

<style scoped>
  #goods{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding-bottom: 50px;
  }
  #goods>.header{
    height: 250px;
    background-image: url(http://cdn.pingwest.com/wp-content/uploads/2017/01/Amazon-Echo.jpg);
    background-position: center;
    background-size: cover;
    padding: 100px 20px 0;
    margin-bottom: 20px;
  }
  #goods>.header>div{
  	/*width: 1120px;*/
  	margin: 0 auto;
  	border-bottom: 1px solid rgba(255,255,255,.2);
  	overflow: visible;
  }
  #goods>.header>div>h1{
  	color: #00F5FF;
    opacity: .9;
  	font-weight: 600;
  }
	#goods>.header>div>p{
  	color: #00FFFF;
    opacity: .7;
  	font-size: 22px;
  }
</style>
