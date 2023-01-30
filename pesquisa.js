var keyAPI = "20f8b774235c472387c6dd55db774c98";
var KeyPexels = "563492ad6f91700001000001ea530333986a4ff5846f9eabd9790e61"

//----- Realiza Calculo de Data -------------//
function obterDataAPartirAtual(mesesPrazo) {
    let data = new Date
    let dia = data.getDate()
    let mes = ((data.getMonth() + 1) + mesesPrazo)
    let ano = data.getFullYear()

    if (mes < 1) {
        ano = ano - 1;
        mes = 12;
    } else if (mes > 12) {
        ano = ano + 1;
        mes = 0 + 1;
    }

    let strDataAtual

    if(mes > 9){
        strDataAtual = ano + "-" + mes + "-" + dia;
    }else{
        strDataAtual = ano + "-0" + mes + "-" + dia;
    }

    return strDataAtual;
}
//----- Realiza Calculo de Data -------------//


//----- Realiza Busca Get -------------//
function GET_RAWG(strGET, funcaoAExecultar, funcaoDeFalha) {
    $.ajax({
        type: "GET",
        url: "https://api.rawg.io/api/" + strGET,
        dataType: "json"
    }).done((resp) => {
        funcaoAExecultar(resp);
    }).fail(() => {
        funcaoDeFalha("HELLO");
    })
}
//----- Realiza Busca Get -------------//


//----- Realiza Pesquisa Get -------------//
function realizarPesquisa(str, filtro){
    strGET = "games?key=" + keyAPI + "&search=" + str
    GET_RAWG(strGET, sharedDev, console.log)
    
}
//----- Realiza Pesquisa Get -------------//


//------ Funcoes Retorno -------------//
function sharedDev(vet){
    console.log(vet)
    if(vet != {}){
        let div = document.getElementById("Cards")
        div.innerHTML = " "
        vet.results.forEach(element => {
        div.innerHTML += `<div class="cards_lancamento col-sm-12 col-md-4 col-lg-4">
                            <h6 class="card-title">${element.name}</h6>
                            <img src="${element.background_image}"></img>
                            <p><strong>Lançamento:</strong> ${element.released}<br>
                            <strong>Avaliação Critica: </strong> ${(element.metacritic == null)?" N.A ":element.metacritic}<br>
                            <strong>Avaliação Geral: </strong> ${element.rating}/5.00<br>
                            <strong>Plataformas: </strong> ${carregarPlataformas(element)}
                            </p>
                            <a href="detalhes.html?id=${element.id}" target="_self"
                                class="btn btn-outline-success"> + Detalhes</a>
                        </div>`
    });
    }
}

function carregarPlataformas(vet){
    let i = 0
    let str = ""
    vet.platforms.forEach(element =>{
        if(i == 0){
            str += element.platform.name
        }else{
            str += " | " + element.platform.name
        }
        i++
    })

    return str;
}

//------ Funcoes Retorno -------------//

window.onload = () =>{
    let nome = document.getElementById("nomePes")
    const params = new URLSearchParams(window.location.search)
    realizarPesquisa(params.get("q"));

    nome.innerHTML = params.get("q")

    psquisa.onclick = () =>{
        let strSH = document.getElementById("strShared").value
        window.open("pesquisa.html?q=" + strSH)
    }
}
