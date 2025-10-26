const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let List = JSON.parse(localStorage.getItem('task')) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = List.map(item =>
    `<li class="task-item" id="${item.id}">
      <label class="task-text ${item.check ? 'completed' : ''}">
        <input type="checkbox" class="task-checkbox"
               id="checkbox-${item.id}"
               ${item.check ? 'checked' : ''}
               onchange="toggleCheck('${item.id}')">
        ${item.text}
      </label>
      <button class="delete-btn" onclick="deleteItem('${item.id}')">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </li>`
  ).join('');
}

renderTasks();

// Add new task
addTaskButton.addEventListener('click', () => {
  const taskInputValue = taskInput.value.trim();
  if (taskInputValue === '') {
    alert('Please enter a valid task!');
    return;
  }

  const newTask = {
    id: crypto.randomUUID(),
    text: taskInputValue,
    check: false
  };

  List.push(newTask);
  localStorage.setItem('task', JSON.stringify(List));
  renderTasks();
  taskInput.value = '';
});

// Delete a task
function deleteItem(id) {
  List = List.filter(item => item.id !== id);
  localStorage.setItem('task', JSON.stringify(List));
  renderTasks();
}

// Toggle checkbox state
function toggleCheck(id) {
  List = List.map(item =>
    item.id === id ? { ...item, check: !item.check } : item
  );
  localStorage.setItem('task', JSON.stringify(List));
  renderTasks();
}