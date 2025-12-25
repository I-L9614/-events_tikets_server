import { readUsers,writeUsers,readReceipts } from "../utils/readWriteFile.js";
import fs from 'fs/promises'

export async function createNewUser(req, res) {
    try {
    const users = await readUsers()
    const index = users.findIndex(user => user.id === req.body.username)
    if (!index) {
        const user  = {
            username:req.body.username,
            password:req.body.password
        }
        users.push(user)
        await writeUsers(users)
        res.status(200).json({ message: "User registered successfully", data: users });
    } else {
        res.status(404).json({ msg: "error:username olready exsist" + err.message, data: null })
    }
    } catch (err){
        console.error(err);
        res.status(500).json({ msg: "error" + err.message, data: null });
    }
}

export async function UserPurchaseSummary(req,res) {
    try{
        const receipts = await readReceipts()
        const userReceipts = receipts.filter(receipt => receipt.username===req.params.username)
        if (userReceipts > 0) {
            const userInfo = {
                totalTicketsBought:0,
                events:[],
                averageTicketsPerEvent:0
            }
            for (let i = 0;i<userReceipts.length;i++) {
                userInfo.totalTicketsBought += userReceipts[i].ticketsBought
                userInfo.events.push(userReceipts[i].eventName)

            }
            userInfo.averageTicketsPerEvent = userInfo.totalTicketsBought / userInfo.events.length 
            res.status(200).json({ message: "Calculated successfuly:", data: userInfo })
        } else {
            res.status(404).json({ message: "zero eventes has found", data: userInfo })
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ msg: "error" + err.message, data: null })
    }
}

