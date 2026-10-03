export function setPageScrollLocked(isLocked) {
  document.body.style.overflow = isLocked ? 'hidden' : '';
}

export function openModal(modalElement) {
  setPageScrollLocked(true);

  modalElement.showModal();
}

export function closeModal(modalElement) {
  if (!modalElement.open) {
    return;
  }

  modalElement.close();
}

export function createModal(contentElements) {
  const modalElement = document.createElement('dialog');

  modalElement.classList.add('modal');

  modalElement.append(...contentElements);

  modalElement.addEventListener('close', () => {
    setPageScrollLocked(false);
  });

  modalElement.addEventListener('click', (event) => {
    if (event.target === modalElement) {
      closeModal(modalElement);
    }
  });

  return modalElement;
}
