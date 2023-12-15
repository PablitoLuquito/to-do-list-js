function toDoList() {
  const input = document.querySelector('.input');
  const add = document.querySelector('.add');
  const list = document.querySelector('.to-do');

  function createLiTag() {
    const li = document.createElement('li');
    li.classList.add('list-item');
    return li;
  }

  function emptyInput() {
    input.value = '';
    input.focus();
  }

  function createRemoveButton(li) {
    const removeButton = document.createElement('img');
    removeButton.setAttribute('src', './assets/img/remove.svg');
    removeButton.setAttribute('alt', 'Click to remove item');
    removeButton.setAttribute('title', 'Click to remove item');
    removeButton.classList.add('remove');
    li.appendChild(removeButton);
  }

  function createListItem(input) {
    const li = createLiTag();
    li.innerText = input.trim();
    list.appendChild(li);
    createRemoveButton(li);
    emptyInput();
    saveToDo();
  }

  input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      if (!input.value) return;
      createListItem(input.value);
    }
  })

  add.addEventListener('click', function() {
    if (!input.value) return;
    createListItem(input.value);
  })

  document.addEventListener('click', (event) => {
    const element = event.target;
    if (element.classList.contains('remove')) {
      element.parentElement.remove();
      saveToDo();
    }
  })

  function saveToDo() {
    const listItems = document.querySelectorAll('.list-item');
    const arrayListItems = [];

    for (let item of listItems) {
      let listItemText = item.innerText;
      arrayListItems.push(listItemText);
    }

    const listItemsJSON = JSON.stringify(arrayListItems);
    localStorage.setItem('listItems', listItemsJSON);
  }

  function addSavedList() {
    const listItems = localStorage.getItem('listItems');
    const arrayListItems = JSON.parse(listItems);

    for (let item of arrayListItems) {
      createListItem(item);
    }
  }

  addSavedList();
};

toDoList();

/*function toDoList() {
  
  const input = document.querySelector('.input');
  const list = document.getElementById('sortable-list');
  let key = 0;
  
  document.onclick = (event) => {
    const element = event.target;
  
    if (element.classList.contains('add')) {
      createListItem(input.value);
      return input.value = '';
    };
  
    if (element.classList.contains('remove')) {
      const listItem = element.closest('.list-item');
        listItem.remove();
    };
  };
  
  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      createListItem(input.value.trim());
      return input.value = '';
    };
  });
  
  list.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.dataset.key);
  });
  
  list.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  
  list.addEventListener('drop', (event) => {
    const droppedKey = event.dataTransfer.getData('text/plain');
    const draggedItem = document.querySelector(`[data-key="${droppedKey}"]`);
    const targetItem = event.target.closest('.list-item');
  
    if (targetItem) {
      const rect = targetItem.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      const dropPosition = event.clientY < midpoint ? 'beforebegin' : 'afterend';
  
      list.insertBefore(draggedItem, targetItem[dropPosition]);
    };
  });
  
  function createListItem(value) {
    if (value.length === 0) {
      alert('The text field must not be send empty');
    } else {
      let item;
      let remove;
      const text = document.createTextNode(value);
  
      const listItem = {
        tag: 'li',
        'data-key': key,
        class: 'list-item'
      };
  
      const removeIcon = {
        tag: 'img',
        src: './assets/img/remove.svg',
        alt: 'Click to remove item',
        class: 'remove',
        draggable: 'true'
      };
  
      for (const object in listItem) {
        if (listItem[object] === 'li') {
          item = document.createElement(listItem[object]);
          key++;
          continue;
        };
        item.setAttribute(object, listItem[object]);
      };
  
      for (const object in removeIcon) {
        if (removeIcon[object] === 'img') {
          remove = document.createElement(removeIcon[object]);
          continue;
        };
        remove.setAttribute(object, removeIcon[object]);
      };
      item.appendChild(text);
      item.appendChild(remove);
      list.appendChild(item);
      setTimeout(function() {
        item.classList.add('show');
      }, 10);
    }
  }
}
toDoList();*/