
(() => {
    'use strict'

    let deck = [];
    const tiposCartas = ['C', 'D', 'H', 'S'];
    const cartasEspeciales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0, puntosComputadora = 0;

    //Referencias del HTML
    const btn_pedir_carta = document.querySelector('#btn_pedir_carta');
    const btn_detener = document.querySelector('#btn_detener');
    const btn_nueva_carta = document.querySelector('#btn_nueva_carta');
    const jugador_cartas_div = document.querySelector('#jugador-cartas');
    const pc_cartas_div = document.querySelector('#computadora-cartas');
    const smalls_puntajes = document.querySelectorAll('small');

    //Esta funcion anonima deck crea una nueva baraja revuelta
    const crearDeck = () => {
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
        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();

    // Esta función me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        const cartaSeleccionada = deck.pop();
        return cartaSeleccionada;
    }


    // pedir carta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (!isNaN(valor)) ? (valor * 1) : (valor === 'A') ? 11 : 10;

    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            smalls_puntajes[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            pc_cartas_div.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }
        } while ((puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21));

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


    btn_pedir_carta.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        smalls_puntajes[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        jugador_cartas_div.append(imgCarta);

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
        turnoComputadora(puntosJugador);
    });

    btn_nueva_carta.addEventListener('click', () => {
        console.clear();
        deck = [];
        crearDeck();
        puntosJugador = 0, puntosComputadora = 0;
        smalls_puntajes[0].innerText = 0;
        smalls_puntajes[1].innerText = 0;
        jugador_cartas_div.innerHTML = '';
        pc_cartas_div.innerHTML = '';
        btn_pedir_carta.disabled = false;
        btn_detener.disabled = false;
    });

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

