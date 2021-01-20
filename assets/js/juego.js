/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tiposCartas = ['C', 'D', 'H', 'S'];
const cartasEspeciales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0, puntosComputadora = 0;


//Referencias del HTML
const btn_pedir_carta = document.querySelector('#btn_pedir_carta');
const jugador_cartas_div = document.querySelector('#jugador-cartas');
const pc_cartas_div = document.querySelector('#computadora-cartas');
const smalls_puntajes = document.querySelectorAll('small');

//Esta funcion anonima deck crea una nueva baraja revuelta
const crearDeck = () =>{
    //Añade las cartas del 2 al 10 con su tipo de carta
    for(let i = 2; i <= 10; i++){
        for(let tipo of tiposCartas){
            deck.push(i + tipo);
        }
    }
    //añade las cartas especiales con su tipo de carta
    for(let tipo of tiposCartas){
        for(let cartaEspecial of cartasEspeciales){
            deck.push(cartaEspecial + tipo);
        }
    }
    //con la funcion _.shuffle crea un nuevo array almacenando los mismos valores en posiciones aleatoreas
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
    const cartaSeleccionada = deck.pop();
    return cartaSeleccionada;
}

pedirCarta();

// pedir carta
const valorCarta = ( carta ) => {

    //los string se pueden trabajar como arreglos
    //con substring regresa un string cortado en base a la posicion inicial y una posicion final
    const valor = carta.substring(0, carta.length-1);
    // //isNaN evalua si el valor es un numero o no, devuelve verdadero si no es un numero, falso si lo es
    return (!isNaN(valor)) ? (valor*1): ( valor === 'A') ? 11 : 10;

}

//Eventos
//para escuchar un evento usamos la siguiente sintaxis
//addEventListener() tiene dos argumentos, el primero es el evento que queremos estar escuchando
//el segundo parametro es un evento especial, dicha funcion que se le coloca como argumeto a otra
//funcion es conocida como un callback, es decir es una funcion que se está mandando como argumento
//puede ser tanto una funcion tradicional como una de flecha
//en resument, cuando se haga click en este boton se va a disparar la accion de la funcion del parametro
//de la funcion del evento
btn_pedir_carta.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    smalls_puntajes[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    jugador_cartas_div.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Lo siento mucho, perdiste');
        btn_pedir_carta.disabled = true;
    } else if(puntosJugador === 21){
        console.warn('21, genial!');
        btn_pedir_carta.disabled = true;
    }
});

{/* <img class="carta" src="assets/cartas/4H.png" alt="carta-maquina"/> */}