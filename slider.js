document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.slider');
    let index = 0;
    const images = slider.querySelectorAll('img');
    const totalImages = images.length;

    // Function to go to a specific image
    function goToImage(newIndex) {
      index = newIndex;
      const translateX = -index * 100; // Move slider horizontally
      slider.style.transform = `translateX(${translateX}%)`;
    }

    // Touch handling for swiping
    let startX = 0;
    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0 && index < totalImages - 1) {
          goToImage(index + 1); // Swipe left (next image)
        } else if (diff < 0 && index > 0) {
          goToImage(index - 1); // Swipe right (previous image)
        }
      }
    });
  });
});
