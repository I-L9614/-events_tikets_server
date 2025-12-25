import express from 'express'
import * as userControllers from '../controllers/usersCntrollers.js'
import * as eventsControllers from '../controllers/eventsControllers.js'
import * as ticketsControllers from '../controllers/ticketsControllers.js'

const router = express.Router()

router.route('/users/register')
    .post(userControllers.createNewUser)

router.route('/creator/events')
    .post(eventsControllers.createEvent)

router.route('/users/tickets/buy')
    .post(ticketsControllers.buyTickets)

router.route('/users/:username/summary')
    .get()








export default router