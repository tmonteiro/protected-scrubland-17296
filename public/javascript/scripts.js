document.getElementById("teste").addEventListener("click", function(){

    var url='https://protected-scrubland-17296.herokuapp.com/posts/';

    var textarea = document.getElementById("txtarea").value.split("\n");

    document.getElementById("total").innerHTML = textarea.length;

    var count=0;
    var dados = textarea.map(function(data){
        var linha = data.split(",");
        var retorno = service(linha);
        count++;
        document.getElementById("parcial").innerHTML = count;
    });
    
    function service (item) {
        $.ajax({
            type: 'GET',
            url: url + item[0] + '/' + item[1],
            contentType: "application/json",
            async: false,
            dataType: 'json',
            success: function(json) {
                return true;
            },
            error: function(e) {
                alert('Erro!');
            }
          });
    }


    

});