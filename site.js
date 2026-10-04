/* Code Hub - transição de páginas, logo 3D e revelação suave */
(function () {
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fade out curto antes de trocar de página
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    body.classList.add('is-leaving');
    setTimeout(function () { location.href = a.href; }, 260);
  });
  window.addEventListener('pageshow', function () { body.classList.remove('is-leaving'); });

  // Inclinação 3D da logo acompanhando o mouse
  document.querySelectorAll('.logo-3d').forEach(function (logo) {
    if (reduce) return;
    logo.addEventListener('mousemove', function (e) {
      var r = logo.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      logo.style.transform = 'rotateY(' + x * 26 + 'deg) rotateX(' + -y * 26 + 'deg)';
    });
    logo.addEventListener('mouseleave', function () { logo.style.transform = ''; });
  });

  // Revela cards ao rolar
  var items = document.querySelectorAll('.card-pilar,.card-service,.card-project,.card-operacao,.card-about,.card-organograma');
  if (!('IntersectionObserver' in window) || reduce) return;
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in-view'); io.unobserve(x.target); } });
  }, { threshold: 0.12 });
  items.forEach(function (el, i) { el.classList.add('reveal'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
})();
