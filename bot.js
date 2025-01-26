const { Telegraf } = require('telegraf')
const fs = require('fs')
require('dotenv').config()


const BOT_TOKEN = process.env.BOT_TOKEN

const ADMIN_ID = Number(process.env.ADMIN_ID)

const bot = new Telegraf(BOT_TOKEN)

const creatureList = JSON.parse(fs.readFileSync('data/creatureList.json', 'utf-8'))
const authors = JSON.parse(fs.readFileSync('data/authors.json', 'utf-8'))



bot.start((ctx) => ctx.reply('Бестиарий игрока, сюда ты можешь заполнить существ которых ты встречаешь в ходе приключения.'))



bot.command('list', (ctx) => {
        const creatures = creatureList.map((creature, index)=>{
            const row = `${index+1}. ${creature.name}`
            return row
        })
    ctx.reply(`Список добавленных существ \n ${creatures.join('\n')}`)

})


bot.command('add', (ctx) => {
    
    const creatureName = ctx.message.text
    .split(' ')
    .slice(1, 3)
    .join(' ')
    const authorName = ctx.from.username
    const authorId = ctx.from.id

    const creature = { name: creatureName }
    creatureList.push(creature)

    const author = { username: authorName, id: authorId }

    authors.push(author)

    
    fs.writeFileSync('data/creatureList.json', JSON.stringify(creatureList, null, 2), 'utf-8')

    fs.writeFileSync('data/authors.json', JSON.stringify(authors, null, 2), 'utf-8')



    ctx.reply(`Существо было добавлено ${creatureName}`)
    
})

bot.command('change', (ctx) => {
    ctx.reply('Команда для изменения существ')
    
})

bot.command('targetCreature', (ctx) =>{
    ctx.reply('Команда для получения подробной информации по выбранному существу.')
})

bot.command('delete', (ctx) => {
    if (ctx.from.id !== ADMIN_ID){
        ctx.reply('У вас не достаточно прав')
        return
    }
    const creatureIndex = ctx.message.text
    .split(' ')
    .slice(1)
    .join(' ')

    creatureList.splice(creatureIndex-1, 1)

    fs.writeFileSync('data/creatureList.json', JSON.stringify(creatureList, null, 2), 'utf-8')

    ctx.reply('Существо было удалено')

    
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))