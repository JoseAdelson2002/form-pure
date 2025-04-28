const addTaskText = document.querySelector(".add-task-text");
const addTaskButton = document.querySelector(".add-task-button");
const taskContainer = document.querySelector(".show-task-container");
const messageErrorContainer = document.querySelector(
  ".message-error-container"
);

const addTask = (e) => {
  e.preventDefault();

  const inputIsValid = IsValidTask();

  if (!inputIsValid) {
    return (messageErrorContainer.style.display = "block");
  }

  messageErrorContainer.style.display = "none";

  const taskWrapper = document.createElement("div");
  taskWrapper.classList.add("show-task");
  const taskContent = document.createElement("p");
  taskContent.innerText = addTaskText.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  taskWrapper.appendChild(taskContent);
  addTaskText.value = "";

  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash";

  deleteButton.addEventListener("click", () => handleDelete(taskWrapper));

  deleteButton.appendChild(deleteIcon);
  taskWrapper.appendChild(deleteButton);
  taskContainer.appendChild(taskWrapper);

  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = taskContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDelete = (taskWrapper) => {
  const tasks = taskContainer.childNodes;

  for (const task of tasks) {
    if (task.isSameNode(taskWrapper)) {
      task.remove();
    }
  }
  updateLocalStorage();
};

const IsValidTask = () => {
  return addTaskText.value.trim().length > 0;
};

const updateLocalStorage = () => {
  const tasks = taskContainer.childNodes;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    let isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted: isCompleted };
  });
  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromLocalStorage) {
    return;
  }

  for (const task of tasksFromLocalStorage) {
    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("show-task");
    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    taskWrapper.appendChild(taskContent);
    addTaskText.value = "";

    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";

    deleteButton.addEventListener("click", () => handleDelete(taskWrapper));

    deleteButton.appendChild(deleteIcon);
    taskWrapper.appendChild(deleteButton);
    taskContainer.appendChild(taskWrapper);
  }
};

refreshTasksUsingLocalStorage();
addTaskButton.addEventListener("click", addTask);
