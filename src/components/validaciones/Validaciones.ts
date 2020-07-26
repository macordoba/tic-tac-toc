/* eslint-disable */
const _ = require("lodash");

class Validaciones {
  private posiciones!: String[][];
  private sizeX: number;
  private sizeY: number;

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  public validarGanador(posiciones: String[][]) {
    this.posiciones = posiciones;
    return (
      this.validarColumnas() || this.validarFilas() || this.validarDiagonal()
    );
  }

  private validarFilas() {
    let respuesta: boolean = false;
    for (const fila of this.posiciones) {
      respuesta = respuesta || this.validarArreglo(fila);
    }
    return respuesta;
  }

  private validarColumnas() {
    let respuesta: boolean = false;
    let cambioFilasColumnas: String[][] = _.zip.apply(_, this.posiciones);
    for (const fila of cambioFilasColumnas) {
      respuesta = respuesta || this.validarArreglo(fila);
    }
    return respuesta;
  }

  private validarDiagonal() {
    let diagonal1: String[] = [];
    let diagonal2: String[] = [];
    let indice = this.sizeY;

    for (let i = 0; i < this.sizeY; i++) {
      diagonal2.push(this.posiciones[--indice][i]);
      for (let j = 0; j < this.sizeX; j++) {
        if (i === j) {
          diagonal1.push(this.posiciones[j][i]);
        }
      }
    }

    return this.validarArreglo(diagonal1) || this.validarArreglo(diagonal2);
  }

  private validarArreglo(arreglo: String[]) {
    let arregloLimpio = _.without(arreglo, "");

    return arregloLimpio.length === 3
      ? _.uniq(arregloLimpio).length === 1
      : false;
  }
}

module.exports = Validaciones;
