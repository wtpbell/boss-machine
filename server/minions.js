const minionsRouter = require("express").Router();
module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
    const minion = getFromDatabaseById("minions", id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get("/", (req, res) => {
    res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res) => {
    const newMinion = addToDatabase("minions", req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res) => {
    res.send(req.minion);
});

minionsRouter.put("/:minionId", (req, res) => {
    const updateMinion = updateInstanceInDatabase("minions", req.body);
    res.send(updateMinion);
});

minionsRouter.delete("/:minionId", (req, res) => {
    const deleteMinion = deleteFromDatabasebyId("minions", req.params.minionId);
    if (deleteMinion) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

minionsRouter.param('workId', (req, res, next, id) => {
    const minionId = Number(id);
    const work = getFromDatabaseById('work', minionId);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/:minionId/work', (req, res) => {
    const work = getAllFromDatabase('work').filter(work => work.minionId === req.params.minionId);
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
    const deleteWork = deleteFromDatabasebyId('work', req.params.workId);
    if(deleteWork) {
        res.status(204);
    } else {
        res.status(404);
    }
    res.send();
})