<template>
  <div id="login">
    <form role="form" class="form-horizontal" onsubmit="return false">
      <div class="form-group">
        <label for="inputEmail" class="col-sm-2 col-xs-2 control-label">邮箱</label>
        <div class="col-sm-10 col-xs-10">
          <input name="email" id="inputEmail" class="form-control" v-model="email">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="col-sm-2 col-xs-2 control-label">密码</label>
        <div class="col-sm-10 col-xs-10">
          <input type="password" name="password" id="inputPassword" class="form-control" v-model="password">
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-default col-sm-offset-2" @click="login({ email, password })">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'



  export default {
    data: function(){
      return {
        email: '',
        password: ''
      }
    },
    computed: mapGetters({
      token: 'token'
    }),
    methods: mapActions({
      login: 'login'
    }),
    watch: {
      token: function(val, oldVal){
        if(val != null){
          this.$router.push('goods')
        }
      }
    }

  }
</script>

<style scoped>
  #login{
    width: 100%;
    margin: 0 auto;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
  }
  .form-group label{
    padding-top: 7px;
    margin-bottom: 0;
    text-align: center;
  }
  .form-group{
    width: 100%;
    text-align: center;
  }
	@media (min-width: 1200px) {
    #login > form{
      width: 800px;
      margin: 0 auto;
    }
  }

</style>
