import Button from "../js/button.js";
var score;
export class retry extends Phaser.Scene {
  constructor() {
    super("retry");
  }
  init(data) {
    score = data.score;
  }
  create() {
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "fondo_menu")
      .setScale(1.1);

    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY / 1.5,
        "derrota"
      )
      .setScale(1.1);

    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        `Puntaje alcanzado: ${score}`
      )
      .setOrigin(0.5);

    const boton = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "Reintentar",
      this,
      () => {
        this.scene.start("MainMenu");
      }
    );
  }
}
