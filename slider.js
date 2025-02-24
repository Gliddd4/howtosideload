// slider.js
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.slider');
    let index = 0;
    const images = slider.querySelectorAll('img');
    const totalImages = images.length;

    // Set slider width to accommodate all images horizontally
    slider.style.width = `${totalImages * 100}%`;

    // Touch handling for swiping
    let startX = 0;
    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && index < totalImages - 1) {
          index++;
        } else if (diff < 0 && index > 0) {
          index--;
        }
        slider.style.transform = `translateX(-${index * 100}%)`;
      }
    });
  });
});
