let cards = document.querySelectorAll(".card-container");
let cor = document.getElementById("combo");

let marcacao = 0;
let cardN1;
let cardN2;
let lock = false;
let combo = 1;
let placar = document.getElementById("num-placars");
let finish = 0;
let partidas = 0;

cards.forEach((card) => {
    card.addEventListener("click", virar);

})

function virar() {

    if (lock || cardN1 === this || cardN2 === this){return;}

    if(marcacao == 0) {
        this.classList.add("ViraCarta");
        marcacao = 1;
        cardN1 = this;
        return; 

    } else

    if(marcacao == 1) {
        lock = true;
        this.classList.add("ViraCarta");
        cardN2 = this;
        setTimeout(checa, 1000);
        return;
    }
    
}

function checa() {
    

    if (cardN1.dataset.card !== cardN2.dataset.card) {
        cardN1.classList.remove("ViraCarta");
        cardN2.classList.remove("ViraCarta");
        cardN1.addEventListener("click", virar);
        cardN1.addEventListener("click", virar);
        marcacao = 0;
        cardN1 = null;
        cardN2 = null;
        placar.innerHTML =  Number(placar.innerHTML) - 20;
        combo =  1;
        document.getElementById("combo").style = "color: white";
        document.getElementById("combo").innerHTML = "x" + combo;
        //embaralhar();
        lock = false;
        return;

    } else  if (cardN1.dataset.card === cardN2.dataset.card) {
        
        marcacao = 0;
        cardN1 = null;
        cardN2 = null;
        setTimeout(tiralock, 3000);
        combo += 1;
        document.getElementById("combo").innerHTML = "x" + combo;
        placar.innerHTML =  Number(placar.innerHTML) + 100 * combo;
        finish += 1;
        trocarCor();
        if (finish == 9){setTimeout(acabou, 3000)}
        return;
        
    }
}

function tiralock() {
    lock = false;
}

function embaralhar() {
    cards.forEach((card) => {
        let posicao = Math.floor(Math.random()*19);
        card.style.order = posicao;
    })
}

function acabou() {
    document.getElementById("combo").style = "color: white";
    partidas += 1;
    document.getElementById("contador-partidas").innerHTML = partidas;
    document.getElementById("combo").innerHTML = "x1";
    combo = 1;
    placar.innerHTML =  0;
    marcacao = 0;
    cardN1 = null;
    cardN2 = null;
    setTimeout(embaralhar, 1000);

    cards.forEach((card) => {
        card.classList.remove("ViraCarta");});

}

function trocarCor() {
    if (combo <= 2) {document.getElementById("combo").style = "color: rgb(33, 125, 247)"; return;}
    else if (combo <= 3) {document.getElementById("combo").style = "color: rgb(0, 255, 34)" ; return;}
    else if (combo <= 4) {document.getElementById("combo").style = "color: yellow"; return;}
    else if (combo <= 5) {document.getElementById("combo").style = "color: rgb(226, 75, 75)"; return;}
}
       
embaralhar();