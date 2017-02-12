<template>
  <div id="people" class="row">
    <div class="col-md-4 bs-docs-sidebar" role="complementary">
      <ul class="nav">
        <li class="active"><a href="#">简介</a></li>
        <li><a href="#">li1</a></li>
        <li><a href="#">li2</a></li>
      </ul>
    </div>
    <div class="col-md-8">
      <router-view :id="id"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        id: this.$route.params.id
      }
    }
  }
</script>

<style scoped>
  #people{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 25px;
  }
  .bs-docs-sidebar .nav>li>a{
    display: block;
    padding: 4px 20px;
    font-size: 13px;
    font-weight: 500;
    color: #999;
  }
  .bs-docs-sidebar .nav>li.active>a{
    padding-left: 18px;
    font-weight: 700;
    color: #563d7c;
    background-color: transparent;
    border-left: 2px solid #563d7c;
  }
</style>
