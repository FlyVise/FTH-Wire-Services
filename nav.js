(function(){
  var notice = document.getElementById('notice-bar');
  var dismiss = document.getElementById('notice-dismiss');
  if (notice && dismiss){
    dismiss.addEventListener('click', function(){
      notice.classList.add('dismissed');
    });
  }
})();

(function(){
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('nav-links');
  if (!toggle || !nav) return;

  function closeMenu(){
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu(){
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  toggle.addEventListener('click', toggleMenu);

  nav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function(){
    if (window.innerWidth > 880) closeMenu();
  });
})();
