function animateCounter(counter, startValue, endValue, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    counter.innerHTML = Math.floor(
      progress * (endValue - startValue) + startValue
    );
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const clientCounter = document.querySelector('.clientCounter');
const orderCounter = document.querySelector('.orderCounter');
const kmCounter = document.querySelector('.kmCounter');
let counterStart = false;

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !counterStart) {
      counterStart = !counterStart;
      animateCounter(clientCounter, 0, 520, 2000);
      animateCounter(orderCounter, 0, 28, 2000);
      animateCounter(kmCounter, 0, 16, 2000);
    }
  });
});

observer.observe(kmCounter);
