import { Markup } from "telegraf";

export function getMenu() {
    return Markup.keyboard([
      ["Pafhfinder",  "Бестиарий"],["Список задач"],
    ]).resize();
  }