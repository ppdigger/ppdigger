<template>
  <div class="comment">
    <div class="title">{{ commentList.length }}条评论</div>
    <div class="comment-list">
      <div class="row" v-for="(todo, index) in commentList">
        <div class="comment-info">
          <span class="author">{{ todo.author.name }}</span><br/>
          <span class="time">{{ todo.createTime }}</span>
        </div>
        <div>
          <div class="comment-body" v-html="compiledMarkdown(todo.body)">

          </div>
        </div>
      </div>
    </div>
    <div class="none-comment text-center" v-show="commentList == ''">
      <span>暂无评论</span>
    </div>
    <div class="new-comment" v-if="token">
      <textarea v-model="input" placeholder="写下你的评论..."></textarea>
      <div class="write-function-block">
        <span class="glyphicon glyphicon-info-sign"></span>
        <span class="tip">评论支持markdown语法</span>
        <a class="btn default-btn pull-right" @click="addComment()">发表</a>
      </div>
    </div>
    <div class="new-comment" v-else>
      <div class="inner">
        <a class="btn btn-success" @click="jump">登录后发表</a>
      </div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import router from '../router'

  export default {
    props: ['type', 'articleId', 'token'],
    data: function(){
      return {
        commentList: '',
        input: ''
      }
    },
    methods: {
      compiledMarkdown: function(body){
        return marked(body, { sanitize: true })
      },
      addComment: function(){
        let url = 'http://120.77.254.193:3000/api/addComment',
            _type = this.type,
            _articleId = this.articleId,
            _body = this.input,
            _id = this.$store.getters.id,
            _this = this;
        if(_type && _articleId){
          if (_id) {
            if (_body) {
              this.$http.post(url, { id: _id, type: _type, articleId: _articleId, body: _body })
                .then(response => {
                  console.log(response);
                  this.findCommentList();
                  _this.input = '';
                })
                .catch(response => {
                  console.log(response);
                })
            } else{
              alert('请输入内容再提交')
            }
          } else{
            alert('请登录')
          }
        } else{
          alert('error')
        }
      },
      findCommentList: function(){
        let url = 'http://120.77.254.193:3000/api/findComment',
            _type = this.type,
            _articleId = this.articleId;
        if(_type && _articleId){
          this.$http.post(url, { type: _type, articleId: _articleId })
            .then(response => {
              this.commentList = response.body.data;
              console.log(response);
            })
            .catch(response => {
              console.log(response);
            })
        }
      },
      jump: function(){
        router.push({ path: '/login' })
      }
    },
    created: function(){
      this.findCommentList()
    }
  }
</script>

<style scoped>
  .comment{
    padding: 20px 0 80px;
  }
  .comment > .title{
    font-size: 17px;
    color: #333;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
  }
  .comment .none-comment{
    margin-top: 40px;
  }
  .comment-list > .row{
    padding: 20px 0 30px;
    border-bottom: 1px solid #f0f0f0;
  }
  .comment-info{
    padding: 0 30px;
  }
  .comment-info > .author{
    font-weight: 600;
    color: #444;
  }
  .comment-info > .time{
    font-size: 12px;
    color: #969696;
  }
  .comment-body{
    font-size: 16px;
    line-height: 1.5em;
    padding: 10px 60px;
    color: #555;
    word-break: break-all;
  }
  .new-comment{
    margin-top: 50px;
  }
  .new-comment textarea{
    padding: 10px 15px;
    width: 100%;
    height: 80px;
    font-size: 13px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
  }
  .new-comment .inner{
    text-align: center;
    padding: 10px 15px;
    width: 100%;
    height: 80px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
  }
  .new-comment .inner>a{
    margin-top: 15px;
  }
  .new-comment .glyphicon{
    color: #ccc;
    font-size: 13px;
  }
  .new-comment .tip{
    font-size: 13px;
    line-height: 16px;
    color: #999;
  }
</style>
