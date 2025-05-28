document.addEventListener('DOMContentLoaded', () => {
  function init() {
    const grip = document.querySelector('.paring-status-grip');
    const status = document.querySelector('.paring-status-container');

    let isDragging = false;
    let startX;
    let startWidth;

    grip.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startWidth = parseInt(getComputedStyle(status).width);
      status.style.transition = 'none';

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => {
        isDragging = false;
        status.style.transition =
          'grid-template-rows 0.3s ease, width 0.3s ease';
        document.removeEventListener('mousemove', handleMouseMove);
      });
    });

    function handleMouseMove(e) {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const newWidth = Math.max(400, startWidth - deltaX); // Minimum width of 200px

      status.style.width = `${newWidth}px`;
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
