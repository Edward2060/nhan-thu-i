// File countdown.js: Tinh toan va cap nhat thoi gian yeu nhau tu ngay bat dau trong config

(function () {
  'use strict';

  window.LoveApp = window.LoveApp || {};

  // Ham them so 0 phia truoc cho so nho hon 10
  function padZero(num) {
    return num < 10 ? '0' + num : '' + num;
  }

  // Ham phan tich linh hoat moi dinh dang ngay ve gio dia phuong (tranh bi lech 7h UTC)
  function parseStartDate(dateStr) {
    if (!dateStr) return new Date(2024, 11, 14, 0, 0, 0);
    var s = String(dateStr).trim();

    // Ho tro dinh dang DD/MM/YYYY hoac DD-MM-YYYY (vi du: 14/12/2024 hoac 14-12-2024 20:00)
    var dmyMatch = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:[\sT]+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
    if (dmyMatch) {
      var d = parseInt(dmyMatch[1], 10);
      var m = parseInt(dmyMatch[2], 10) - 1;
      var y = parseInt(dmyMatch[3], 10);
      var hh = dmyMatch[4] ? parseInt(dmyMatch[4], 10) : 0;
      var mm = dmyMatch[5] ? parseInt(dmyMatch[5], 10) : 0;
      var ss = dmyMatch[6] ? parseInt(dmyMatch[6], 10) : 0;
      return new Date(y, m, d, hh, mm, ss);
    }

    // Ho tro dinh dang YYYY-MM-DD hoac YYYY/MM/DD (vi du: 2024-12-14 hoac 2024-12-14 20:00)
    var ymdMatch = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})(?:[\sT]+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
    if (ymdMatch) {
      var y = parseInt(ymdMatch[1], 10);
      var m = parseInt(ymdMatch[2], 10) - 1;
      var d = parseInt(ymdMatch[3], 10);
      var hh = ymdMatch[4] ? parseInt(ymdMatch[4], 10) : 0;
      var mm = ymdMatch[5] ? parseInt(ymdMatch[5], 10) : 0;
      var ss = ymdMatch[6] ? parseInt(ymdMatch[6], 10) : 0;
      return new Date(y, m, d, hh, mm, ss);
    }

    // Fallback cuoi cung
    var fallback = new Date(s);
    return isNaN(fallback.getTime()) ? new Date(2024, 11, 14, 0, 0, 0) : fallback;
  }

  // Ham tinh toan so ngay, gio, phut, giay va so nam thang yeu nhau
  function calculateDuration(startDateStr) {
    var start = parseStartDate(startDateStr);
    var now = new Date();

    if (isNaN(start.getTime())) {
      start = new Date(2024, 11, 14, 0, 0, 0);
    }

    // Tong so mili-giay da qua
    var diffMs = now.getTime() - start.getTime();
    var isFuture = diffMs < 0;
    var absDiffMs = Math.abs(diffMs);

    var totalSeconds = Math.floor(absDiffMs / 1000);
    var totalMinutes = Math.floor(totalSeconds / 60);
    var totalHours = Math.floor(totalMinutes / 60);
    var totalDays = Math.floor(totalHours / 24);

    var seconds = totalSeconds % 60;
    var minutes = totalMinutes % 60;
    var hours = totalHours % 24;

    // Tinh so nam, thang, ngay tuong doi chuan xac
    var years = 0;
    var months = 0;
    var days = 0;

    if (!isFuture) {
      years = now.getFullYear() - start.getFullYear();
      months = now.getMonth() - start.getMonth();
      days = now.getDate() - start.getDate();

      // Neu thoi gian trong ngay cua now chua den gio cua start thi tru 1 ngay
      var nowTimeVal = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      var startTimeVal = start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds();
      if (nowTimeVal < startTimeVal) {
        days--;
      }

      if (days < 0) {
        months--;
        var prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    return {
      totalDays: totalDays,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      years: Math.max(0, years),
      months: Math.max(0, months),
      days: Math.max(0, days),
      isFuture: isFuture
    };
  }

  var countdownModule = {
    timerId: null,

    init: function () {
      var config = window.SITE_CONFIG;
      var countdownConfig = config && config.countdown;
      var coupleConfig = config && config.couple;
      var startDateStr = (coupleConfig && coupleConfig.startDate) || '2024-12-14';

      // Lay cac phan tu DOM
      var badgeEl = document.getElementById('countdown-badge');
      var titleEl = document.getElementById('countdown-title');
      var subtitleEl = document.getElementById('countdown-subtitle');
      var quoteEl = document.getElementById('countdown-quote-text');
      var daysEl = document.getElementById('countdown-days');
      var hoursEl = document.getElementById('countdown-hours');
      var minutesEl = document.getElementById('countdown-minutes');
      var secondsEl = document.getElementById('countdown-seconds');
      var summaryEl = document.getElementById('countdown-summary-text');

      // Dien du lieu tinh tu config
      if (badgeEl && countdownConfig && countdownConfig.badge) {
        badgeEl.textContent = countdownConfig.badge;
      }
      if (titleEl && countdownConfig && countdownConfig.title) {
        titleEl.textContent = countdownConfig.title;
      }
      if (subtitleEl && countdownConfig && countdownConfig.subtitle) {
        subtitleEl.textContent = countdownConfig.subtitle;
      }
      if (quoteEl && countdownConfig && countdownConfig.quote) {
        quoteEl.textContent = countdownConfig.quote;
      }

      var summaryTemplate = (countdownConfig && countdownConfig.summaryTemplate) ||
        'Đã cùng nhau đi qua {years} năm {months} tháng {days} ngày ngọt ngào';

      // Ham cap nhat gia tri thoi gian tren giao dien
      function updateClock() {
        var duration = calculateDuration(startDateStr);

        if (daysEl) daysEl.textContent = duration.totalDays;
        if (hoursEl) hoursEl.textContent = padZero(duration.hours);
        if (minutesEl) minutesEl.textContent = padZero(duration.minutes);
        if (secondsEl) secondsEl.textContent = padZero(duration.seconds);

        if (summaryEl) {
          // Xay dung chuoi thoi gian tu nhien neu so nam bang 0
          var timeSpanParts = [];
          if (duration.years > 0) {
            timeSpanParts.push(duration.years + ' năm');
          }
          if (duration.months > 0) {
            timeSpanParts.push(duration.months + ' tháng');
          }
          if (duration.days > 0 || timeSpanParts.length === 0) {
            timeSpanParts.push(duration.days + ' ngày');
          }

          var summaryText = summaryTemplate
            .replace('{years}', duration.years)
            .replace('{months}', duration.months)
            .replace('{days}', duration.days)
            .replace('{totalDays}', duration.totalDays);

          // Neu chua tron 1 nam thi bo bot chu "0 nam" de cau van tu nhien hon
          if (duration.years === 0 && summaryTemplate.indexOf('{years}') !== -1) {
            summaryText = 'Đã cùng nhau đi qua ' + timeSpanParts.join(' ') + ' ngọt ngào';
          }

          summaryEl.textContent = summaryText;
        }
      }

      // Chay ngay lan dau
      updateClock();

      // Cap nhat moi giay
      if (this.timerId) clearInterval(this.timerId);
      this.timerId = setInterval(updateClock, 1000);
    }
  };

  window.LoveApp.countdown = countdownModule;
})();
