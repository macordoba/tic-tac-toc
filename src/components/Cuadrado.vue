<template>
  <div v-bind:class="estilo" class="cuadrado" @click="jugada">
    {{ ficha }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Cuadrado extends Vue {
  @Prop() x!: number;
  @Prop() y!: number;
  estilo: string;

  constructor() {
    super();
    this.estilo = this.validarCss(this.x, this.y);
  }

  get ficha() {
    return this.$store.getters.getFicha(this.x, this.y);
  }

  private validarCss(numberX: number, numberY: number) {
    let classCss = "";

    if (numberX === 0 && numberY === 0) {
      classCss = "superioIzq";
    } else if (numberX === 1 && numberY === 0) {
      classCss = "superioMedio";
    } else if (numberX === 2 && numberY === 0) {
      classCss = "superioDere";
    } else if (numberX === 0 && numberY === 1) {
      classCss = "centroIzq";
    } else if (numberX === 1 && numberY === 1) {
      classCss = "centroMedio";
    } else if (numberX === 2 && numberY === 1) {
      classCss = "centroDere";
    } else if (numberX === 0 && numberY === 2) {
      classCss = "InferiorIzq";
    } else if (numberX === 1 && numberY === 2) {
      classCss = "InferiorMedio";
    } else if (numberX === 2 && numberY === 2) {
      classCss = "InferiorDere";
    }

    return classCss;
  }

  jugada() {
    // Cuando un juagador gana no se puede seguir jugando
    if (!this.$store.getters.getMensajeResultado) {
      this.$store.dispatch("aplicarJugada", {
        x: this.x,
        y: this.y,
      });
    }
  }
}
</script>

<style scoped lang="scss">
$medida: 150px;

.superioIzq {
  border-right: 2px solid;
  border-bottom: 2px solid;
}

.superioMedio {
  border-right: 2px solid;
  border-left: 2px solid;
  border-bottom: 2px solid;
}

.superioDere {
  border-left: 2px solid;
  border-bottom: 2px solid;
}

.centroIzq {
  border-right: 2px solid;
  border-top: 2px solid;
  border-bottom: 2px solid;
}

.centroMedio {
  border: 2px solid;
}

.centroDere {
  border-left: 2px solid;
  border-top: 2px solid;
  border-bottom: 2px solid;
}

.InferiorIzq {
  border-right: 2px solid;
  border-top: 2px solid;
}

.InferiorMedio {
  border-top: 2px solid;
  border-left: 2px solid;
  border-right: 2px solid;
}

.InferiorDere {
  border-left: 2px solid;
  border-top: 2px solid;
}

.cuadrado {
  width: $medida;
  height: $medida;
  border-color: black;
  text-align: center;
  line-height: $medida;
  font-family: "DM Mono", monospace;
}
</style>
