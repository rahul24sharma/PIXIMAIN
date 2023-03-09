import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Timer } from "eventemitter3-timer";
import "@pixi/gif";
import { Assets } from "pixi.js";
import { gsap } from "gsap";
import "./Canvas.css";
import gifImage from "../gifImage.gif"

const Canvas = () => {
  const appRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: 850,
      height: 450,
      backgroundColor: 0x0e0e0e,
    });
    appRef.current = app;
    document.body.appendChild(app.view);
    let countdown = 15;
    let value = 1.0;
    let duration = 10000 / 100;

    const rect = new PIXI.Graphics();
    rect.beginFill(0x00ced1);
    rect.drawRoundedRect(0, 0, 250, 5, 1); // Add a radius of 10 to create a rounded rectangle
    rect.endFill();

    rect.position.set(
      app.screen.width / 2 - rect.width / 2,
      app.screen.height / 2 - rect.height / 2
    );
    rect.scale.x = 0;

    // Add the rectangle to the stage
    app.stage.addChild(rect);

    // Create the animation
    const dur = 5400; // 7 seconds
    const endScale = 1;
    const fps = 60;
    const frameTime = 1000 / fps;
    const frames = dur / frameTime;
    let currentFrame = 0;
    let currentScale = 0;

    // Define the animation function
    function animate() {
      currentFrame++;
      if (currentFrame <= frames) {
        currentScale = endScale - (endScale / frames) * currentFrame;
        rect.scale.x = currentScale;
        requestAnimationFrame(animate);
      }
    }

    // Start the animation
    animate();
    gsap.to(rect, { duration: 5.6, delay: 5.6, alpha: 0 });

    const loadingText = new PIXI.Text("Loading...", {
      fill: "white",
      fontSize: 20,
    });
    loadingText.anchor.set(0.5);
    loadingText.position.set(app.view.width / 2, app.view.height / 2 - 65);
    app.stage.addChild(loadingText);
    gsap.to(loadingText, { duration: 3.5, delay: 3.5, alpha: 0 });

    let progress = 0;

    function updateLoadingProgress() {
      progress += 0.01 / 3.2;

      const angle = progress * Math.PI * 2;

      loadingText.text = ` ${Math.floor(progress * 100)}%`;

      if (progress >= 1) {
        loadingText.text = "100%";
        return;
      }

      requestAnimationFrame(updateLoadingProgress);
    }

    updateLoadingProgress();

    const loaderContainer = new PIXI.Container();
    loaderContainer.position.set(app.screen.width / 2, app.screen.height / 2.8);
    app.stage.addChild(loaderContainer);

    // Create the loader graphics
    const loader = new PIXI.Graphics();
    loader.lineStyle(4, 0x00ced1);
    loader.drawRect(-30, -30, 60, 60);
    loaderContainer.addChild(loader);

    // Animate the loader
    app.ticker.add((delta) => {
      loader.rotation += 0.1 * delta;
    });
    gsap.to(loaderContainer, { duration: 3, delay: 3, alpha: 0 });

    const txt = new PIXI.Text("15", {
      fontFamily: "Arial",
      fontSize: 1,
      fill: 0x292620,
      align: "center",
    });
    txt.anchor.set(0.5);
    app.stage.addChild(txt);
    txt.position.set(app.screen.width / 2, app.screen.height / 2);

    const timer = new Timer(650);
    timer.repeat = countdown;
    timer.on("start", (elapsed) => {
      //console.log("start");
    });
    timer.on("end", (elapsed) => {
      //console.log("end", elapsed);
      txt.text = "";
    });
    timer.on("repeat", (elapsed, repeat) => {
      //console.log("repeat", repeat);
      countdown--;
      txt.text = countdown;
    });
    timer.on("stop", (elapsed) => {
      // console.log("stop");
    });

    timer.start();
    app.ticker.add(() => {
      timer.timerManager.update(app.ticker.elapsedMS);
    }, this);

    async function imageCall() {
      const image = await Assets.load(gifImage);
      app.stage.addChild(image);
      image.width = 90;
      image.height = 90;
      image.x = 25;
      image.y = 335;
      const curve = new PIXI.Graphics();
      curve.lineStyle(2, 0x0e0e0e);
      curve.moveTo(0, 0);
      curve.bezierCurveTo(10, 0, 11, 10, 13, 11);
      app.stage.addChild(curve);
      const area = new PIXI.Graphics();
      area.beginFill(0x0e0e0e);
      area.moveTo(25, 425);
      area.quadraticCurveTo(80, 425, image.x, image.y + 55);
      area.lineTo(image.x, 450);
      area.lineTo(25, 450);
      area.lineTo(25, 425);
      area.endFill();
      app.stage.addChild(area);

      let xVel = 1.6;
      let angle = 0;
      let amplitude = 140;
      let frequency = 0.0069;
      function update() {
        image.x += xVel;
        image.y = 190 + Math.cos(angle) * amplitude;
        angle += frequency;
        if (image.x >= 700) {
          image.x -= xVel;
          image.y = 190 + Math.cos(angle) * amplitude;
          uiy.y += 0.7;
          ui.x -= 0.7;
        }
        curve.clear();
        curve.lineStyle(5, 0x00ced1);
        curve.moveTo(25, 424);
        curve.bezierCurveTo(
          50,
          425,
          image.x,
          image.y + 85,
          image.x,
          image.y + 85
        );
        area.clear();
        area.beginFill(0x009092);
        area.moveTo(25, 425);
        area.quadraticCurveTo(50, 425, image.x, image.y + 85);
        area.lineTo(image.x, 425);
        area.lineTo(25, 425);
        area.lineTo(25, 425);
        area.endFill();

        if (value >= main) {
          image.x -= xVel;
          angle -= frequency;
          gsap.to(image, { alpha: 0, delay: 2 });
          gsap.to(curve, { alpha: 0, delay: 2 });
          gsap.to(area, { alpha: 0, delay: 2 });
          setTimeout(() => {
            // Code to execute after the delay
            const txt2 = new PIXI.Text("PLANE FLEW AWAY", {
              fontFamily: "Arial",
              fontSize: 30,
              fill: 0x00ced1,
              align: "center",
            });
            txt2.anchor.set(0.5);
            app.stage.addChild(txt2);
            txt2.position.set(app.screen.width / 2, app.screen.height / 2);
            //window.location.reload()
          }, 3000);
        }
      }

      window.setTimeout(function () {
        setInterval(() => {
          if (value >= main) {
            return clearInterval();
          }
          num.text = value.toFixed(2) + "x";
          value = value + 0.01;
          //console.log('Interval triggered');
        }, duration);

        app.ticker.add((delta) => {
          update();
        });
      }, 6000);
    }
    imageCall();
    const num = new PIXI.Text("1.00x", {
      fontFamily: "Arial",
      fontSize: 70,
      fill: 0x00ced1,
    });
    num.position.set(60, 30);
    app.stage.addChild(num);
    gsap.to(num, {
      duration: 0,
      alpha: 0,
    });
    gsap.to(num, { duration: 3, alpha: 1, delay: 6 });

    let main = point + 0.001;
    //console.log(main)
    let rel = main + 1.0;

    const xline = new PIXI.Graphics();
    app.stage.addChild(xline);
    xline.lineStyle(1, 0xffffff).moveTo(850, 425).lineTo(24, 425);
    gsap.to(xline, {
      duration: 0,
      alpha: 0,
    });
    gsap.to(xline, { duration: 10, alpha: 1, delay: 6 });

    const yline = new PIXI.Graphics();
    app.stage.addChild(yline);
    yline.lineStyle(1, 0xffffff).moveTo(25, 425).lineTo(25, 0);
    gsap.to(yline, {
      duration: 0,
      alpha: 0,
    });
    gsap.to(yline, { duration: 10, alpha: 1, delay: 6 });

    var graphics = new PIXI.Graphics().lineStyle(2, 0xffffff, 1);

    app.stage.addChild(graphics);

    var ui = new PIXI.Graphics();

    ui.beginFill(0xffffff);
    for (var i = 0; i < 40000; i++) {
      var x = i * 90 + 42;
      var y = 440;
      var d = 2;
      ui.drawCircle(x, y, d);
      app.stage.addChild(ui);
    }
    gsap.to(ui, {
      duration: 0,
      alpha: 0,
    });
    gsap.to(ui, { duration: 10, alpha: 1, delay: 6 });

    var uiy = new PIXI.Graphics();

    uiy.beginFill(0x00ffff);
    for (var i = 50000; i > 1; i--) {
      var x = 10;
      var y = i * 50 - 5850;
      var radius = 2;
      uiy.drawCircle(x, y, radius);
      app.stage.addChild(uiy);
    }
    gsap.to(uiy, {
      duration: 0,
      alpha: 0,
    });
    gsap.to(uiy, { duration: 10, alpha: 1, delay: 6 });
    return () => {
      app.destroy(true);
    };
  }, []);

  return <div ref={appRef} />;
};

export default Canvas;
function hashValue(length) {
  const availableChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let hashValue = "";
  for (let i = 0; i < length; i++) {
    hashValue +=
      availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  return hashValue;
}
//console.log(hashValue(30));

function getCrashPoint() {
  const e = 2 ** 32;
  const h = crypto.getRandomValues(new Uint32Array(1))[0];
  return Math.floor((100 * e - h) / (e - h)) / 100;
}
const point = getCrashPoint();
console.log(point);
export { point };
