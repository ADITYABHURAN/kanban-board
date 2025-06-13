const addTaskBtn = document.getElementById('add-task-btn');
const todoBoard = document.getElementById('todo-board');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function attachDragEvents(target) {
  target.addEventListener('dragstart', () => {
    target.classList.add('flying');
  });
  target.addEventListener('dragend', () => {
    target.classList.remove('flying');
  });
}
//Aditya Bhuran //
function createTaskElement(text) {
  const p = document.createElement('p');
  p.classList.add('item');
  p.setAttribute('draggable', true);

  const span = document.createElement('span');
  span.textContent = text;

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.title = 'Edit';
  editBtn.onclick = () => {
    const newText = prompt('Edit task:', span.textContent);
    if (newText) span.textContent = newText;
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.title = 'Delete';
  deleteBtn.onclick = () => p.remove();

  p.appendChild(span);
  p.appendChild(editBtn);
  p.appendChild(deleteBtn);

  attachDragEvents(p);
  return p;
}

addTaskBtn.addEventListener('click', () => {
  const input = prompt('What is the task?');
  if (!input) return;
  const task = createTaskElement(input);
  todoBoard.appendChild(task);
});

const allBoards = document.querySelectorAll('.board');
const allItems = document.querySelectorAll('.item');

allItems.forEach((item) => {
  const task = createTaskElement(item.textContent.trim());
  item.replaceWith(task);
});

allBoards.forEach((board) => {
  board.addEventListener('dragover', (e) => {
    e.preventDefault();
    const flying = document.querySelector('.flying');
    if (flying && board !== flying.parentNode) {
      board.appendChild(flying);
    }
  });
});

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
});
