import { Markup } from "telegraf";

export function getMenu() {
    return Markup.keyboard([
      ["Персонажи",  "Бестиарий"],["Список задач"],
    ]).resize();
  }