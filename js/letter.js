// File letter.js: Xu ly phong bi thu tinh tuong tac va render noi dung thu tu config

(function () {
  'use strict';

  window.LoveApp = window.LoveApp || {};

  var letterModule = {
    init: function () {
      var envelopeEl = document.getElementById('letter-envelope');
      var badgeEl = document.getElementById('letter-badge');
      var titleEl = document.getElementById('letter-title');
      var subtitleEl = document.getElementById('letter-subtitle');
      var letterBodyEl = document.getElementById('letter-body-content');
      var letterSalutationEl = document.getElementById('letter-salutation');
      var letterClosingEl = document.getElementById('letter-closing-text');
      var letterSignatureEl = document.getElementById('letter-signature');
      var envelopeHintTextEl = document.getElementById('envelope-hint-text');

      if (!envelopeEl) return;

      var config = window.SITE_CONFIG && window.SITE_CONFIG.letter;
      var coupleConfig = window.SITE_CONFIG && window.SITE_CONFIG.couple;

      // Render tieu de va chu thich section
      if (badgeEl && config && config.badge) badgeEl.textContent = config.badge;
      if (titleEl && config && config.title) titleEl.textContent = config.title;
      if (subtitleEl && config && config.subtitle) subtitleEl.textContent = config.subtitle;

      // Render loi chao dau thu
      if (letterSalutationEl) {
        var defaultSalutation = "Gửi " + (coupleConfig ? coupleConfig.girlName : "em") + " của anh,";
        letterSalutationEl.textContent = (config && config.salutation) || defaultSalutation;
      }

      // Render cac doan van cua buc thu
      if (letterBodyEl && config && config.paragraphs) {
        letterBodyEl.innerHTML = '';
        config.paragraphs.forEach(function (text) {
          var p = document.createElement('p');
          p.textContent = text;
          letterBodyEl.appendChild(p);
        });
      }

      // Render loi ket thu va chu ky
      if (letterClosingEl && config && config.closing) {
        letterClosingEl.textContent = config.closing;
      }
      if (letterSignatureEl && config && config.signature) {
        letterSignatureEl.textContent = config.signature;
      }

      // Xu ly mo hoac dong phong bi khi nguoi dung cham vao
      var isOpen = false;
      envelopeEl.addEventListener('click', function () {
        isOpen = !isOpen;

        if (isOpen) {
          envelopeEl.classList.add('is-open');
          if (envelopeHintTextEl && config && config.closePrompt) {
            envelopeHintTextEl.textContent = config.closePrompt;
          }
          // Ban nhe mot vai hat canh hoa khi phong bi bung mo
          if (window.LoveApp.petals && window.LoveApp.petals.burst) {
            var rect = envelopeEl.getBoundingClientRect();
            window.LoveApp.petals.burst(rect.left + rect.width / 2, rect.top + 60, 16);
          }
        } else {
          envelopeEl.classList.remove('is-open');
          if (envelopeHintTextEl && config && config.envelopePrompt) {
            envelopeHintTextEl.textContent = config.envelopePrompt;
          }
        }
      });
    }
  };

  window.LoveApp.letter = letterModule;
})();
