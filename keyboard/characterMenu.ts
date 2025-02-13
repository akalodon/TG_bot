import { Markup } from "telegraf";

export function getPathfinderMenu() {
    return Markup.keyboard([
        ["Список персонажей", "Добавить персонажа"],
        ["Выбрать персонажа"]

      ]).resize();
}

export function getCharacterMenu() {
  return Markup.keyboard([
    ["Нанесение урона",  "Получение урона"],
    ["Изменение состояния",  "Долгий отдых"],
    ["Повышение уровня"]
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

export function getHitRollMenu() {
  return Markup.keyboard([
    ["Ввести число",  "Бросок тут"]
  ]).resize();
}

export function getDamageRollMenu() {
  return Markup.keyboard([
    ["Бросаю сам"],
    ["D12",  "D10"],
    ["D8",  "D6"],
    ["D4"]
  ]).resize();
}