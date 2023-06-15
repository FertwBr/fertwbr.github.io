const itemInput = document.querySelector('#itemInput');
const positionInput = document.querySelector('#positionInput');
const addButton = document.querySelector('#addButton');
const items = document.querySelector('#items');

addButton.addEventListener('click', () => {
  const itemText = itemInput.value;
  const position = parseInt(positionInput.value);
  if (itemText) {
    const newItem = createItem(position ? position : items.children.length + 1, itemText);
    if (position) {
      if (position > items.children.length) {
        items.appendChild(newItem);
      } else {
        items.insertBefore(newItem, items.children[position - 1]);
      }
    } else {
      items.appendChild(newItem);
    }
    itemInput.value = '';
    positionInput.value = '';
  }
});

items.addEventListener('click', event => {
  if (event.target.classList.contains('removeButton')) {
    items.removeChild(event.target.parentElement);
    updateItemNumbers();
  }
});

function updateItemNumbers() {
  Array.from(items.children).forEach((item, index) => {
    item.querySelector('span').textContent = `${index + 1}º`;
  });
}

function createItem(position, text) {
  const newItem = document.createElement('li');
  newItem.innerHTML = `<span>${position}º</span> ${text} <button class="removeButton">Remover</button>`;
  return newItem;
}
