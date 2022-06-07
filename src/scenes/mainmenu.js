//Importar el botón
import Button from "../js/button.js";

// Clase MainMenu, donde se crean los botones, el logo y el fondo del menú principal
export class MainMenu extends Phaser.Scene {
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("MainMenu");
  }

  create() {
    // Fondo del menú principal
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "fondo_menu")
      .setScale(1.1);

    // Logo de Phaser
    this.add
      .image(
        this.cameras.main.centerX,
        this.cameras.main.centerY / 1.5,
        "logo_de_juego"
      )
      .setScale(1.1);

    // botón
    const boton = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "Jugar",
      this,
      () => {
        this.scene.start("nivel_1");
      }
    );
  }
}
