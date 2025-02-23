document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.slider');
    let index = 0;
    const images = slider.querySelectorAll('img');
    const totalImages = images.length;

    // Set the width of the slider to accommodate all images
    slider.style.width = `${totalImages * 100}%`;

    // Create dots for navigation
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    for (let i = 0; i < totalImages; i++) {
      const dot = document.createElement('span');
      dot.className = `dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToImage(i));
      dotsContainer.appendChild(dot);
    }
    container.appendChild(dotsContainer);

    // Function to go to a specific image
    function goToImage(newIndex) {
      index = newIndex;
      const translateX = -index * 100; // Move slider horizontally
      slider.style.transform = `translateX(${translateX}%)`;

      // Update active dot
      dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
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
