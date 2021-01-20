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
    let cartaSeleccionada = deck.pop();
    return cartaSeleccionada;
}

pedirCarta();