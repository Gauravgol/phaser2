import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const GameScene = {
  preload() {
     
    this.load.image("ball", "./public/ball2.png");
  this.load.image("wall1", "./public/wall1.png");
  this.load.image("wall2", "./public/wall2.png");
  this.load.image("wall3", "./public/wall3.png");
  this.load.image("wall4", "./public/wall4.png");
  },
  create() {
    this.ball = this.physics.add.image(0,0, "ball");
    // invisible wall on bottom
    this.wall1 = this.physics.add.image(400,400,"wall1");
    this.wall1.displayWidth=400;
    this.wall1.displayHeight=50;
    this.wall1.setImmovable(true);
    this.physics.add.collider(this.ball,this.wall1);
    this.wall1.setAlpha(0);
    //
    // invisible wall on top
    this.wall2 = this.physics.add.image(400,400,"wall2");
    this.wall2.displayWidth=400
    this.wall2.displayHeight=50;
    this.wall2.setImmovable(true);
    this.physics.add.collider(this.ball,this.wall2);
     this.wall2.setAlpha(0);
    //
    // // invisible wall on left
    this.wall3 = this.physics.add.image(400,400,"wall3");
    this.wall3.displayWidth=50
    this.wall3.displayHeight=400;
    this.wall3.setImmovable(true);
    this.physics.add.collider(this.ball,this.wall3);
    this.wall3.setAlpha(0);
    // //
    // // invisible wall on right
    this.wall4 = this.physics.add.image(400,400,"wall4");
    this.wall4.displayWidth=50
    this.wall4.displayHeight=400;
    this.wall4.setImmovable(true);
    this.physics.add.collider(this.ball,this.wall4);
     this.wall4.setAlpha(0);
    //
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(0,0);
    this.ball.setScale(0.5);
  },
  update() {

  }
};
const App = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 400,
      height: 400,
      backgroundColor: '#997d96',
      scale: {
        mode: Phaser.Scale,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
      scene: GameScene,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      }
    };
    gameRef.current = new Phaser.Game(config);
    return () => {
    gameRef.current.destroy(true);
    };
  }, []);

  const handleClick = (xPosition, yposition) => {
 
    const scene = gameRef.current.scene.scenes[0];
    const distanceX = xPosition - scene.ball.x;
     const distanceY = yposition - scene.ball.y;

    const angle = Math.atan2(distanceY, distanceX);

    const speed = 400; 
    const xVelocity = Math.cos(angle) * speed;
    const yVelocity = Math.sin(angle) * speed;  
    scene.ball.setVelocity(xVelocity, yVelocity);
  };

  return (
    <div >
      <button onClick={()=>handleClick(100,0)} className='button1'>Button 1</button>
      <button onClick={()=>handleClick(300,0)} className='button2'>Button 2</button>
      <button onClick={()=>handleClick(400,100)} className='button3'>Button 3</button>
      <button onClick={()=>handleClick(400,300)} className='button4'>Button 4</button>
      <button onClick={()=>handleClick(300,400)} className='button5'>Button 5</button>
      <button onClick={()=>handleClick(100,400)} className='button6'>Button 6</button>
      <button onClick={()=>handleClick(0,100)}className='button7'>Button 7</button>
      <button onClick={()=>handleClick(0,300)}className='button8'>Button 8</button>
    </div>
  );
};

export default App;
