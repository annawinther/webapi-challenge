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




module.exports = router;