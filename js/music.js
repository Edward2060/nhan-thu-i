// File music.js: Quan ly phat nhac nen, xu ly chan autoplay va ho tro bo giai dieu piano acoustic mac dinh

(function () {
  'use strict';

  window.LoveApp = window.LoveApp || {};

  var audioEl = null;
  var isPlaying = false;
  var musicBtn = null;
  var audioContext = null;
  var synthInterval = null;
  var isUsingSynth = false;

  // Bo giai dieu du phong bang Web Audio API (neu chua co file mp3 trong assets/audio/)
  var notes = [
    261.63, 329.63, 392.00, 523.25, // Do - Mi - Sol - Do
    220.00, 261.63, 329.63, 440.00, // La - Do - Mi - La
    174.61, 220.00, 261.63, 349.23, // Fa - La - Do - Fa
    196.00, 246.94, 293.66, 392.00  // Sol - Si - Re - Sol
  ];
  var currentNoteIdx = 0;

  // Ham phat mot not nhac piano dien nhe nhang
  function playSynthNote() {
    if (!isPlaying) return;
    try {
      if (!audioContext) {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        audioContext = new AudioCtx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      var osc = audioContext.createOscillator();
      var gain = audioContext.createGain();

      osc.type = 'triangle'; // Am sac am giong music box / piano dien
      osc.frequency.value = notes[currentNoteIdx];

      var now = audioContext.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(now);
      osc.stop(now + 1.2);

      currentNoteIdx = (currentNoteIdx + 1) % notes.length;
    } catch (err) {
      // Bo qua neu trinh duyet khong ho tro
    }
  }

  // Bat dau chu trinh giai dieu synth
  function startSynthMelody() {
    isUsingSynth = true;
    if (synthInterval) clearInterval(synthInterval);
    playSynthNote();
    synthInterval = setInterval(playSynthNote, 420);
  }

  // Dung giai dieu synth
  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  // Cap nhat giao dien nut bat tat nhac
  function updateButtonUI() {
    if (!musicBtn) return;
    if (isPlaying) {
      musicBtn.classList.add('is-playing');
      musicBtn.setAttribute('aria-label', 'Tắt nhạc nền');
      musicBtn.setAttribute('title', 'Tắt nhạc nền');
    } else {
      musicBtn.classList.remove('is-playing');
      musicBtn.setAttribute('aria-label', 'Bật nhạc nền');
      musicBtn.setAttribute('title', 'Bật nhạc nền');
    }
  }

  var musicModule = {
    init: function () {
      musicBtn = document.getElementById('music-toggle-btn');
      var config = window.SITE_CONFIG && window.SITE_CONFIG.music;
      var src = (config && config.src) || 'assets/audio/music.mp3';

      audioEl = new Audio();
      audioEl.src = src;
      audioEl.loop = true;
      audioEl.preload = 'auto';

      // Neu file mp3 chua co hoac bi loi, tu dong chuyen sang dung synth
      audioEl.addEventListener('error', function () {
        if (config && config.enableSynthFallback) {
          isUsingSynth = true;
        }
      });

      if (musicBtn) {
        musicBtn.addEventListener('click', function () {
          musicModule.toggle();
        });
      }
    },

    play: function () {
      if (isPlaying) return;
      isPlaying = true;

      if (!isUsingSynth && audioEl) {
        var playPromise = audioEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(function () {
            // Neu trinh duyet chan phat mp3 hoac khong tim thay file
            startSynthMelody();
          });
        }
      } else {
        startSynthMelody();
      }

      updateButtonUI();
    },

    pause: function () {
      if (!isPlaying) return;
      isPlaying = false;

      if (audioEl) {
        audioEl.pause();
      }
      stopSynthMelody();

      updateButtonUI();
    },

    toggle: function () {
      if (isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }
  };

  window.LoveApp.music = musicModule;
})();
