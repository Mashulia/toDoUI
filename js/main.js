import { BUTTONS, INPUTS, LISTS, createListItem } from "./view.js";

const STATUSES = {
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};
const PRIORITY = {
  HIGH: "high",
  LOW: "low",
};

const DEFAULT_STATUS = STATUSES.TO_DO;

let list = [];

BUTTONS.BUTTON_ADD.addEventListener("click", (event) => {
  let task = event.target.value;
  let priority = getPriority(event);
  addTask(task, priority);
});

INPUTS.FIELDS.forEach((element) => {
  element.addEventListener("keydown", (event) => {
    let task = event.target.value;
    let priority = getPriority(event);
    if (event.code === "Enter") {
      addTask(task, priority);
      event.target.value = "";
    }
  });
});

function getPriority(event) {
  let priority;
  if (
    event.target.className === "input high" ||
    event.target.className === "button button-add high"
  ) {
    priority = PRIORITY.HIGH;
  } else {
    priority = PRIORITY.LOW;
  }
  return priority;
}

// function changeStatus(task, status) {
//   let currentElement = list.find((element) => element.name === task);
//   currentElement.status = status;
// }
// function changePriority(task, priority) {
//   let currentElement = list.find((element) => element.name === task);
//   currentElement.priority = priority;
// }

function addTask(task, priority) {
  list.push({
    name: task,
    status: DEFAULT_STATUS,
    priority: priority,
  });
}

// function deleteTask(task) {
//   list = list.filter((element) => element.name !== task);
// }

// function showTasks() {
//   list.forEach((element) => {
//     let item = createListItem();
//     if (element.priority === PRIORITY.HIGH) {
//       LISTS.LIST_HIGH_PRIORITY.append(item);
//     } else {
//       LISTS.LIST_LOW_PRIORITY.append(item);
//     }
//   });
// }

// showTasks();
console.log(list);
