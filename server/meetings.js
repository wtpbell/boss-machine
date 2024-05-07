const meetingsRouter = require('express').Router();
module.exports = meetingsRouter;

const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting,
} = require("./db");

meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})
