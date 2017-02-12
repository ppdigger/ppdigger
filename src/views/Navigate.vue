<template>
  <!-- <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><router-link :to="{ path: '/goods' }">好物</router-link></li>
          <li><a>|</a></li>
          <li><router-link :to="{ path: '/photos' }">摄影</router-link></li>
          <li><a>|</a></li>
          <li><router-link :to="{ path: '/blogs' }">Blog</router-link></li>
        </ul>
        <ul class="nav navbar-nav pull-right" v-if="checkStatus==1">
          <li v-if="token" class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown">{{ name }}<span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a @click="jump()">个人主页</a></li>
              <li><router-link :to="{ path: '/editor' }">发表blog</router-link></li>
              <li><a @click="quit">退出</a></li>
            </ul>
          </li>
          <li v-if="!token"><router-link :to="{ path: '/login' }">登录</router-link></li>
          <li v-if="!token"><router-link :to="{ path: '/logon' }">注册</router-link></li>
        </ul>
        <ul class="nav navbar-nav pull-right" v-if="checkStatus==0">
          <li>
            <a title="验证登录中…">
              <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i>
              <span class="sr-only">Loading...</span>
            </a>
          </li>
        </ul>
      </div>
  </nav> -->
<nav>
	<div class="cont">
		<ul class="nav">
      <li><router-link :to="{ path: '/goods' }">好物</router-link></li>
      <li><router-link :to="{ path: '/photos' }">摄影</router-link></li>
      <li><router-link :to="{ path: '/blogs' }">Blog</router-link></li>
		</ul>
    <ul class="nav pull-right" v-if="checkStatus==1">
      <li v-if="token" class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">{{ name }}<span class="caret"></span></a>
        <ul class="dropdown-menu" role="menu">
          <li><a @click="jump()">个人主页</a></li>
          <li><router-link :to="{ path: '/editor' }">发表blog</router-link></li>
          <li><a @click="quit">退出</a></li>
        </ul>
      </li>
      <li v-if="!token"><router-link :to="{ path: '/login' }">登录</router-link></li>
      <li v-if="!token"><router-link :to="{ path: '/logon' }">注册</router-link></li>
    </ul>
    <ul class="nav navbar-nav pull-right" v-if="checkStatus==0">
      <li>
        <a title="验证登录中…">
          <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </a>
      </li>
    </ul>
	</div>
</nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: mapGetters({
      checkStatus: 'checkStatus',
      token: 'token',
      name: 'name'
    }),
    methods: {
      ...mapActions({
        checkSuccess: 'checkSuccess',
        checkFail: 'checkFail',
        quit: 'quit',
        jump: 'peopleJump'
      })
    },
    created: function(){
      let url = 'http://120.77.254.193:3000/api/checktoken'
      this.$http.post(url, {})
        .then(response => {
          let status = response.data.status
          if(status == 0){
            let data = response.data.data
            this.$store.dispatch('checkSuccess', {token: data.token, name: data.name, id: data.id})
          } else{
            this.$store.dispatch('checkFail')
          }
        })
        .catch(response => {
          this.$store.dispatch('checkFail')
        })
    }
  }

</script>

<style scoped>
  .dropdown-toggle{
    cursor: default;
  }
	.dropdown-menu{
		min-width: 100px;
	}
	.dropdown-menu > li{
		width: 100%;
	}
  nav{
		width: 100%;
		position: relative;
		min-height: 50px;
		margin-bottom: 20px;
		border: 1px solid transparent;
  	box-shadow: 0px 1px 10px #BBB5B5;
		background-color: #f8f8f8;
		border-color: #e7e7e7;
  }
	.nav{
		display: inline-block;
	}
	nav li a{
		color: #777;
	}
	nav li{
		float: left;
	}
  .dropdown-menu a{
    cursor: pointer;
  }
	.cont{
		padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
	}
	@media (min-width: 768px) {
		.cont {
		    width: 750px;
		}
	}
	@media (min-width: 992px) {
		.cont {
		    width: 970px;
		}
	}
	@media (min-width: 1200px) {
		.cont {
		    width: 1170px;
		}
	}
	@media (max-width: 768px) {
		.cont {
			width: 100%;
		}
	}
</style>
