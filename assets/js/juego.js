/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tiposCartas = ['C', 'D', 'H', 'S'];
const cartasEspeciales = ['A', 'J', 'Q', 'K']

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
    // console.log(deck);
    //con la funcion _.shuffle crea un nuevo array almacenando los mismos valores en posiciones aleatoreas
    deck = _.shuffle(deck);
    console.log(deck)
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

console.log(valorCarta(pedirCarta()));