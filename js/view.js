import { STATUSES, PRIORITY, DEFAULT_STATUS, taskList } from "./main.js";

const FORMS = document.querySelectorAll(".form");

const BUTTONS = {
  BUTTON_ADD: document.querySelector(".button-add"),
  BUTTON_DELETE: document.querySelector(".button-delete"),
  BUTTON: document.querySelector(".button"),
};

const LISTS = {
  LIST_HIGH_PRIORITY: document.querySelector(".high-priority-list"),
  LIST_LOW_PRIORITY: document.querySelector(".low-priority-list"),
};

FORMS.forEach(form => {
  form.addEventListener("submit", (event) => {
    addTask(event);
    console.log(taskList);
  })
});

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


function createListItem() {
  let li = document.createElement("li");

  li.insertAdjacentHTML(
    "afterbegin",
    `<label class="label">
      <input class="visually-hidden checkbox" type="checkbox">
      <span class="checkbox-control"></span>
      <p class="text"></p>
    </label>
    <button class="button button-delete" type="button" title="Удалить задачу">
      <span class="visually-hidden">Удалить задачу</span>
    </button>`
  );
}