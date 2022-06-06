// Clase Preloads, para separar los preloads y tener mejor orden
// Se extiende de Phaser.Scene para que adquiera todas las caracteristicas de una escena
// -> mostrar, recargar, tener los eventos preload, create y update.

export class Preloads extends Phaser.Scene {
  constructor() {
    // Se asigna una key para despues poder llamar a la escena
    super("Preloads");
  }

  preload() {
    this.load.image("logo_de_juego", "public/assets/images/phaser_logo.png");
    this.load.image(
      "fondo_menu",
      "public/assets/images/main_menu_background.png"
    );

    // El personaje es un spritesheet, de la cual luego se crea una animacion.
    // No se importa como imagen
    //this.load.image("dude","public/assets/images/dude.png")
    this.load.spritesheet("dude", "public/assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image("bomb", "public/assets/images/bomb.png");
    this.load.image("moon", "public/assets/images/Moon.png");
    this.load.image("star", "public/assets/images/star.png");
    this.load.image("derrota", "public/assets/images/derrota.png");
    this.load.image("win", "public/assets/images/win.png");
  }
  
  create() {
    //animaciones del personaje
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    // Pasa directamente a la escena del menú principal
    this.scene.start("MainMenu");
  }
}
