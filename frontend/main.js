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

// Hamburger menu
const hambuger = document.querySelector('#hamburger');
const menu = document.querySelector('#menu');

hambuger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Slider

const collapseItems = document.querySelectorAll('.collapse');
const carousel = document.querySelector('.carousel');

collapseItems.forEach((collapseItem, index) =>
  collapseItem.addEventListener('click', () => {
    carousel.scrollTo(0, carousel.offsetHeight * index);
  })
);

// Form
const dialog = document.querySelector('dialog');
const submitBtn = document.querySelector('form button[type="submit"]');
const closeButton = document.querySelector('dialog button');

submitBtn.addEventListener('click', () => {
  dialog.showModal();
  document.body.style.overflow = 'hidden';
});

closeButton.addEventListener('click', () => {
  dialog.close();
  document.body.style.overflow = 'auto';
});
