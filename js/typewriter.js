// File typewriter.js: Hieu ung go chu tu dong va xoa chu cho loi chuc Hero

(function () {
  'use strict';

  window.LoveApp = window.LoveApp || {};

  var typewriterModule = {
    init: function () {
      var targetEl = document.getElementById('typewriter-text');
      if (!targetEl) return;

      var config = window.SITE_CONFIG && window.SITE_CONFIG.hero;
      var texts = (config && config.typewriterTexts) || [
        "cô gái dịu dàng và tuyệt vời nhất của anh."
      ];

      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        // Neu thiet bi bat prefers-reduced-motion thi hien thi luon cau dau tien
        targetEl.textContent = texts[0];
        return;
      }

      var textIndex = 0;
      var charIndex = 0;
      var isDeleting = false;
      var typeSpeed = 75;   // Toc do go chu (ms)
      var deleteSpeed = 35; // Toc do xoa chu (ms)
      var pauseTime = 1800; // Thoi gian dung sau khi go xong mot cau

      function tick() {
        var currentFullText = texts[textIndex];

        if (isDeleting) {
          // Dang xoa chu
          charIndex--;
          targetEl.textContent = currentFullText.substring(0, charIndex);
        } else {
          // Dang go chu
          charIndex++;
          targetEl.textContent = currentFullText.substring(0, charIndex);
        }

        var delta = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentFullText.length) {
          // Go xong mot cau -> tam dung roi xoa
          delta = pauseTime;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          // Xoa het -> chuyen sang cau tiep theo
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          delta = 450; // Nghi mot chut truoc khi go cau moi
        }

        setTimeout(tick, delta);
      }

      // Bat dau chu trinh go chu
      tick();
    }
  };

  window.LoveApp.typewriter = typewriterModule;
})();
