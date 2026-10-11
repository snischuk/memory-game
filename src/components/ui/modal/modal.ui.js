import './modal.ui.css'

let previousBodyOverflow
let nextModalTitleId = 0
let isPageScrollLocked = false

function setPageScrollLocked(isLocked) {
  if (isLocked && !isPageScrollLocked) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    isPageScrollLocked = true
    return
  }

  if (isLocked) {
    return
  }

  if (!isPageScrollLocked) {
    return
  }

  document.body.style.overflow = previousBodyOverflow ?? ''
  previousBodyOverflow = undefined
  isPageScrollLocked = false
}

export function openModal(modalElement) {
  modalElement.showModal()
  setPageScrollLocked(true)
}

export function closeModal(modalElement) {
  if (!modalElement.open) {
    return
  }

  modalElement.close()
}

export function createModal(contentElements, labelledByElement) {
  const modalElement = document.createElement('dialog')

  modalElement.classList.add('modal')

  if (labelledByElement) {
    nextModalTitleId += 1
    const titleId = `modal-title-${nextModalTitleId}`

    labelledByElement.id = titleId
    modalElement.setAttribute('aria-labelledby', titleId)
  }

  modalElement.append(...contentElements)

  modalElement.addEventListener('close', () => {
    const hasOpenModal = document.querySelector('dialog[open]')

    setPageScrollLocked(Boolean(hasOpenModal))
  })

  modalElement.addEventListener('click', event => {
    if (event.target === modalElement) {
      closeModal(modalElement)
    }
  })

  return modalElement
}
