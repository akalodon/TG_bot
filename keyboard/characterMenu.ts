import { Markup } from "telegraf";

export function getCharacterMenu() {
    return Markup.keyboard([
        ["Список персонажей", "Изменение состояния"],
        ["Нанесение урона",  "Получение урона"],
        ["Повышение уровня",  "Долгий отдых"]
      ]).resize();
}

export function getStateMenu() {
  return Markup.keyboard([
    ["Ярость",  "Спокойствие"]
  ]).resize();
}

export function getHitMenu() {
  return Markup.keyboard([
    ["Попадание",  "Критическое попадание"]
  ]).resize();
}