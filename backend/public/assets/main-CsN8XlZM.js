/* empty css              */ (function () {
  const r = document.createElement('link').relList;
  if (r && r.supports && r.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) c(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === 'childList')
        for (const n of t.addedNodes)
          n.tagName === 'LINK' && n.rel === 'modulepreload' && c(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (t.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (t.credentials = 'omit')
        : (t.credentials = 'same-origin'),
      t
    );
  }
  function c(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = s(e);
    fetch(e.href, t);
  }
})();
function i(o, r, s, c) {
  let e = null;
  const t = (n) => {
    e || (e = n);
    const l = Math.min((n - e) / c, 1);
    (o.innerHTML = Math.floor(l * (s - r) + r)),
      l < 1 && window.requestAnimationFrame(t);
  };
  window.requestAnimationFrame(t);
}
const f = document.querySelector('.clientCounter'),
  m = document.querySelector('.orderCounter'),
  d = document.querySelector('.kmCounter');
let u = !1,
  p = new IntersectionObserver((o) => {
    o.forEach((r) => {
      r.isIntersecting &&
        !u &&
        ((u = !u), i(f, 0, 520, 2e3), i(m, 0, 28, 2e3), i(d, 0, 16, 2e3));
    });
  });
p.observe(d);
const y = document.querySelector('#hamburger'),
  g = document.querySelector('#menu');
y.addEventListener('click', () => {
  g.classList.toggle('active');
});
const h = document.querySelectorAll('.collapse'),
  a = document.querySelector('.carousel');
h.forEach((o, r) =>
  o.addEventListener('click', () => {
    a.scrollTo(0, a.offsetHeight * r);
  })
);

function onSubmit(token) {
  document.querySelector('form').submit();
}
