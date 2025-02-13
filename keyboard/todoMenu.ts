import { Markup } from "telegraf";

export function getMenuTasks() {
    return Markup.keyboard([
      ["Добавить задачу",  "Изменить статус"],["Удалить задачу"],
    ]).resize();
  }