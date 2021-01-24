
const miModulo = (() => {
    'use strict'

    let deck = [];
    const tiposCartas = ['C', 'D', 'H', 'S'],
        cartasEspeciales = ['A', 'J', 'Q', 'K'];
    // let puntosJugador = 0,
    //         puntosComputadora = 0;

    let puntosJugadores = [];

    //Referencias del HTML
    const btn_pedir_carta = document.querySelector('#btn_pedir_carta'),
        btn_detener = document.querySelector('#btn_detener'),
        btn_nuevo_juego = document.querySelector('#btn_nuevo_juego'),
        divCartasJugadores = document.querySelectorAll('.divCartas'),
        smalls_puntajes = document.querySelectorAll('small');

    // Esta función inicializa el juego.
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        smalls_puntajes.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach( elem => elem.innerText = '');
        // smalls_puntajes[0].innerText = 0;
        // smalls_puntajes[1].innerText = 0;
        // jugador_cartas_div.innerHTML = '';
        // pc_cartas_div.innerHTML = '';
        btn_pedir_carta.disabled = false;
        btn_detener.disabled = false;
    };

    //Esta funcion anonima deck crea una nueva baraja revuelta
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tiposCartas) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tiposCartas) {
            for (let cartaEspecial of cartasEspeciales) {
                deck.push(cartaEspecial + tipo);
            }
        }
        return _.shuffle(deck);
    }

    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }
    // Esta funcion sirve para obtener el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (!isNaN(valor)) ? (valor * 1) : (valor === 'A') ? 11 : 10;
    }

    //Turno 0 = primer jugador, el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        smalls_puntajes[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana')
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana');
            }
        }, 400);
    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }


    btn_pedir_carta.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btn_pedir_carta.disabled = true;
            btn_detener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btn_pedir_carta.disabled = true;
            btn_detener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btn_detener.addEventListener('click', () => {
        btn_pedir_carta.disabled = true;
        btn_detener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btn_nuevo_juego.addEventListener('click', () => {
        inicializarJuego();

    });

    //lo que se retorne unicamente va a ser visible en este modulo
    return {
        nuevoJuego: inicializarJuego
    };

})();



/*
Patron modulo

Ejemplo 1 - funcion anonima auto-invocada
(() => {

})();

Ejemplo 2 - funcion tradicional auto-invocada
(function(){

})()

'use strict': tiene varios cambios en la semántica normal de JavaScript:

Elimina algunos errores silenciosos de JavaScript cambiándolos para que lancen errores.
Corrige errores que hacen difícil para los motores de JavaScript realizar optimizaciones: a veces, el código en modo estricto puede correr más rápido que un código idéntico pero no estricto.
Prohíbe cierta sintaxis que probablemente sea definida en futuras versiones de ECMAScript.
*/

