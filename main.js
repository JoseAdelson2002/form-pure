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
    const task = document.createElement("p");
    task.textContent = taskTextValue;

    taskContainer.appendChild(task);
    addTaskText.value = "";

    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";

    deleteButton.appendChild(deleteIcon);
    taskContainer.appendChild(deleteButton);
  }
};

const IsValidTask = (taskText) => {
  if (taskText.length <= 0) {
    messageErrorContainer.style.display = "block";
    return false;
  }

  messageErrorContainer.style.display = "none";
  return true;
};

addTaskButton.addEventListener("click", addTask);
