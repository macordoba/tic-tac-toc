<template>
  <div id="app">
    <div class="ui center aligned container">
      <h1>
        TIC TAC TOC
      </h1>
    </div>
    <div class="ui two column doubling stackable grid container">
      <div class="column">
        <div class="campo">
          <div v-for="(n, i) in 3" :key="i" class="linea">
            <Cuadrado
              v-for="(cuadrado, indice) in cuadrados[i]"
              :key="indice"
              :x="cuadrado.x"
              :y="cuadrado.y"
            />
          </div>
        </div>
        <div class="ui center aligned container">
          <h2>Turno: {{ jugador }}</h2>
          <h3 v-bind:class="{ message: mensajeError }" class="ui error">
            {{ mensajeError }}
          </h3>
        </div>
      </div>
      <div class="column">
        <div class="ui center aligned container">
          <div class="ui blue" v-bind:class="{ message: mensajeResultado }">
            <h1>{{ mensajeResultado }}</h1>
          </div>
          <button class="huge ui button orange" @click="nuevoJuego">
            Nuevo Juego
          </button>
        </div>
      </div>
    </div>
    <div class="ui center aligned container">
      <h4>
        Alvaro Manuel Córdoba Torres - 07/2020
      </h4>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Cuadrado from "./components/Cuadrado.vue";

@Component({
  components: {
    Cuadrado,
  },
})
export default class App extends Vue {
  cuadrados: Array<Array<{ x: number; y: number }>>;

  constructor() {
    super();

    this.cuadrados = [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
    ];
  }

  get jugador() {
    return "Jugador " + this.$store.getters.getIdJugador;
  }

  get mensajeResultado() {
    return this.$store.getters.getMensajeResultado;
  }

  get mensajeError() {
    return this.$store.getters.getMensajeError;
  }

  nuevoJuego() {
    this.$store.dispatch("nuevoJuego");
  }
}
</script>

<style lang="scss">
#app {
  padding: 30px 0;
}

h1,
h2,
h3,
h4 {
  padding: 30px 0;
}

.campo {
  padding-left: 10%;
}

.linea {
  display: flex;
  font-size: 70pt;
}
</style>
