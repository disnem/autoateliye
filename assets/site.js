const viewer = document.querySelector('#viewer');
const works = Array.from(document.querySelectorAll('[data-work]'));

if (typeof viewer?.showModal === 'function' && works.length) {
  const picture = document.querySelector('#large-image');
  const caption = document.querySelector('#image-caption');
  const count = document.querySelector('#image-number');
  const close = viewer.querySelector('.close');
  let current = 0;

  function showPhoto(index) {
    current = (index + works.length) % works.length;
    const work = works[current];
    picture.src = work.href;
    picture.alt = work.querySelector('img').alt;
    caption.textContent = picture.alt;
    count.textContent = `${current + 1} / ${works.length}`;
  }

  for (const [index, work] of works.entries()) {
    work.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showPhoto(index);
      viewer.showModal();
      close.focus();
    });
  }
  close.addEventListener('click', () => viewer.close());
  viewer.querySelector('.prev').addEventListener('click', () => showPhoto(current - 1));
  viewer.querySelector('.next').addEventListener('click', () => showPhoto(current + 1));
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) {
      const box = viewer.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right ||
          event.clientY < box.top || event.clientY > box.bottom) viewer.close();
    }
  });
  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
}

for (const link of document.querySelectorAll('a[href^="#price-"]')) {
  link.addEventListener('click', () => {
    const group = document.getElementById(link.hash.slice(1));
    if (group) group.open = true;
  });
}
