import { STATUSES, PRIORITY, DEFAULT_STATUS } from "./main.js";

const FORMS = document.querySelectorAll(".form");

const LISTS = {
  LIST_HIGH_PRIORITY: document.querySelector(".high-priority-list"),
  LIST_LOW_PRIORITY: document.querySelector(".low-priority-list"),
};

let taskList = [];

function addTask(event) {
  let priority;
  let input = event.target.querySelector(".input");
  let task = input.value;
  if (input.classList.contains("high")) {
    priority = PRIORITY.HIGH;
  } else {
    priority = PRIORITY.LOW;
  }
  if (input.value !== "") {
    taskList.push({
      name: task,
      status: DEFAULT_STATUS,
      priority: priority,
    });
    input.value = "";
  }
}

function deleteTask(event) {
  let item = event.target.parentElement;
  let task = item.querySelector("p").textContent;
  taskList = taskList.filter((element) => element.name !== task);
  item.remove();
}

function changeStatus(event) {
  let task = event.target.parentElement.querySelector(".text").textContent;
  colorTask(event);
  taskList.map((element) => {
    if (element.name === task && element.status !== STATUSES.DONE) {
      element.status = STATUSES.DONE;
    } else if (element.name === task && element.status === STATUSES.DONE) {
      element.status = STATUSES.TO_DO;
    }
  });
}

function colorTask(event) {
  let item = event.target.parentElement.parentElement;
  console.log(item);
  item.classList.toggle("checked");
}

function createListItem(item) {
  let li = document.createElement("li");
  let label = document.createElement("label");
  let input = document.createElement("input");
  let checkbox = document.createElement("span");
  let text = document.createElement("p");
  let button = document.createElement("button");
  let span = document.createElement("span");
  label.className = "label";
  input.className = "visually-hidden checkbox";
  input.type = "checkbox";
  checkbox.className = "checkbox-control";
  text.className = "text";
  text.textContent = item.name;
  button.className = "button button-delete";
  button.type = "button";
  button.title = "Удалить задачу";
  span.className = "visually-hidden";
  span.textContent = "Удалить задачу";
  li.append(label);
  label.append(input);
  label.append(checkbox);
  label.append(text);
  li.append(button);
  button.append(span);
  button.addEventListener("click", deleteTask);
  input.addEventListener("click", changeStatus);
  return li;
}

function showTaskByPriority() {
  let item = taskList[taskList.length - 1];
  let li = createListItem(item);
  if (item.priority === PRIORITY.HIGH) {
    LISTS.LIST_HIGH_PRIORITY.append(li);
  } else {
    LISTS.LIST_LOW_PRIORITY.append(li);
  }
}

FORMS.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let input = form.querySelector(".input");
    let task = input.value;
    let isInTaskList = taskList.find(item => item.name === task)
    if (!isInTaskList) {
      addTask(event);
      showTaskByPriority();
    } else {
      input.value = "";
    }
  });
});
