//variavel que recebe os dados da api
let data;

//variavel para receber os favorito
let favs = [];

//pega os dados da API  
fetch("https://restcountries.com/v2/all").then(result=>{
    result.json().then(res=>
        {
            // console.log(res);
            data = res;
            montaTabela(res);
        });
}).catch(error=>{
        console.log(error);
})

//funcao para favoritar um item
$("#lista").on("click", (e)=>
{
    //remove item de uma lista para colocar na outra
    if(e.target.id.includes("botao"))
    {
        // console.log(e.target.id);
        var id = e.target.id.split("o")[2]
        $("#botao"+ id).removeClass('fav-btn');
        $("#botao"+ id).addClass('liked');

        console.log(id);
        //salva as informações do pais favoritados no array
        favs.push(id -1);
        console.log(favs);

        //remove pais da lista ao lado
        setTimeout(()=>
        {
            $("#pais" + id).hide();   
            console.log($("#pais" + id));   
            montaFavs();
        }, 300);


    }

    if(e.target.id.includes("flag"))
    {
        var id = e.target.id.split("g")[1] - 1
        $("#flag").html(
            '<h1>Bandeira do pais: '+data[id].translations.br+'</h1>' + 
            '<img id="fimg" src="'+ data[id].flag+'">' +
            '<button id="close-flag">X</button>')
        
        $("#flag").css('display', 'flex');
        $("#fimg").css({'animation-name':'openModal', 'animation-iteration': '1', 'animation-duration':'0.3s'});

        $("#close-flag").on("click", ()=>{
            $("#flag").hide()
        })
    }

    if(e.target.id.includes("fav-botao"))
    {
        var id = e.target.id.split("o")[2]
        console.log("fav: " + id);
    }
})

//mostrar a bandeira e tirar item da lista de favoritos
$("#fav-lista").on("click", (e)=>{
    
    if(e.target.id.includes("fav-botao"))
    {
        var id = e.target.id.split("o")[2]
        console.log("fav: " + id);

        var i = favs.indexOf[id];
        favs.splice(i, 1);

        let oldId = parseInt(id) + 1;
        setTimeout(() => {
            $("#botao" + oldId).removeClass('liked');
            $("#botao" + oldId).addClass('fav-btn');
            $("#fav-pais" + id).remove();
            $("#pais" + oldId).show();
        }, 300);

        montaFavs() 
    }

    if(e.target.id.includes("flag"))
    {
        var id = e.target.id.split("g")[1] - 1
        $("#flag").html(
            '<h1>Bandeira do pais: '+data[id].translations.br+'</h1>' + 
            '<img id="fimg" src="'+ data[id].flag+'">' +
            '<button id="close-flag">X</button>')
        
        $("#flag").css('display', 'flex');
        $("#fimg").css({'animation-name':'openModal', 'animation-iteration': '1', 'animation-duration':'0.3s'});

        $("#close-flag").on("click", ()=>{
            $("#flag").hide()
        })
    }
})

//funcao que monta a tabela com os dados da api
function montaTabela(dataProvider)
{    
    var i = 1;
    var qnt_total = 0;

    dataProvider.sort().forEach(pais => {
        $("#lista").append(
            "<tr  class='paistr' id='pais"+ i +"'> " +
            "<td>" + i + "</td>"+ 
            "<td>" + pais.translations.br + "</td>"+ 
            "<td><img id='flag"+ i +"' src='"+pais.flag+"'></td>"+ 
            "<td>" + pais.population + "</td>"+ 
            "<td>" + pais.numericCode + "</td>"+ 
            "<td><button class='fav-btn' id='botao"+ i +"'></button></td>"+""+ 
            "</tr>"); 
        i++;
        qnt_total += pais.population;
    });
    
    //* adicionas as informações de quantidade de paises e numero de pessoas
    $("#info").append(           
    '<p>Quantidade de paises: <span style="color: red">' + dataProvider.length + '</span></p>' +
    '<p>Quantidade populacional total: <span style="color: red">' + qnt_total.toLocaleString(undefined) +'</span></p>');
}

//função que imprime a tabela de paises favoritados
function montaFavs()
{
    console.log(favs)
    $("#fav-info").html("");

    if(favs.length != 0)
    {
        //limpa a lista para imprimir novamente
        $("#fav-lista").html("");

        //variaveis para exibição
        var fav_qnt_pessoas = 0;
        //contador
        var i = 1;

        favs.sort().forEach(id =>{
            $("#fav-lista").append(
                "<tr  class='paistr' id='fav-pais"+ id +"'> " +
                "<td>" + i + "</td>"+ 
                "<td>" + data[id].translations.br + "</td>"+ 
                "<td><img id='fav-flag"+ i +"' src='"+data[id].flag+"'></td>"+ 
                "<td>" + data[id].population + "</td>"+ 
                "<td>" + data[id].numericCode + "</td>"+ 
                "<td><button class='liked' id='fav-botao"+ id +"'></button></td>"+""+ 
                "</tr>"); 
                i++;
                fav_qnt_pessoas += data[id].population;
        })

         //* adicionas as informações de quantidade de paises e numero de pessoas
        $("#fav-info").html(           
            '<p>Quantidade de paises: <span style="color: red">' + favs.length + '</span></p>' +
            '<p>Quantidade populacional total: <span style="color: red">' + fav_qnt_pessoas.toLocaleString(undefined) +'</span></p>');
    }
}