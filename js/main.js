// File main.js: Diem khoi chay chinh cua website, noi cac module va xu ly ban trai tim

(function () {
  'use strict';

  window.LoveApp = window.LoveApp || {};

  // Dien cac thong tin van ban dong tu config vao HTML
  function populateConfigData() {
    var config = window.SITE_CONFIG;
    if (!config) return;

    // Ten nguoi yeu va loi chuc o Hero
    var girlNameHero = document.getElementById('hero-girl-name');
    if (girlNameHero && config.couple && config.couple.girlName) {
      girlNameHero.textContent = config.couple.girlName;
    }

    var heroBadge = document.getElementById('hero-badge');
    if (heroBadge && config.hero && config.hero.badge) {
      heroBadge.textContent = config.hero.badge;
    }

    var heroTitle = document.getElementById('hero-title-text');
    if (heroTitle && config.hero && config.hero.title) {
      heroTitle.textContent = config.hero.title;
    }

    var heroScrollHint = document.getElementById('hero-scroll-hint');
    if (heroScrollHint && config.hero && config.hero.scrollHint) {
      heroScrollHint.textContent = config.hero.scrollHint;
    }

    // Section 3: Loi nhan
    var messageBadge = document.getElementById('message-badge');
    if (messageBadge && config.message && config.message.badge) {
      messageBadge.textContent = config.message.badge;
    }

    var messageTitle = document.getElementById('message-title');
    if (messageTitle && config.message && config.message.title) {
      messageTitle.textContent = config.message.title;
    }

    var messageSubtitle = document.getElementById('message-subtitle');
    if (messageSubtitle && config.message && config.message.subtitle) {
      messageSubtitle.textContent = config.message.subtitle;
    }

    var messageBody = document.getElementById('message-content-body');
    if (messageBody && config.message && config.message.quotes) {
      messageBody.innerHTML = '';
      config.message.quotes.forEach(function (q) {
        var p = document.createElement('p');
        p.textContent = q;
        messageBody.appendChild(p);
      });
    }

    var messageAuthor = document.getElementById('message-author');
    if (messageAuthor && config.message && config.message.author) {
      messageAuthor.textContent = config.message.author;
    }

    // Section 6: Loi ket
    var closingBadge = document.getElementById('closing-badge');
    if (closingBadge && config.closing && config.closing.badge) {
      closingBadge.textContent = config.closing.badge;
    }

    var closingTitle = document.getElementById('closing-title');
    if (closingTitle && config.closing && config.closing.title) {
      closingTitle.textContent = config.closing.title;
    }

    var closingContent = document.getElementById('closing-content-text');
    if (closingContent && config.closing && config.closing.content) {
      closingContent.textContent = config.closing.content;
    }

    var btnSendHeart = document.getElementById('btn-send-heart');
    if (btnSendHeart && config.closing && config.closing.buttonText) {
      btnSendHeart.textContent = config.closing.buttonText;
    }
  }

  // Xu ly nut bam "Gui lai mot trai tim cho anh" va nut dat lai ve 0
  function initSendHeart() {
    var btn = document.getElementById('btn-send-heart');
    var badge = document.getElementById('heart-counter-badge');
    var wrapper = document.getElementById('heart-counter-wrapper');
    var btnReset = document.getElementById('btn-reset-heart');
    var config = window.SITE_CONFIG && window.SITE_CONFIG.closing;
    var template = (config && config.counterTemplate) || 'Em đã gửi {count} trái tim cho anh rồi nè! 💕';

    // Kiem tra neu URL co tham so reset thi tu dong xoa khoi localStorage
    if (window.location && window.location.search && window.location.search.indexOf('reset') !== -1) {
      try {
        localStorage.removeItem('love_app_heart_count');
      } catch (e) {}
    }

    // Lay so luot tim da gui tu localStorage
    var heartCount = 0;
    try {
      heartCount = parseInt(localStorage.getItem('love_app_heart_count') || '0', 10);
    } catch (e) {
      heartCount = 0;
    }

    function updateBadge() {
      var container = wrapper || badge;
      if (!container || !badge) return;
      if (heartCount > 0) {
        container.style.display = wrapper ? 'inline-flex' : 'inline-block';
        badge.textContent = template.replace('{count}', heartCount);
      } else {
        container.style.display = 'none';
      }
    }

    // Ham dat lai so tim ve 0
    function resetHearts() {
      heartCount = 0;
      try {
        localStorage.removeItem('love_app_heart_count');
      } catch (err) {}
      updateBadge();
    }

    // Gan su kien cho nut dat lai
    if (btnReset) {
      btnReset.addEventListener('click', function (e) {
        e.stopPropagation();
        resetHearts();
      });
    }

    // Gan ham vao namespace toan cuc
    window.LoveApp.resetHearts = resetHearts;

    updateBadge();

    if (!btn) return;

    btn.addEventListener('click', function () {
      heartCount++;
      try {
        localStorage.setItem('love_app_heart_count', heartCount.toString());
      } catch (err) {}

      updateBadge();

      // Lay toa do nut de ban trai tim bay len
      var rect = btn.getBoundingClientRect();
      var originX = rect.left + rect.width / 2;
      var originY = rect.top + rect.height / 2;

      // Ban hat canh hoa tren canvas
      if (window.LoveApp.petals && window.LoveApp.petals.burst) {
        window.LoveApp.petals.burst(originX, originY, 20);
      }

      // Tao trai tim DOM bay len tren man hinh
      var heartIcons = ['❤️', '💖', '💕', '🌸', '✨'];
      for (var i = 0; i < 7; i++) {
        var heartEl = document.createElement('div');
        heartEl.className = 'flying-heart';
        heartEl.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heartEl.style.left = (originX + (Math.random() * 60 - 30)) + 'px';
        heartEl.style.top = (originY + (Math.random() * 20 - 10)) + 'px';

        // Bien CSS ngau nhien cho quy dao bay
        heartEl.style.setProperty('--tx', (Math.random() * 120 - 60) + 'px');
        heartEl.style.setProperty('--tx-end', (Math.random() * 200 - 100) + 'px');
        heartEl.style.setProperty('--rot', (Math.random() * 60 - 30) + 'deg');
        heartEl.style.setProperty('--rot-end', (Math.random() * 120 - 60) + 'deg');

        document.body.appendChild(heartEl);

        (function (el) {
          setTimeout(function () {
            if (el && el.parentNode) {
              el.parentNode.removeChild(el);
            }
          }, 1600);
        })(heartEl);
      }
    });
  }

  // Hieu ung hien thi phan tu mem mai khi cuon trang (Scroll Reveal)
  function initScrollReveal() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var elements = document.querySelectorAll('.reveal-on-scroll');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // Neu prefers-reduced-motion hoac trinh duyet cu thi hien thi luon
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('is-visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Chi can xuat hien mot lan
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }
  }

  // Khoi tao toan bo ung dung khi DOM da san sang
  document.addEventListener('DOMContentLoaded', function () {
    // 1. Dien du lieu tu config
    populateConfigData();

    // 2. Khoi dong hieu ung canh hoa roi
    if (window.LoveApp.petals) {
      window.LoveApp.petals.init();
    }

    // 3. Khoi dong man hinh intro mo hop qua
    if (window.LoveApp.intro) {
      window.LoveApp.intro.init();
    }

    // 4. Khoi dong hieu ung go chu typewriter o Hero
    if (window.LoveApp.typewriter) {
      window.LoveApp.typewriter.init();
    }

    // 5. Khoi dong phong bi thu tinh
    if (window.LoveApp.letter) {
      window.LoveApp.letter.init();
    }

    // 6. Khoi dong dong ho dem ngay yeu nhau
    if (window.LoveApp.countdown) {
      window.LoveApp.countdown.init();
    }

    // 7. Khoi dong trinh phat nhac
    if (window.LoveApp.music) {
      window.LoveApp.music.init();
    }

    // 8. Khoi dong nut ban trai tim
    initSendHeart();

    // 9. Khoi dong hieu ung xuat hien khi cuon
    initScrollReveal();
  });

  window.LoveApp.main = {
    populateConfigData: populateConfigData,
    initSendHeart: initSendHeart
  };
})();
