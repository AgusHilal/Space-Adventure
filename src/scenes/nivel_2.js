var player;
var stars;
var moons;
var bombs;
var cursors;
var score;
var gameOver;
var scoreText;
var scoreTime;
var scoreTimeText;
var timedEvent;

export class nivel_2 extends Phaser.Scene {
    constructor() {
      super("nivel_2");
    }

    init(data) {
      score = data.score;
      scoreTime = data.scoreTime;
    }

    preload() {
        this.load.tilemapTiledJSON("map2", "public/assets/tilemaps/nivel_2.json");
        this.load.image("fondo", "public/assets/images/Plataforma/Sky.png");
        this.load.image(
          "platform",
          "public/assets/images/Plataforma/atlas_plataformas.png"
        );
    }

    onSecond() {
      if (! gameOver)
      {
          scoreTime = scoreTime - 1;
          scoreTimeText.setText('Time: ' + scoreTime);
          if (scoreTime == 0) {
              timedEvent.paused = true;
              this.scene.start(
                "retry",
                { score: score }
              );
          }
      }
    }

    create() {

      timedEvent = this.time.addEvent({ 
        delay: 1000, 
        callback: this.onSecond, 
        callbackScope: this, 
        loop: true 
      });

        const map = this.make.tilemap({ key: "map2" });
        const tilesetBelow = map.addTilesetImage("Sky", "fondo");
        const tilesetPlatform = map.addTilesetImage(
          "atlas_plataformas",
          "platform"
        );

        const belowLayer = map.createLayer("fondo", tilesetBelow, 0, 0);
        const worldLayer = map.createLayer("plataforma", tilesetPlatform, 0, 0);
        const objectsLayer = map.getObjectLayer("objeto");

        worldLayer.setCollisionByProperty({ collides: true });

        const spawnPoint = map.findObject("objeto", (obj) => obj.name === "dude");

        player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

        player.setBounce(0.5);
        player.setCollideWorldBounds(true);

        if ((cursors = !undefined)) {
            cursors = this.input.keyboard.createCursorKeys();
        }

        stars = this.physics.add.group();
        objectsLayer.objects.forEach((objData) => {
          const { x = 0, y = 0, name, type } = objData;
          switch (type) {
            case "star": {
              var star = stars.create(x, y, "star");
              star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
              break;
            }
          }
        });

        moons = this.physics.add.group();
        objectsLayer.objects.forEach((objData) => {
          const { x = 0, y = 0, name, type } = objData;
          switch (type) {
            case "moon": {
              var star = moons.create(x, y, "moon");
              star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
              break;
            }
          }
        });

        bombs = this.physics.add.group();
        objectsLayer.objects.forEach((objData) => {
          const { x = 0, y = 0, name, type } = objData;
          switch (type) {
            case "bomb": {
              var bomb = bombs.create(x, 16, "bomb");
              bomb.setBounce(1);
              bomb.setCollideWorldBounds(true);
              bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
              bomb.allowGravity = false;
            }
          }
        });
    

        scoreText = this.add.text(30, 6, "Score: " + score, {
            fontSize: "32px",
            fill: "#FFFFFF",
        });

        scoreTimeText = this.add.text(630, 6, "Time: ", + scoreTime, {
          fontSize: "32px",
          fill: "#FFFFFF",
        });

        //F??sicas a partir de ac??

        this.physics.add.collider(player, worldLayer);

        this.physics.add.collider(stars, worldLayer);
        this.physics.add.collider(moons, worldLayer);

        this.physics.add.collider(bombs, worldLayer);

        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, moons, this.collectMoon, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        gameOver = false;
    }

    update() {
        if (score == 155) {
          this.scene.start("nivel_3", { score: score, scoreTime : scoreTime  });
        }
        if (gameOver) {

            return;
        }

        if (cursors.left.isDown) {
            player.setVelocityX(-160);
      
            player.anims.play("left", true);
          } else if (cursors.right.isDown) {
            player.setVelocityX(160);
      
            player.anims.play("right", true);
          } else {
            player.setVelocityX(0);
      
            player.anims.play("turn");
        }

        if (cursors.up.isDown && player.body.blocked.down) {
            player.setVelocityY(-330);
         }
        
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText("Score: " + score);
    }

    collectMoon(player, moon) {
        moon.disableBody(true, true);
        score += 15;
        scoreText.setText("Score: " + score);
    }

    hitBomb(player, bomb) {
        this.physics.pause();
    
        player.setTint(0xff0000);
    
        player.anims.play("turn");
    
        gameOver = true;
    
        setTimeout(() => {
          this.scene.start("retry", { score: score });
        }, 1000);
    }
    
}