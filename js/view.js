export const BUTTONS = {
  BUTTON_ADD: document.querySelector(".button-add"),
  BUTTON_DELETE: document.querySelector(".button-delete"),
  BUTTON: document.querySelector(".button"),
};
export const INPUTS = {
  INPUT_HIGH_PRIORITY: document.querySelector(".input-high-priority"),
  INPUT_LOW_PRIORITY: document.querySelector(".input-low-priority"),
  FIELDS: document.querySelectorAll(".input"),
};
export const LISTS = {
  LIST_HIGH_PRIORITY: document.querySelector(".high-priority-list"),
  LIST_LOW_PRIORITY: document.querySelector(".low-priority-list"),
};

export function createListItem() {
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
