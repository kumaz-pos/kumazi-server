const express= require('express');

const router= express.Router();
const {getEvents, getEvent, editEvent, deleteEvent, createEvent} = require('../controllers/events');

router.route('/').get(getEvents).post(createEvent);
router.route('/:id').get(getEvent).patch(editEvent)
.delete(deleteEvent);

module.exports=router;