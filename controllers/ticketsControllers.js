import { readEvents, readUsers,writeEvents,writeReceipts,readReceipts } from "../utils/readWriteFile.js";

export async function buyTickets(req, res) {
    try {
        const users = await readUsers()
        const isUser = users.find(user => user.usernmae === req.body.username && user.password === req.body.password)
        if (isUser) {
            const events = await readEvents()
            const index = events.find(event => event.eventName === req.body.eventName)
            if (index) {
                if (events[index].ticketsAvailable >= req.body.quantity) {
                    events[index].ticketsAvailable = events[index].ticketsAvailable - req.body.quantity
                    await writeEvents(events)
                    const receipts = await readReceipts()
                    receipts.push({username:req.body.username, eventName:req.body.eventName,ticketsBought:req.body.quantity})
                    await writeReceipts(receipts)
                    res.status(200).json({ message: "Tickets purchased successfully", data: users })
                }else{
                    res.status(500).json({ msg: "error:there is not enufgh tickets available:" + err.message, data: null })
                }
            } else {
                res.status(404).json({ msg: "error:event not exsist" + err.message, data: null })
            }
        } else {
            res.status(404).json({ msg: "error:user name or password is wrong" + err.message, data: null })
        }

    } catch(err) {
        console.error(err);
        res.status(500).json({ msg: "error" + err.message, data: null })
    }
}