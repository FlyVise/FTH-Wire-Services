(function(){
  var amountEl = document.getElementById('calc-amount');
  var currencyEl = document.getElementById('calc-currency');
  var resultEl = document.getElementById('calc-result');
  var noteEl = document.getElementById('calc-note');
  if (!amountEl || !currencyEl || !resultEl || !noteEl) return;

  var latestRates = null;

  function fmtINR(n){
    return '₹' + n.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2});
  }

  function recalc(){
    if (!latestRates){
      resultEl.textContent = '—';
      return;
    }
    var amount = parseFloat(amountEl.value);
    var code = currencyEl.value;
    var rate = latestRates[code];
    if (!isFinite(amount) || amount < 0 || !rate){
      resultEl.textContent = '—';
      return;
    }
    resultEl.textContent = fmtINR(amount * rate);
    noteEl.textContent = 'Indicative mid-market rate — your booked rate is locked at transfer time.';
  }

  amountEl.addEventListener('input', recalc);
  currencyEl.addEventListener('change', recalc);

  window.addEventListener('fth:rates', function(e){
    latestRates = e.detail;
    recalc();
  });
  window.addEventListener('fth:rates-unavailable', function(){
    if (!latestRates){
      noteEl.textContent = 'Live rates unavailable right now — try again shortly.';
    }
  });

  if (window.FTH_RATES){
    latestRates = window.FTH_RATES;
    recalc();
  }
})();
