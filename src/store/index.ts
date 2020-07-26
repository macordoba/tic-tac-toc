/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
const Validaciones = require("../components/validaciones/Validaciones");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    validaciones: new Validaciones(3, 3),
    posiciones: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    numeroJugada: 1,
    mensajeGanador: "",
    mensajeError: "",
    idJugador: "X",
  },
  mutations: {
    aplicarJugada(state, datos) {
      if (state.posiciones[datos.x][datos.y] === "") {
        const nuevaPosicion = state.posiciones.slice();
        nuevaPosicion[datos.x][datos.y] = state.idJugador;
        state.posiciones = nuevaPosicion;

        let resultado = false;

        if (state.numeroJugada > 4) {
          resultado = state.validaciones.validarGanador(state.posiciones);

          if (resultado) {
            state.mensajeGanador = `Gano el juegador ${state.idJugador}`;
          } else if (state.numeroJugada === 9 && !resultado) {
            state.mensajeGanador = "Juego empatado";
          }
        }

        state.numeroJugada++;
        state.mensajeError = "";
        state.idJugador = state.idJugador === "X" ? "O" : "X";
      } else {
        state.mensajeError = "Espacio ocupado";
      }
    },
    nuevoJuego(state) {
      state.posiciones = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];

      state.numeroJugada = 1;
      state.mensajeGanador = "";
      state.mensajeError = "";
      state.idJugador = "X";
    },
  },
  actions: {
    aplicarJugada(context, datos) {
      context.commit("aplicarJugada", datos);
    },
    validarGanador(context) {
      context.commit("validarGanador");
    },
    nuevoJuego(context) {
      context.commit("nuevoJuego");
    },
  },
  getters: {
    getFicha: (state) => (x: number, y: number) => {
      return state.posiciones[x][y];
    },
    getIdJugador: (state) => {
      return state.idJugador;
    },
    getMensajeError: (state) => {
      return state.mensajeError;
    },
    getMensajeResultado: (state) => {
      return state.mensajeGanador;
    },
  },
});
