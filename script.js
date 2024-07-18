// ---- Escolhendo os tipos de descanso ----
const html = document.querySelector('html');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imgBanner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const subtitulo = document.querySelector('.app__title.app__title-strong');
const botoes = document.querySelectorAll('.app__card-button');

let tempoDecorridoEmSegundos = 1500;

// Trocando o fundo e as imagens
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
}) 

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
}) 

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
}) 

function alterarContexto(contexto) {
    mostrarTempo();

    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    imgBanner.setAttribute('src', `./imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br /> 
                <strong class="app__title-strong">mergulhe no que importa.</strong> `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br />
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
                break;
                case "descanso-longo":
                    titulo.innerHTML = `
                    ora de voltar à superfície.<br />
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                    break;
                    default:
            break; //se não tiver nenhum dos cases ele vai dar break e não retornará nada
        }
    }

// ---- Adicionando música enquanto timer desce ----
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// ---- Timer ----
// Sons 
const somEnd = new Audio('./sons/beep.mp3');
const somStart = new Audio('./sons/play.wav');
const somPausa = new Audio('./sons/pause.mp3');

const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarIcon = document.querySelector('#start-pause img');

let intervaloId = null;
const tempoNaTela = document.querySelector('#timer');

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        somStart.play();
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        // somPausa.play();
        zerar();
        return
    }
    // somStart.play();
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarIcon.setAttribute('src', './imagens/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarIcon.setAttribute('src', './imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000); //1000 é porque só trabalhamos com milisegundos
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo(); //está sendo chamada no escopo global, então vai estar aparecendo na página o tempo inteiro