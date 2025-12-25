import { readUsers,writeUsers } from "../utils/readWriteFile.js";
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
    }
    } catch (err){
        console.error(err);
        res.status(500).json({ msg: "error" + err.message, data: null });
    }
}


