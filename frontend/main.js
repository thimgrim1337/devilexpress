const list = document.querySelector('#trailers').children;

[...list].forEach((listItem) =>
  listItem.addEventListener('click', () => {
    closeDescriptions(list);
    openDescription(listItem);
  })
);

function openDescription(listItem) {
  const description = listItem.querySelector('.description');
  listItem.firstElementChild.className =
    'bg-devil-red text-devil-white font-bold p-4 rounded  shadow-sm shadow-red-900 flex gap-5';
  description.classList.add('active');
}

function closeDescriptions(list) {
  [...list].forEach((listItem) => {
    listItem.firstElementChild.className =
      'bg-devil-white text-devil-dark font-bold p-4 rounded  shadow-sm  flex gap-5 ';
    listItem.querySelector('.description').classList.remove('active');
  });
}

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
  console.log(entries);
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
