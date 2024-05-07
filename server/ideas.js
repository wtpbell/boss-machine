const ideasRouter = require("express").Router();
module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require("./db");

const checkMillionDollarIdea = require("./checkMillionDollarIdea");


ideasRouter.param("ideaId", (req, res, next, id) => {
    const idea = getFromDatabaseById("ideas", id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get("/", (req, res, next) => {
    res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
    const ideaAdd = addToDatabase("ideas", req.body);
    res.status(201).send(ideaAdd);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
    const updateIdea = updateInstanceInDatabase("ideas", req.body);
    res.send(updateIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
    const deleteIdea = deleteFromDatabasebyId("ideas", req.params.ideaId);
    if (deleteIdea) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});
