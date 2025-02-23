document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.slider');
    let index = 0;
    const images = slider.querySelectorAll('img');
    const totalImages = images.length;

    // Set initial width of slider
    slider.style.width = `${totalImages * 100}%`;

    // Create dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = `dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => updateSlider(i));
      dotsContainer.appendChild(dot);
    });
    container.appendChild(dotsContainer);

    // Update slider position and active dot
    function updateSlider(newIndex) {
      index = Math.max(0, Math.min(newIndex, totalImages - 1));
      const translateValue = -index * (100 / totalImages);
      slider.style.transform = `translateX(${translateValue}%)`;
      dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Touch handling
    let startX = 0;
    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
    
    container.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        updateSlider(diff > 0 ? index + 1 : index - 1);
      }
    });
  });
});
