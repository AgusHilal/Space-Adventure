import { Preloads } from "../scenes/preloads.js";
import { MainMenu } from "../scenes/mainmenu.js";
import { nivel_1} from "../scenes/nivel_1.js";
import { nivel_2} from "../scenes/nivel_2.js";
import { nivel_3} from "../scenes/nivel_3.js";
import { retry } from "../scenes/retry.js";
import { win } from "../scenes/Win.js";


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  // Listado de todas las escenas del juego, en orden
  // La primera escena es con la cual empieza el juego
  scene: [Preloads, MainMenu, nivel_1, nivel_2, nivel_3, retry, win],
};

var game = new Phaser.Game(config);
