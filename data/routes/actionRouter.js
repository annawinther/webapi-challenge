const express = require('express');
const actionDb = require('../helpers/actionModel');
const projectDb = require('../helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await actionDb.get();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'error getting all users'})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const action = await actionDb.get(id)
        res.status(200).json(action);  
    } catch (error){
        res.status(500).json({ message: 'error getting post with that id'})
    }
})


module.exports = router;