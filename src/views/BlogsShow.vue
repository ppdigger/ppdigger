<template>
  <div class="blog">
    <article v-if="blog">
      <header>
        <h1 class="title">{{ blog.title }}</h1>
        <div class="avathar">

        </div>
        <div class="info">
          <span class="tag">作者</span>
          <span class="name"><a @click="jump(blog.author._id)">{{ blog.author.name }}</a></span>
          <div class="time">
            {{ blog.createTime }}
          </div>
        </div>
      </header>
      <p class="body" v-html="blog.body"></p>
      <footer>
        <comment type="blog" :article-id="id" :token="token"></comment>
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
      list: 'blogsList',
      blog: 'blog',
      token: 'token'
    }),
    data: function(){
      return {
        id: this.$route.params.id
      }
    },
    created: function(){
        this.$store.dispatch('getBlog', this.id)
    },
    methods: {
      ...mapActions({
        jump: 'peopleJump'
      })
    }
  }
</script>

<style>
  .blog{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin: 90px auto 0;
    padding: 0 15%;
  }
  .blog a{
    text-decoration: none;
    cursor: pointer;
  }
  .blog .title{
    word-break: break-word;
    margin: 20px 0 0;
    font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    font-size: 34px;
    font-weight: 700;
    line-height: 1.3;
    padding-bottom: 1.5em;
  }
  .blog .avathar{
    margin-left: 5%;
    width: 48px;
    height: 48px;
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 50%;
    background: -webkit-linear-gradient(left bottom,#127CE7,#4AD89C);
  }
  .blog .info{
    padding-left: 10px;
    padding-bottom: 3em;
    display: inline-block;
  }
  .blog .info .tag{
    padding: 1px 2px;
    font-size: 12px;
    color: #ea6f5a;
    border: 1px solid #ea6f5a;
    border-radius: 3px;
  }
  .blog .info .name{
    margin-left: 3px;
    margin-right: 3px;
    font-size: 16px;
    font-weight: 700;
    vertical-align: middle;
  }
  .blog .info .time{
    margin-top: 5px;
    font-size: 12px;
    color: #969696;
    text-indent: 3em
  }
  article h2{
    margin: .8em 0;
  }
  article h5{
    margin: 1.2em 0;
    color: #7f8c8d
  }
  article blockquote{
    padding: 0 10px 0 20px;
    border-left: 4px solid #42b983
  }


  article .body p {
  	margin:0 0 25px
  }
  article .body .video-package .video-description p,article .body blockquote p:last-child {
  	margin:0
  }
  article .body li p {
  	overflow:visible
  }
  article .body a {
  	color:#3194d0
  }
  article .body a:hover {
  	color:#3194d0;
  	text-decoration:underline
  }
  article .body a.active,article .body a:active,article .body a:focus {
  	color:#3194d0
  }
  article .body a.disabled,article .body a.disabled.active,article .body a.disabled:active,article .body a.disabled:focus,article .body a.disabled:hover,article .body a[disabled],article .body a[disabled].active,article .body a[disabled]:active,article .body a[disabled]:focus,article .body a[disabled]:hover {
  	cursor:not-allowed;
  	color:#f5f5f5
  }
  article .body ol,article .body p,article .body ul {
  	word-break:normal;
  	word-break:break-word
  }
  article .body hr {
  	margin:0 0 20px;
  	border-top:1px solid #ddd
  }
  article .body h1,article .body h2,article .body h3,article .body h4,article .body h5,article .body h6 {
  	margin:0 0 15px;
  	font-weight:700;
  	color:#2f2f2f;
  	line-height:1.7;
  	text-rendering:optimizelegibility
  }
  article .body h1 {
  	font-size:26px
  }
  article .body h2 {
  	font-size:24px
  }
  article .body h3 {
  	font-size:22px
  }
  article .body h4 {
  	font-size:20px
  }
  article .body h5 {
  	font-size:18px
  }
  article .body h6 {
  	font-size:16px
  }
  article .body blockquote {
  	padding:20px;
  	margin-bottom:25px;
  	background-color:#f7f7f7;
  	border-left:6px solid #b4b4b4;
  	word-break:break-word;
  	font-size:16px;
  	font-weight:400;
  	line-height:30px
  }
  article .body blockquote p {
  	font-size:16px;
  	font-weight:400;
  	line-height:1.7
  }
  article .body blockquote .image-package {
  	width:auto;
  	margin-left:0
  }
  article .body ol,article .body ul {
  	padding:0;
  	margin-left:22px;
  	margin-bottom:20px
  }
  article .body ol li,article .body ul li {
  	margin-bottom:10px;
  	line-height:30px
  }
  article .body ol li ol,article .body ol li ul,article .body ul li ol,article .body ul li ul {
  	margin-top:15px
  }
  article .body pre {
  	margin-bottom:20px;
  	padding:15px;
  	font-size:13px;
  	word-wrap:normal;
  	word-break:break-all;
  	white-space:pre;
  	overflow:auto;
  	border-radius:0
  }
  article .body pre code {
  	padding:0;
  	background-color:transparent;
  	white-space:pre
  }
  article .body code {
  	padding:2px 4px;
  	background-color:#f6f6f6;
  	border:none;
  	color:#657b83;
  	font-size:12px;
  	white-space:pre-wrap
  }
  article .body table {
  	width:100%;
  	margin-bottom:20px;
  	border:1px solid #ddd;
  	border-collapse:collapse;
  	border-left:none
  }
  article .body table thead th {
  	vertical-align:middle
  }
  article .body table td,article .body table th {
  	padding:8px;
  	border-left:1px solid #ddd;
  	border-top:1px solid #ddd;
  	line-height:20px;
  	vertical-align:middle
  }
  article .body table th {
  	font-weight:700
  }
  article .body table .image-package {
  	width:auto;
  	margin-left:0
  }
  article .body .image-package {
  	padding-bottom:25px;
  	width:700px;
  	margin:0 auto;
  	text-align:center;
  }
  article .body .image-package img {
  	max-width:100%;
  	height:auto;
  	vertical-align:middle;
  	border:0;
  	cursor:-webkit-zoom-in;
  	transition:all .25s ease-in-out
  }
  article .body .image-package .image-caption {
  	min-width:20%;
  	max-width:80%;
  	min-height:22px;
  	display:inline-block;
  	padding:10px;
  	margin:0 auto;
  	border-bottom:1px solid #d9d9d9;
  	font-size:14px;
  	color:#969696;
  	line-height:1.7
  }
  article .body .image-package .image-caption:empty {
  	display:none
  }
  article .body .video-package {
  	position:relative;
  	margin:-20px auto 20px;
  	text-align:center
  }
  article .body .video-package .video-placeholder-area {
  	position:relative;
  	display:inline-block;
  	height:110px;
  	padding:10px;
  	padding-left:120px;
  	box-sizing:border-box;
  	border:1px solid #d9d9d9;
  	background-color:hsla(0,0%,71%,.1);
  	text-align:left;
  	cursor:pointer
  }
  article .body .video-package .video-placeholder-area:after {
  	content:" ";
  	position:absolute;
  	top:-1px;
  	left:-1px;
  	display:block;
  	width:110px;
  	height:110px;
  	background-color:rgba(0,0,0,.3);
  	background-image:url(/assets/common/play-btn-c4bc06b9dfe063495b6b8277b14bc5c3.png);
  	background-position:30px;
  	background-size:50px;
  	background-repeat:no-repeat;
  	transition:all .1s linear
  }
  article .body .video-package .video-placeholder-area:hover:after {
  	background-color:transparent
  }
  article .body .video-package .video-placeholder-area .video-cover {
  	position:absolute;
  	top:-1px;
  	left:-1px;
  	display:block;
  	width:110px;
  	height:110px;
  	opacity:.8;
  	transition:opacity .1s linear
  }
  article .body .video-package .video-description {
  	min-width:20%;
  	min-height:22px;
  	display:none;
  	padding:10px;
  	margin:0 auto;
  	border-bottom:1px solid #d9d9d9;
  	font-size:13px;
  	color:#999;
  	line-height:1.7
  }
  article .body .video-package .video-description:empty {
  	display:none
  }
  article .body .video-package .video-close-button,article .body .video-package .video-provider-button {
  	text-align:left;
  	font-size:14px;
  	padding:0;
  	line-height:14px;
  	cursor:pointer;
  	transition:opacity .1s linear
  }
  article .body .video-package .video-close-button i,article .body .video-package .video-provider-button i {
  	position:relative;
  	top:1px
  }
  article .body .video-package .video-provider-button {
  	float:right
  }
</style>
