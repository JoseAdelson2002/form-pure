const addTaskText = document.querySelector(".add-task-text");
const addTaskButton = document.querySelector(".add-task-button");
const taskContainer = document.querySelector(".show-task-container");
const messageErrorContainer = document.querySelector(
  ".message-error-container"
);

const addTask = (e) => {
  e.preventDefault();

  const taskTextValue = addTaskText.value;

  if (IsValidTask(taskTextValue)) {
    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("show-task");
    const task = document.createElement("p");
    task.innerText = taskTextValue;

    task.addEventListener("click", () => handleClick(task));

    taskWrapper.appendChild(task);
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

const handleClick = (taskContent) => {
  const tasks = taskContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }
};

const handleDelete = (taskWrapper) => {
  const tasks = taskContainer.childNodes;

  for (const task of tasks) {
    if (task.isSameNode(taskWrapper)) {
      task.remove();
    }
  }
};

const IsValidTask = (taskText) => {
  if (taskText.trim().length <= 0) {
    messageErrorContainer.style.display = "block";
    return false;
  }

  messageErrorContainer.style.display = "none";
  return true;
};

addTaskButton.addEventListener("click", addTask);
