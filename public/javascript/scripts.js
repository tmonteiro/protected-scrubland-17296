document.getElementById("teste").addEventListener("click", function(){

    var url='http://localhost:5000/posts/';

    var textarea = document.getElementById("txtarea").value.split("\n");

    document.getElementById("total").innerHTML = textarea.length;
    var count=0;
    var dados = textarea.map(function(data){
        var linha = data.split(",");
        var retorno = service(linha);
        count++;
        document.getElementById("parcial").innerHTML = count;
    });

    // console.log(textarea);
    // var arr = [
    //     {cod_post: 'p61241', usuario: 'Hayllander'},
    //     {cod_post: 'p61031', usuario: 'Hayllander'},
    //     {cod_post: 'p61249', usuario: 'shang chi'}
    // ];
   
    
    function service (item) {
        $.ajax({
            type: 'GET',
            url: url + item[0] + '/' + item[1],
            contentType: "application/json",
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