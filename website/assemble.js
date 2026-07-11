/* Assemble-style interactions: reveal-on-scroll + 3D pointer tilt on hero stages.
   Works on any page that uses .rv/.rvo and .a-stage>.main. Safe if elements absent. */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.14, rootMargin:'0px 0px -7% 0px'});
    document.querySelectorAll('.rv,.rvo').forEach(function(e){ io.observe(e); });
  } else {
    document.querySelectorAll('.rv,.rvo').forEach(function(e){ e.classList.add('in'); });
  }

  if(reduce) return;

  /* 3D pointer tilt on every hero stage */
  if(window.matchMedia && matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.a-stage').forEach(function(stage){
      var main = stage.querySelector('.main');
      if(!main) return;
      stage.addEventListener('mousemove', function(e){
        var r = stage.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        main.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      });
      stage.addEventListener('mouseleave', function(){ main.style.transform = 'rotateX(0) rotateY(0)'; });
    });
  }
})();
