// File intro.js: Xu ly man hinh mo dau, hop qua tuong tac va mo khoa trang web kem am nhac

(function () {
  'use strict';

  window.LoveApp = window.LoveApp || {};

  var introModule = {
    init: function () {
      var introScreen = document.getElementById('intro-screen');
      var giftBox = document.getElementById('gift-box-trigger');
      var btnOpen = document.getElementById('btn-open-gift');

      if (!introScreen || !giftBox) return;

      var config = window.SITE_CONFIG && window.SITE_CONFIG.intro;
      if (config) {
        var greetingEl = document.getElementById('intro-greeting');
        var badgeEl = document.getElementById('intro-badge');
        var titleEl = document.getElementById('intro-title');
        var subtitleEl = document.getElementById('intro-subtitle');
        var btnTextEl = document.getElementById('intro-btn-text');

        if (greetingEl && config.greeting) greetingEl.textContent = config.greeting;
        if (badgeEl && config.badge) badgeEl.textContent = config.badge;
        if (titleEl && config.title) titleEl.textContent = config.title;
        if (subtitleEl && config.subtitle) subtitleEl.textContent = config.subtitle;
        if (btnTextEl && config.buttonText) btnTextEl.textContent = config.buttonText;
      }

      var hasOpened = false;

      function openGift() {
        if (hasOpened) return;
        hasOpened = true;

        // Tao hieu ung mo nap hop qua 3D
        giftBox.classList.add('is-opening');

        // Lay toa do hop qua de ban phao hoa canh hoa va trai tim
        var rect = giftBox.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;

        if (window.LoveApp.petals && window.LoveApp.petals.burst) {
          window.LoveApp.petals.burst(centerX, centerY, 35);
        }

        // Kich hoat phat nhac nen sau tuong tac nguoi dung
        if (window.LoveApp.music && window.LoveApp.music.play) {
          window.LoveApp.music.play();
        }

        // Bien mat man hinh intro sau khi hop qua mo
        setTimeout(function () {
          introScreen.classList.add('is-hidden');
          document.body.style.overflow = 'auto'; // Cho phep cuon trang
        }, 700);

        // An hoan toan khoi man hinh sau khi hieu ung fade ket thuc
        setTimeout(function () {
          introScreen.style.display = 'none';
        }, 1600);
      }

      // Khoa cuon trang khi chua mo qua
      document.body.style.overflow = 'hidden';

      // Lang nghe su kien click vao hop qua hoac nut bam
      giftBox.addEventListener('click', openGift);
      if (btnOpen) {
        btnOpen.addEventListener('click', openGift);
      }
    }
  };

  window.LoveApp.intro = introModule;
})();
