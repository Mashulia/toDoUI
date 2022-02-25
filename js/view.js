import { STATUSES, PRIORITY, DEFAULT_STATUS } from "./main.js";

const FORMS = document.querySelectorAll(".form");

const LISTS = {
  LIST_HIGH_PRIORITY: document.querySelector(".high-priority-list"),
  LIST_LOW_PRIORITY: document.querySelector(".low-priority-list"),
};

let taskList = [
  {
    name: "Вот вам и супер интересная тема. Вы наверняка заметили что ваши файлы с кодом становятся все объемнее, что хочется вынести некоторые вещи куда-то за пределы основной программы.",
    status: STATUSES.TO_DO,
    priority: PRIORITY.HIGH,
  },
  {
    name: "Сверстать этот todo list",
    status: STATUSES.TO_DO,
    priority: PRIORITY.HIGH,
  },
  {
    name: "Начать делать задачу",
    status: STATUSES.DONE,
    priority: PRIORITY.HIGH,
  },
  {
    name: "Посмотреть ютубчик",
    status: STATUSES.TO_DO,
    priority: PRIORITY.LOW,
  },
];

function addTask(event) {
  let priority;
  let input = event.target.querySelector(".input");
  let task = input.value;
  if (input.classList.contains("high")) {
    priority = PRIORITY.HIGH;
  } else {
    priority = PRIORITY.LOW;
  }
  taskList.push({
    name: task,
    status: DEFAULT_STATUS,
    priority: priority,
  });
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

function showTaskByPriority(item) {
  let li = createListItem(item);
  if (item.status === STATUSES.DONE) {
    li.classList.add("checked");
    li.querySelector("input").setAttribute("checked", true);
  }
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
    let isInTaskList = taskList.find((item) => item.name === task);

    try {
      if (input.value === "") {
        throw new Error("Вы не ввели задачу!");
      }
      if (isInTaskList) {
        throw new Error("Такая задача уже есть в списке!");
      }
      addTask(event);
      let item = taskList[taskList.length - 1];
      showTaskByPriority(item);
      input.value = "";
    } catch (error) {
      console.log(error);
      input.value = "";
    }
  });
});
taskList.forEach((element) => {
  showTaskByPriority(element);
});
