(function(document) { 'use strict';

  function Paddle(x, y, width, height) {
    this.x = this.oldX = x;
    this.y = this.oldY = y;
    this.width = width;
    this.height = height;
  }

  Paddle.prototype.move = function(y) {
    this.oldY = this.y;
    this.y = y;
  };

  Paddle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = '#0099ff';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#0099ff';
    ctx.fill();
    ctx.stroke();
  };

  function Ball(x, y, radius) {
    this.x = this.oldX = x;
    this.y = this.oldY = y;
    this.radius = radius;
    this.vx = 4;
    this.vy = 4;
  }

  Ball.prototype.move = function() {
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += this.vx;
    this.y += this.vy;
  };

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  };

  // function Particles(x, y, m) {
  //   this.x = x || 0;
  //   this.y = y || 0;
    
  //   this.radius = 1.2;
    
  //   this.vx = -1.5 + Math.random()*3;
  //   this.vy = m * Math.random()*1.5;
  // }

  // Particles.prototype.create = function() {

  // }

  function collides(b, p) {
    return !(
      (b.x + b.radius < p.x) ||
      (b.x - b.radius > p.x + p.width) ||
      (b.y + b.radius < p.y) ||
      (b.y - b.radius > p.y + p.height))
  }

  function collidesEdge(b) {
    return !(
      (b.y + b.radius < height) ||
      (b.y - b.radius > 0))
  }

  var display = document.getElementById('display');
  var ctx = display.getContext('2d');

  var width = display.width = window.innerWidth;
  var height = display.height = window.innerHeight;

  var paddles = [];
  var middle = (height / 2) - 75;
  paddles.push(new Paddle(100, middle, 20, 125));
  paddles.push(new Paddle(width - 100, middle, 20, 125));

  var ball = new Ball(width / 2, height / 2, 20);

  var mouse = { x: null, y: null };

  function onMousemove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    for (var i = 0; i < paddles.length; ++i) {
      paddles[i].move(mouse.y - paddles[i].height / 2);
    }
  }

  display.addEventListener('mousemove', onMousemove);
  
  (function frame() {
    requestAnimationFrame(frame);
   
    // // Store the current transformation matrix
    ctx.save();

    // // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // // Restore the transform
    ctx.restore();

    ball.draw();
    // ball.move();
    ball.x += ball.vx;
    ball.y += ball.vy;
    console.log(ball.y)

    for (var i = 0; i < paddles.length; i++) {
      paddles[i].draw();
      if (collides(ball, paddles[i])) {
        ball.vx = -ball.vx;
      } else {
        if (ball.y - ball.radius < 0) {
          ball.vy = -ball.vy;
          ball.y = ball.radius;
        } else if (ball.y + ball.radius > height) {
          ball.vy = -ball.vy;
          ball.y = height - ball.radius
        }
      } 
    }
  })();

})(document);