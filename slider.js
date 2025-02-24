document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.slider');
    let index = 0;
    const images = slider.querySelectorAll('img');
    const totalImages = images.length;

    // Set slider width to accommodate all images horizontally
    const imageWidth = images[0].naturalWidth; // Get the natural width of the image
    slider.style.width = `${imageWidth * totalImages}px`; // Set the total width

    // Function to update the slider position
    const updateSliderPosition = () => {
      slider.style.transform = `translateX(-${index * imageWidth}px)`;
    };

    // Touch handling for swiping
    let startX = 0;
    let isSwiping = false;

    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    });

    container.addEventListener("touchmove", (e) => {
      if (!isSwiping) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;

      // Dynamically update the slider position while swiping
      slider.style.transition = "none"; // Disable transition during swiping
      slider.style.transform = `translateX(-${index * imageWidth + diff}px)`;
    });

    container.addEventListener("touchend", (e) => {
      if (!isSwiping) return;
      isSwiping = false;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      // Reset transition after swiping ends
      slider.style.transition = "transform 0.3s ease";

      if (Math.abs(diff) > 50) {
        if (diff > 0 && index < totalImages - 1) {
          index++;
        } else if (diff < 0 && index > 0) {
          index--;
        }
      } else {
        // If swipe distance is too short, snap back to the original position
        slider.style.transform = `translateX(-${index * imageWidth}px)`;
        return;
      }

      updateSliderPosition();
    });
  });
});
