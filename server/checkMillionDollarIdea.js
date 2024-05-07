const checkMillionDollarIdea = (req, res, next) => {
    const {weeklyRevenue, numWeeks} = req.body;
    const totalVal = Number(weeklyRevenue) * Number(numWeeks);
    if(!weeklyRevenue || !numWeeks || isNaN(totalVal) || totalVal < 1000000) {
        res.status(400).send()
    } else {
        next();
    }
};

module.exports = checkMillionDollarIdea;
