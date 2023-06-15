const stack = [];

const stackContainer = document.querySelector('.stack');
const newItemInput = document.getElementById('new-item');
const addItemButton = document.getElementById('add-item');
const removeItemButton = document.getElementById('remove-item');

addItemButton.addEventListener('click', () => {
  const newItem = newItemInput.value;
  stack.push(newItem);
  renderStack();
  newItemInput.value = '';
});

removeItemButton.addEventListener('click', () => {
  stack.pop();
  renderStack();
});

function renderStack() {
  stackContainer.innerHTML = '';

  for (let i = stack.length - 1; i >= 0; i--) {
    const item = document.createElement('div');
    item.classList.add('stack__item');
    item.textContent = stack[i];
    stackContainer.appendChild(item);
  }

  const top = document.createElement('div');
  top.classList.add('stack__top');
  stackContainer.insertBefore(top, stackContainer.firstChild);
}
