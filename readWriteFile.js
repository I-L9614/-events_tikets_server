
import fs from 'fs/promises'

export async function readUsers() {
    const users = await fs.readFile('users.json','utf8')
    return JSON.parse(users)
}

export async function readEvents() {
    const events = await fs.readFile('events.json','utf8')
    return JSON.parse(events)
}

export async function writeUsers(users) {
    await fs.writeFile('users.json', JSON.stringify(users, null, 2))
}


export async function writeEvents(events) {
    await fs.writeFile('events.json', JSON.stringify(events, null, 2))
}