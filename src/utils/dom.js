export function createElement(
  tagName,
  {
    classes = [],
    textContent,
    attributes = {},
    dataset = {},
    events = {},
    children = [],
  } = {},
) {
  const element = document.createElement(tagName);

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (textContent !== undefined) {
    element.textContent = textContent;
  }

  Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
    element.setAttribute(attributeName, attributeValue);
  });

  Object.entries(dataset).forEach(([dataName, dataValue]) => {
    element.dataset[dataName] = dataValue;
  });

  Object.entries(events).forEach(([eventName, eventHandler]) => {
    element.addEventListener(eventName, eventHandler);
  });

  element.append(...children);

  return element;
}
