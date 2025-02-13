import { Context, session, Telegraf, Scenes, Markup } from 'telegraf'
import * as fs from 'fs';
import * as dotenv from "dotenv";
import { getMenu } from './keyboard/startMenu';
import { getMenuTasks } from './keyboard/todoMenu';
import { Update, Message } from 'telegraf/types';
import { getCharacterMenu, getStateMenu, getHitMenu } from './keyboard/characterMenu';
dotenv.config()

const BOT_TOKEN: string = process.env.BOT_TOKEN!
const ADMIN_ID: string = (process.env.ADMIN_ID)!
const bot = new Telegraf(BOT_TOKEN)


const creatureList = JSON.parse(fs.readFileSync('data/creatureList.json', 'utf-8'))
const authors = JSON.parse(fs.readFileSync('data/authors.json', 'utf-8'))
const characterList = JSON.parse(fs.readFileSync('data/сharacters.json', 'utf-8'))

let waitingForNumber = false;

const WriteFile = (path: string, data: any) => {
    fs.writeFileSync(`${path}.json`, JSON.stringify(data, null, 2), 'utf-8')
}

bot.start((ctx) => {
    ctx.reply(
        'Ну начнем!', getMenu()
    )
})



// Начало блока "Персонажи"

bot.hears('Персонажи', ctx => {
    ctx.reply(
        'Это блок работы с персонажем',
        getCharacterMenu()
    )
})


bot.hears('Список персонажей', ctx => {
    const character = characterList.map((character: { name: any; }, index: number) => {
        const row = `${index+1}. ${character.name}`
        return row
    })
    ctx.reply(`Список персонажей \n ${character.join('\n')}`)
})

bot.hears('Нанесение урона', ctx => {
    
    ctx.reply('Какое попадание?', getHitMenu())
    
    bot.hears('Попадание', ctx => {
        let waitingForNumber = false;
        ctx.reply('Укажите урон броска для полного рассчета')

        // bot.on('text', (ctx) => {
        //     if (waitingForNumber) {
        //         const damage = ctx.message.text
        //         if (!isNaN(damage)) {
        //             const damageNum = parseFloat(damage)
        //             const changingStateList = characterList.map((character)=>{
        //                 const rage = !character.state.rage})
        //             if ()
        //         }
        //     }


        // })

        // bot.hears(ctx.message.text, ctx => {
        //     const totalDamage = damage
        // ctx.reply()

        // })
    })
})

bot.hears('Получение урона', ctx => {

})

bot.hears('Изменение состояния', ctx => {
    ctx.reply(
        'Какое состояние вы хотите добавить?',
        getStateMenu()
    )
    bot.hears('Ярость', ctx => {
        const changingStateList = characterList.map((character)=>{
            const rage = !character.state.rage

            const state = {...character.state, rage}

            return {...character, timeHP: rage ? 3 : 0, state}
        })
        WriteFile('data/сharacters', changingStateList)
        ctx.reply(
            'Состояние было изменено!',
            getCharacterMenu()
        )
    })

    bot.hears('Спокойствие', ctx => {
        const changingStateList = characterList.map((character)=>{
            const calm = !character.state.calm
            const state = {...character.state, calm}
        return {...character, state}

        })
        WriteFile('data/сharacters', changingStateList)

        ctx.reply(
            'Состояние было изменено!',
            getCharacterMenu()
        )
    })
})

bot.hears('Долгий отдых', ctx => {
    const changingCharacterList = characterList.map((character)=>{
        const state = {
            calm: false,
            rage: false
        }

        const currentHP = character.maxHP
        const timeHP = 0
        return {...character, timeHP, currentHP, state}
    })


    WriteFile('data/сharacters', changingCharacterList)
})

// Конец блока "Персонажи"


bot.action('list', (ctx) => {
    const creatures = creatureList.map((creature: { name: any; }, index: number)=>{
        const row = `${index+1}. ${creature.name}`
        return row
    })
ctx.reply(`Список добавленных существ \n ${creatures.join('\n')}`)
})

bot.action('characters', ctx => {
    const character = characterList.map((character: { name: any; }, index: number)=>{
        const row = `${index+1}. ${character.name}`
        return row
    })
ctx.reply(`Список персонажей \n ${character.join('\n')}`)
})


bot.command('add', (ctx) => {
    
    const creatureName = ctx.message.text
    .split(' ')
    .slice(1, 3)
    .join(' ')

    const authorName = ctx.from.username
    const authorId = ctx.from.id

    const creature = { name: creatureName, author: authorName }



    const author = { username: authorName, id: authorId }


    const findUniq = (init: string | number, arr: any[]) => !!arr.find((elem) => init === elem.id)
    
   

    if (!findUniq(authorId, authors)) {
        authors.push(author)
        WriteFile('data/authors', authors)        
    }

    if (!findUniq(creatureName, creatureList)) {
        creatureList.push(creature)
        WriteFile('data/creatureList', creatureList)
        ctx.reply(`Существо было добавлено ${creatureName}`)
    } else {
        ctx.reply(`Такое существо ${creatureName} уже есть.`)
    }

    
})

bot.command('change', (ctx) => {
    ctx.reply("Test", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "But1", callback_data: "data1"},
                    { text: "but2", callback_data: "data2"}
                ]
            ]
        }
    })
    
})

bot.command('targetCreature', (ctx) =>{
    ctx.reply('Команда для получения подробной информации по выбранному существу.')
})

bot.command('delete', (ctx) => {
    if ((ctx.from.id as any) !== ADMIN_ID){
        ctx.reply('У вас не достаточно прав')
        return
    }
    const creatureIndex = Number(ctx.message.text
    .split(' ')
    .slice(1)
    .join(' '))

    creatureList.splice(creatureIndex-1, 1)
    WriteFile('data/creatureList', creatureList)


    ctx.reply('Существо было удалено')

    
})




// bot.hears("Добавить задачу", async (ctx) => {

//     let title:any
//     let desc:any
    
//     await ctx.reply('Введите название задачи:')
//     title = ctx.message.text



//     // Reply(title, ctx)

//     // if (!title){
//     //     console.log(title)
//     //     ctx.reply(`Название задачи должно быть более 3-х символов.`)
//     //     Reply(title, ctx)
//     // } else {
//     //     ctx.reply(`Задача ${title}, заведена!`)
//     //     ctx.reply(`Введите описание задачи: `)
//     //     Reply(desc, ctx)
//     // }
//     const authorName = ctx.from.username

//     const task = { title: title, desc: desc, status: 'new', author: authorName }
// })

bot.action("Добавить задачу", async (ctx) => {

})

bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))



