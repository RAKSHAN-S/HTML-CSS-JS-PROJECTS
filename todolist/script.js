const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addBtn = document.getElementById('add-btn');

let tasks = [];

addBtn.addEventListener('click', addTask);

function addTask() {
  const taskValue = inputBox.value.trim();
  if (taskValue === '') {
    alert("Task cannot be empty!");
    return;
  }
  if (tasks.some(task => task.text === taskValue)) {
    alert("Task already exists!");
    return;
  }

  const task = { text: taskValue, completed: false };
  tasks.push(task);
  inputBox.value = "";
  saveData();
  renderTasks();
}

function renderTasks() {
  listContainer.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('checked', task.completed);

    const text = document.createElement('span');
    text.textContent = task.text;
    text.classList.add('task-text');
    li.appendChild(text);

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add('edit-btn');
    editBtn.onclick = () => editTask(index);
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&#10060;';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);

    li.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        tasks[index].completed = !tasks[index].completed;
        saveData();
        renderTasks();
      }
    });

    listContainer.appendChild(li);
  });
}

function editTask(index) {
  const newTaskText = prompt("Edit your task:", tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    if (tasks.some((task, i) => task.text === newTaskText && i !== index)) {
      alert("Task already exists!");
    } else {
      tasks[index].text = newTaskText.trim();
      saveData();
      renderTasks();
    }
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveData();
  renderTasks();
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
}

loadData();
