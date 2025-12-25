import { readEvents,writeEvents,readUsers } from "../utils/readWriteFile.js";

export async function createEvent(req,res) {
    try {
        const users = await readUsers()
        const index = users.find(user => user.username === req.body.username && user.password===req.body.password)
        if (index) {
            const events = readEvents()
            const isExist = events.find(event => event.eventName===req.body.eventName )
            if (!isExist) {
                const event = {
                    eventName:req.body.eventName,
                    ticketsAvailable:parseInt(req.body.ticketsForSale),
                    createdBy:req.body.username
                }
                events.push(event)
                await writeEvents(events)
                res.status(200).json({ message: "User registered successfully", data: users })
            }
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ msg: "error in eventName ro username or password" + err.message, data: null })
    }
}