// File petals.js: Hieu ung canh hoa hong va trai tim roi tren Canvas toan man hinh

(function () {
  'use strict';

  window.LoveApp = window.LoveApp || {};

  var canvas, ctx;
  var width = 0, height = 0;
  var particles = [];
  var isRunning = false;
  var animFrameId = null;

  // Kiem tra nguoi dung co bat che do giam chuyen dong khong
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Bang mau canh hoa pastel va trai tim
  var colors = [
    'rgba(255, 182, 193, 0.75)',
    'rgba(247, 140, 160, 0.75)',
    'rgba(224, 109, 126, 0.7)',
    'rgba(254, 207, 239, 0.8)',
    'rgba(255, 117, 140, 0.65)'
  ];

  // Khoi tao mot hat canh hoa hoac trai tim
  function createParticle(burstX, burstY) {
    var isHeart = Math.random() < 0.25; // 25% hat la trai tim, 75% la canh hoa
    return {
      x: burstX !== undefined ? burstX : Math.random() * width,
      y: burstY !== undefined ? burstY : Math.random() * -height * 0.5,
      size: Math.random() * 8 + 8, // Kich thuoc 8 - 16px
      speedY: burstY !== undefined ? (Math.random() * -4 - 2) : (Math.random() * 1.2 + 0.8),
      speedX: burstX !== undefined ? (Math.random() * 6 - 3) : (Math.random() * 1 - 0.5),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.4 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      isHeart: isHeart,
      isBurst: burstX !== undefined
    };
  }

  // Ve mot canh hoa hong bang duong cong bezier
  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size, -p.size * 0.6, p.size * 0.8, -p.size * 1.5, 0, -p.size * 1.8);
    ctx.bezierCurveTo(-p.size * 0.8, -p.size * 1.5, -p.size, -p.size * 0.6, 0, 0);
    ctx.fill();

    ctx.restore();
  }

  // Ve mot hinh trai tim nho
  function drawHeart(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;

    var s = p.size * 0.7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s, -s * 0.8, -s * 1.4, s * 0.3, 0, s * 1.2);
    ctx.bezierCurveTo(s * 1.4, s * 0.3, s, -s * 0.8, 0, 0);
    ctx.fill();

    ctx.restore();
  }

  // Vong lap animation chinh
  function render() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Cap nhat vi tri
      p.sway += p.swaySpeed;
      p.x += Math.sin(p.sway) * 0.8 + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Neu la hat ban no thi giam toc do dan
      if (p.isBurst) {
        p.speedY += 0.12; // Trong luc
        p.opacity -= 0.008;
      }

      // Ve hat tuong ung
      if (p.isHeart) {
        drawHeart(p);
      } else {
        drawPetal(p);
      }

      // Tai su dung hat khi roi qua mep duoi man hinh
      if (p.y > height + 20 || p.opacity <= 0) {
        if (p.isBurst) {
          particles.splice(i, 1);
          i--;
        } else {
          particles[i] = createParticle();
        }
      }
    }

    animFrameId = requestAnimationFrame(render);
  }

  // Cap nhat kich thuoc Canvas theo kich thuoc man hinh
  function resize() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  var petalsModule = {
    // Khoi tao he thong hat
    init: function () {
      canvas = document.getElementById('petals-canvas');
      if (!canvas) return;

      ctx = canvas.getContext('2d');
      resize();

      window.addEventListener('resize', resize);

      if (prefersReducedMotion) return;

      // So luong hat vua phai (25 hat tren mobile, 45 tren desktop) dam bao mượt mà
      var count = window.innerWidth < 600 ? 25 : 45;
      for (var i = 0; i < count; i++) {
        var p = createParticle();
        p.y = Math.random() * height; // Rai deu hat ngay tu dau
        particles.push(p);
      }

      isRunning = true;
      render();
    },

    // Ban mot chum canh hoa va trai tim tai vi tri (x, y)
    burst: function (x, y, count) {
      if (prefersReducedMotion || !isRunning) return;
      var num = count || 20;
      for (var i = 0; i < num; i++) {
        particles.push(createParticle(x, y));
      }
    }
  };

  window.LoveApp.petals = petalsModule;
})();
