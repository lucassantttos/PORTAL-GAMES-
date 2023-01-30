var keyAPI = "20f8b774235c472387c6dd55db774c98";



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

function GET_PEXELS(strGET, funcaoAExecultar, funcaoDeFalha) { //<<<<<<<<<<<<<<<
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", KeyPexels);
        },
        type: "GET",
        url: "https://api.pexels.com/v1/search?query=" + strGET,
        dataType: "json"
    }).done((resp) => {
        console.log(resp)
        funcaoAExecultar(resp);
    }).fail(() => {
        funcaoDeFalha("HELLO");
    })
}

//----- Realiza Busca Get -------------//


//----- Obter Filtros -------------//
function obterFiltros() {
    let strBusca = "genres?key=" + keyAPI
    GET_RAWG(strBusca, adicionarOptionTagGenero, window.alert)
}

function adicionarOptionTagGenero(vetResposta) {
    let select = document.getElementById("tagGenero")
    if (vetResposta != undefined) {
        vetResposta.results.forEach(element => {
            select.innerHTML += `<option value="${element.slug}">${element.name}</option>`
        });
    }
}
//----- Obter Filtros -------------//


//----- Obter Jogos Baseados no Filtro -------------//
function obterJogos() {
    let genero = tagGenero.options[tagGenero.selectedIndex].value;
    let filtro = tagFiltro.options[tagFiltro.selectedIndex].value;
    let str2

    if(genero == " "){
        str2 = "games?key=" + keyAPI + "&dates=" + obterDataAPartirAtual(-5) + "," + obterDataAPartirAtual(0)
    }else if (filtro == "Avaliado") {
        str2 = "games?key=" + keyAPI + "&genres=" + genero + "&dates=" + obterDataAPartirAtual(-12) + "," + obterDataAPartirAtual(0) + "&ordering=-metacritic"
    } else if (filtro == "Lancamento") {
        str2 = "games?key=" + keyAPI + "&genres=" + genero + "&dates=" + obterDataAPartirAtual(-5) + "," + obterDataAPartirAtual(2)
    } else {
        str2 = "games?key=" + keyAPI + "&genres=" + genero + "&dates=" + obterDataAPartirAtual(-12) + "," + obterDataAPartirAtual(0) + "&ordering=-rating"
    }

    GET_RAWG(str2, preencherCards, window.alert)
}

function preencherCards(vet) {
    let contCol = 0
    let div = document.getElementById("Cards")
    div.innerHTML = " "
    vet.results.forEach(element => {
        console.log(element.id)
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

//----- Obter Jogos Baseados no Filtro -------------//


//----- Carregar dados de Plataformas -------------//
function carregaPlataformas(){
    let plat = [1, 2, 4, 7]

}
function   obterPlataformas(){
    let div = document.getElementById("plataform");
    let strPlataformas = "platforms?key=" + keyAPI
    GET_RAWG(strPlataformas, (str)=>{
      str.results.forEach(plat =>{
        console.log(plat)
          // GET_PEXELS(plat.name, (result) =>{
                div.innerHTML += `<article class="platf col-sm-12 col-md-4 col-lg-4">
                                        <h2>${plat.name}</h2>
                                        <img src="${result.photos[0].src.medium}"> <<<<<<<<Alterar aqui
                                        <a href="https://www.xbox.com/pt-BR/xbox-game-pass/pc-game-pass" target="_blank"
                                            class="btn btn-outline-success">JOGOS</a>
                                    </article>`
           // }, console.log)
        })
    }, window.alert)
}
//----- Carregar dados de Plataformas -------------//


//----- Carregar dados de Publi -------------//
function obterPubli(){
    let div = document.getElementById("publi");
    let strPubli = "publishers?key=" + keyAPI
    GET_RAWG(strPubli, (publi)=>{
        console.log(publi)
        publi.results.forEach(p =>{
            div.innerHTML += `<article class="card_publi col-sm-12 col-md-12 col-lg-4">
                                <h2>${p.name}</h2>
                                <img src="${p.image_background}" alt="">
                                <ul>
                                    <li>${p.games[0].name}</li>
                                    <li>${p.games[1].name}</li>
                                    <li>${p.games[2].name}</li>
                                    <li>${p.games[3].name}</li>
                                    <li>${p.games[4].name}</li>
                                    <li>${p.games[5].name}</li>
                                </ul>
                            </article>`
        })
    }, console.log)
}
//----- Carregar dados de Publi -------------//


onload = () => {
    obterFiltros();
    obterJogos();
    obterPlataformas();
    obterPubli();

    tagGenero.onchange = () => {
        genero = tagGenero.options[tagGenero.selectedIndex].value;
        filtro = tagFiltro.options[tagFiltro.selectedIndex].value;
        obterJogos()
    }

    tagFiltro.onchange = () => {
        genero = tagGenero.options[tagGenero.selectedIndex].value;
        filtro = tagFiltro.options[tagFiltro.selectedIndex].value;
        obterJogos()
    }

    psquisa.onclick = () =>{
        let strSH = document.getElementById("strShared").value
        window.open("pesquisa.html?q=" + strSH)
    }

}
