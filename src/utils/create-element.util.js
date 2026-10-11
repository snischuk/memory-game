const BOOLEAN_ATTRIBUTES = new Set([
  'allowfullscreen',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'inert',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'selected'
])

export function createElement(
  tagName,
  {
    classes = [],
    textContent,
    attributes = {},
    properties = {},
    dataset = {},
    events = {},
    children = []
  } = {}
) {
  const element = document.createElement(tagName)

  if (classes.length > 0) {
    element.classList.add(...classes)
  }

  if (textContent !== undefined) {
    element.textContent = textContent
  }

  Object.assign(element, properties)

  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    if (/^on/i.test(attributeName)) {
      throw new TypeError('Use events to register event listeners.')
    }

    if (attributeValue === null || attributeValue === undefined) {
      return
    }

    if (
      typeof attributeValue === 'boolean' &&
      BOOLEAN_ATTRIBUTES.has(attributeName.toLowerCase())
    ) {
      element.toggleAttribute(attributeName, attributeValue)
      return
    }

    element.setAttribute(attributeName, String(attributeValue))
  })

  Object.entries(dataset).forEach(([dataName, dataValue]) => {
    element.dataset[dataName] = dataValue
  })

  Object.entries(events).forEach(([eventName, eventHandler]) => {
    element.addEventListener(eventName, eventHandler)
  })

  const childElements = Array.isArray(children) ? children : [children]

  element.append(...childElements.filter(child => child != null))

  return element
}
