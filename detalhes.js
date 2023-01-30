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
//----- Realiza Busca Get -------------//


//----- Carrega Detalhes Game ----------//
function carregaDetalhes(id){
    let strGET = "games/" + id + "?key=" + keyAPI
    GET_RAWG(strGET, exibeDetalhes, console.log)
}

function exibeDetalhes(game){
    console.log(game)
    let name = document.getElementById("nameGame")
    let des = document.getElementById("textDesc");
    let divSobre = document.getElementById("sobre")
    let divImg = document.getElementById("imgCard")

    document.body.style.backgroundImage = `url(${game.background_image})`
    name.innerHTML = game.name
    des.innerHTML += `<p>${game.description_raw}</p>`
    divImg.innerHTML = `<img src="${game.background_image_additional}"></img>`
    divSobre.innerHTML += `<p><strong>Avaliação: </strong><br>${game.rating} / 5.00<br>
                              <strong>Desenvolvedores: </strong><br>${devs(game.developers)}<br>
                              <strong>Lojas: </strong><br>${store(game.stores)}<br>
                              <strong>Plataformas: </strong><br>${plataform(game.platforms)}<br>
                              <strong>Generos: </strong><br>${genre(game.genres)}</p>`
}

function devs(vet){
    let i = 0
    let str = ""
    vet.forEach(element => {
        if(i < 1){str += element.name }else {str += " | " + element.name};
        i++
    });

    return str;
}

function store(vet){
    let i = 0
    let str = ""
    vet.forEach(element => {
        if(i < 1){str += element.store.name }else {str += " | " + element.store.name};
        i++
    });

    return str;
}

function plataform(vet){
    let i = 0
    let str = ""
    vet.forEach(element => {
        if(i < 1){str += element.platform.name }else {str += " | " + element.platform.name};
        i++
    });

    return str;
}

function genre(vet){
    let i = 0
    let str = ""
    vet.forEach(element => {
        console.log(element)
        if(i < 1){str += element.name }else {str += " | " + element.name};
        i++
    });

    return str;
}
//----- Carrega Detalhes Game ----------//

onload = () => {
    const params = new URLSearchParams(window.location.search)
    carregaDetalhes(params.get("id"));
}
