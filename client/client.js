$(function() {

    if ($('.page-title a').html() == 'teste') {//page-title

    $('#main-content').prepend('<style type="text/css">ul.profile-icons li.ddvote{height:20px;line-height:20px;font-size:12px;font-weight:bold}ul.profile-icons li.ddvote a{display:inline}.postbody ul.profile-icons li.ddvote img{cursor:default;vertical-align:middle}.postbody ul.profile-icons li.ddvote a img{cursor:pointer}</style>');

    var get_user = function() {
      var logout = $('#logout img')[0].title;
      return logout.slice(logout.indexOf('[')+2, logout.indexOf(']')-1);
    };

    var userLogin = get_user();
    var posts = $('.post').get();
    var postAuthor;
    var postHidden;
    var pathname;
    var categoria;
    var cat = 'Filmes Postados no Templo Shaolin';

    for (var i = 0; i < posts.length; i++) {

      pathname = $('.pathname-box').find('.nav')[1];
      categoria = $(pathname).find('span').html();

      postAuthor = $(posts[i]).find('.author a strong').html();
      if (!(postAuthor)) {
        postAuthor = $(posts[i]).find('.author a').html();
      }
      if (!(postAuthor)){
        postAuthor = $(posts[i]).find('.postprofile strong').html()
      }
      postHidden = $(posts[i]).find('.hidecode');

      var postId = posts[i].id;
      var postBody = $(posts[i]).find('.postbody');
      var postAuthorUrl = $(posts[i]).find('.author a').attr('href');
      var postIcons = $(posts[i]).find('.profile-icons');
      var imgVote = '<a href="#"><img style="position:relative;top:-3px;margin-right:3px" title="Obrigado" src="http://i38.servimg.com/u/f38/19/12/15/40/thanks10.gif" /></a>';
      var imgVoted = '<img style="position:relative;top:-3px;margin-right:3px" title="Obrigado" src="http://i38.servimg.com/u/f38/19/12/15/40/thanks11.gif" />';

      // //insere o botão de thank bloqueado para todos
      postIcons.prepend('<li class="ddvote"><li>');

      // if (get_user() != postAuthor) { //se não for o dono do topico
        $(postBody).find('.ddvote')[0].innerHTML = imgVote;
        if (categoria == cat) {
          //esconde o campo de links
          $(posts[i]).find('code').css('display','none');
          // $(posts[i]).find('blockquote').css('display','none');
        }
      // }

      $(postBody).append('<div id="lista"></div>');

      //callRest(postId, postBody);

    };

    $('.ddvote a').click(function(){
      var user = get_user();
      var cod = this.parentElement.parentElement.parentElement.parentElement.parentElement.id;
      //var url = 'http://shaolin-sfdata.rhcloud.com/post/' + cod + '/' + user;
      var url = 'http://protected-scrubland-17296.herokuapp.com/api/v1/post/' + cod + '/' + user;

      $.ajax({
        type: 'GET',
        url: url,
        async: false,
        // jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {

          console.log(json);

          if (json.length > 0) {

            var string;
            // var html = $(local).find('#lista')[0].innerHTML;
            var html = $(postBody).find('#lista')[0].innerHTML;
            
            for (var i = 0; i < json.length; i++) {

              if (json.length == '1') {
                html = '<hr><br><span class="content">'
                              +json.length+' pessoa agradeceu esse post:</span><br>'
              } else if (json.length != '1' && json.length != '0'){
                html = '<hr><br><span class="content">'+json.length+
                                        ' pessoas agradeceram esse post:</span><br>'
              }

              if (i == 0) {
                string = json[i].usuario;
              } else {
                string += ', ' + json[i].usuario;
              }
            }
            html += '<b><i><span class="content" id="tnks">'+string+'</span></i></b>';
            $(postBody).find('#lista')[0].innerHTML = html;

            /* se usuario que está logado está entre os que agradeceram deve-se:
             - colocar o botão desabilitado sem link
             - apresentar o campo com os links (code?) */
             if (json.indexOf(get_user()) > -1 ) {
               $(postBody).find('.ddvote')[0].innerHTML = imgVoted;
               if (categoria == cat) {
                 //esconde o campo de links
                 $(postBody).find('code').css('display','block');
                 // $(posts[i]).find('blockquote').css('display','none');
               }
             }

          }

          // console.log(x);
          // alert('Obrigado por agradecer!\nA página será recarregada para salvar.');
          // location.reload();

        },
        error: function(e) {
          alert('Erro!\nPor favor, recarregue a página e tente novamente.\nSe o erro persistir informe à administração do forum!');
        }
      });
    });
  } //IF TESTE
  });