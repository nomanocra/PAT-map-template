document.addEventListener('DOMContentLoaded', () => {
  function init() {
    const grip = document.querySelector('.paring-status-grip');
    const statusContainer = document.querySelector('.paring-status-container');

    let isDragging = false;
    let startX;
    let startWidth;

    grip.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startWidth = parseInt(getComputedStyle(statusContainer).width);
      statusContainer.style.transition = 'none';

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => {
        isDragging = false;
        statusContainer.style.transition =
          'grid-template-rows 0.3s ease, width 0.3s ease';
        document.removeEventListener('mousemove', handleMouseMove);
      });
    });

    function handleMouseMove(e) {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const maxWidth = window.innerWidth - 16; // Window width minus 16px padding
      const newWidth = Math.min(maxWidth, Math.max(400, startWidth - deltaX));

      statusContainer.style.width = `${newWidth}px`;
    }
  }

  const paringListHeader = document.querySelector('.paring-list .card-header');
  const paringListContainer = document.querySelector('.paring-list-container');

  paringListHeader.addEventListener('click', () => {
    paringListContainer.classList.toggle('closed');
  });

  const paringStatusHeader = document.querySelector(
    '.paring-status .card-header'
  );
  const paringStatusContainer = document.querySelector(
    '.paring-status-container'
  );

  paringStatusHeader.addEventListener('click', () => {
    paringStatusContainer.classList.toggle('closed');
    if (paringStatusContainer.classList.contains('closed')) {
      paringStatusContainer.style.width = '200px';
    } else {
      paringStatusContainer.style.width = '400px';
    }
  });

  init();
});
