$(function(){
  $('.bs-docs-sidebar').on('click', 'li', function(){
    $(this).parent().find('li').removeClass('active')
    $(this).addClass('active')
  })
})
