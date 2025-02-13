import { randomUUID } from "crypto";
import { Telegraf, Scenes, session } from "telegraf"


// const addTaskScene = new Scenes.WizardScene(
//     'addTask',
//     (ctx) => {
//         ctx.reply('Введите название задачи:')
//         return ctx.wizard.next();
//     },
//     (ctx) => {
//         ctx.wizard.state.title = ctx.message.text;
//         ctx.reply('Добавьте описание:')
//         return ctx.wizard.next();
//     },
//     (ctx) => {
//         ctx.wizard.state.description = ctx.message.text;
//         return ctx.wizard.next();
//     },
//     (ctx) => {     
//         const {title, description} = ctx.wizard.state;
//         const author = `${ctx.from.username}(${ctx.from.id})`

//         const id = randomUUID()
//         const task = {
//             id,
//             title,
//             description,
//             author,
//             status: 'Новая',
//             createAt: new Date()
//         }

//         task
//     }
// )   