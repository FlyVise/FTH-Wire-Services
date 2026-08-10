(function(){
  var PAIRS = ["USD","GBP","EUR","CAD","AUD","SGD"];
  var previousRates = null;
  var statusEl = document.getElementById('rate-status');
  var heroNoteEl = document.getElementById('hero-rate-note');

  function fmt(n){
    return n.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2});
  }

  function applyRates(rates, timestamp){
    // rates: { USD: inrPerUsd, GBP: inrPerGbp, ... }
    PAIRS.forEach(function(code){
      var value = rates[code];
      if (value == null) return;

      // Ticker (multiple duplicated items share the same data-pair)
      document.querySelectorAll('.ticker-item[data-pair="' + code + '"]').forEach(function(item){
        var rateEl = item.querySelector('.rate');
        var arrowEl = item.querySelector('.arrow');
        rateEl.textContent = fmt(value);
        if (previousRates && previousRates[code] != null){
          var diff = value - previousRates[code];
          if (Math.abs(diff) < 0.0005){
            arrowEl.textContent = '–';
            arrowEl.className = 'mono arrow';
          } else if (diff > 0){
            arrowEl.textContent = '▲ ' + fmt(Math.abs(diff));
            arrowEl.className = 'mono arrow up';
          } else {
            arrowEl.textContent = '▼ ' + fmt(Math.abs(diff));
            arrowEl.className = 'mono arrow down';
          }
        }
      });

      // Hero rate card (only present on the homepage)
      var cardEl = document.querySelector('.val[data-rate="' + code + '"]');
      if (cardEl) cardEl.textContent = '₹' + fmt(value);
    });

    previousRates = rates;

    var timeStr = timestamp.toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'});
    if (statusEl) statusEl.textContent = 'Live rates · updated ' + timeStr + ' IST · refreshes every 60s';
    if (heroNoteEl) heroNoteEl.textContent = 'Live mid-market rate as of ' + timeStr + ' — your booked rate may vary slightly.';
  }

  function fetchRates(){
    // Free, keyless exchange rate API (base currency USD)
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(function(res){
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(function(data){
        if (!data || !data.rates || !data.rates.INR){
          throw new Error('Unexpected API response');
        }
        var inrPerUsd = data.rates.INR;
        var computed = { USD: inrPerUsd };
        ['GBP','EUR','CAD','AUD','SGD'].forEach(function(code){
          var perUsd = data.rates[code];
          if (perUsd) computed[code] = inrPerUsd / perUsd;
        });
        applyRates(computed, new Date());
      })
      .catch(function(err){
        if (statusEl) statusEl.textContent = 'Live rates unavailable right now — showing last known indicative rates.';
        if (heroNoteEl) heroNoteEl.textContent = 'Indicative rate — actual rate is locked at the time of booking.';
      });
  }

  fetchRates();
  setInterval(fetchRates, 60000);
})();
