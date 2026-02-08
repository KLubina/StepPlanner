export function createTextInput(id, value, placeholder) {
  return `<input type="text" id="${id}" value="${value}" placeholder="${placeholder}" style="width: 100%; padding: 10px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 16px;">`;
}

export function createNumberInput(id, value, step, min, placeholder) {
  return `<input type="number" id="${id}" value="${value}" step="${step}" min="${min}" placeholder="${placeholder}" style="width: 100%; padding: 10px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 16px;">`;
}

export function createColorInput(id, value) {
  return `<input type="color" id="${id}" value="${value}" style="width: 100px; height: 50px; border: 2px solid #e9ecef; border-radius: 8px; cursor: pointer;">`;
}

export function createTextarea(id, value, placeholder) {
  return `<textarea id="${id}" placeholder="${placeholder}" style="width: 100%; min-height: 100px; padding: 10px; border: 2px solid #e9ecef; border-radius: 8px; font-size: 16px; resize: vertical;">${value}</textarea>`;
}
