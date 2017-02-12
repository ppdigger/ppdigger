<template>
  <div class="editor">
    <div class="info">
      <button class="btn btn-success" @click="publishBlog">发布</button><br/>
      <input v-model="title" @blur="saveTitle" type="text" class="form-control" placeholder="标题">
      <textarea v-model="blockquote" @blur="saveBlockquote" class="form-control" rows="3" placeholder="简介（400字内）" maxlength="400"></textarea>
    </div>
    <div class="write">
      <textarea :value="input" @input="update" debounce="2000" placeholder="正文"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import _ from 'lodash'
  import { Message } from 'element-ui'

  export default {
    data: function(){
      return {
        title: '',
        blockquote: '',
        input: ''
      }
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, { sanitize: true })
      }
    },
    created: function(){
      this.title = window.localStorage.getItem('blogtitle') ? window.localStorage.getItem('blogtitle') : ''
      this.blockquote = window.localStorage.getItem('blogblockquote') ? window.localStorage.getItem('blogblockquote') : ''
      this.input = window.localStorage.getItem('bloginput') ? window.localStorage.getItem('bloginput') : ''
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
        window.localStorage.setItem('bloginput', this.input)
      }, 300),
      saveTitle: function(){
        window.localStorage.setItem('blogtitle', this.title)
      },
      saveBlockquote: function(){
        window.localStorage.setItem('blogblockquote', this.blockquote)
      },
      publishBlog: function(){
        let _this = this,
            input = this.input,
            title = this.title,
            blockquote = this.blockquote
        if(input && title){
          let _id = this.$store.getters.id
          if (_id){
            let input = marked(this.input, { sanitize: true })
            this.$http.post('http://120.77.254.193:3000/api/addBlog', { id: _id, title: title, blockquote: blockquote, body: input })
              .then(response => {
                alert('发布成功')
                window.localStorage.removeItem('bloginput')
                window.localStorage.removeItem('blogtitle')
                window.localStorage.removeItem('blogblockquote')
              })
              .catch(response => {
                console.log(response);
              })
          } else{
            alert('请重新登录')
          }
        } else{
          alert('标题和内容不能为空')
        }
      }
    }
  }
</script>

<style scoped>
.editor {
  margin: 0;
  height: 90vh;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}
.editor > .info{
  padding: 0 20px 20px;
}
.editor > .info > input{
  margin: 5px 0;
}
.editor > .info textarea{
  resize: none;
}
.editor .write{
  height: 83%;
}
.editor .write textarea, .editor .write div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

.editor .write textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
