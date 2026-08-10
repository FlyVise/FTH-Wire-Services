(function(){
  var EASE = [0.16, 1, 0.3, 1];

  var reveals = document.querySelectorAll('.reveal');
  var groups = document.querySelectorAll('.reveal-group');
  var liftTargets = document.querySelectorAll('.btn, .service-card, .kyc-card, .testimonial, .area-tag');

  function showAll(){
    reveals.forEach(function(el){ el.style.opacity = 1; el.style.transform = 'none'; });
    groups.forEach(function(group){
      Array.prototype.forEach.call(group.children, function(child){
        child.style.opacity = 1;
        child.style.transform = 'none';
      });
    });
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || (!reveals.length && !groups.length && !liftTargets.length)) {
    showAll();
    return;
  }

  // Framer Motion's vanilla-JS build (same animation engine as the React
  // library, published as "motion") — loaded from a CDN since this site
  // has no build step. If the CDN is unreachable, fall back to showing
  // reveal content immediately rather than leaving it hidden.
  import('https://cdn.jsdelivr.net/npm/motion@13/+esm').then(function(motion){
    var animate = motion.animate;
    var inView = motion.inView;
    var stagger = motion.stagger;
    var hover = motion.hover;

    reveals.forEach(function(el){
      inView(el, function(){
        animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, ease: EASE });
      }, { amount: 0.15, margin: '0px 0px -40px 0px' });
    });

    groups.forEach(function(group){
      inView(group, function(){
        var children = Array.prototype.slice.call(group.children);
        animate(children, { opacity: [0, 1], y: [24, 0] }, {
          duration: 0.6,
          delay: stagger(0.09),
          ease: EASE
        });
      }, { amount: 0.15, margin: '0px 0px -40px 0px' });
    });

    hover(liftTargets, function(element){
      var lift = element.classList.contains('area-tag')
        ? { scale: 1.05 }
        : { y: -4, scale: 1.015 };
      animate(element, lift, { duration: 0.25, ease: EASE });
      return function(){
        animate(element, { y: 0, scale: 1 }, { duration: 0.25, ease: EASE });
      };
    });
  }).catch(showAll);
})();
