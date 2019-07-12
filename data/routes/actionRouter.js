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
        if(action){
            res.status(200).json(action);  
        } else{
            res.status(404).json({ message: 'action with that id not found'})
        }
    } catch (error){
        res.status(500).json({ message: 'error getting action with that id'})
    }
})

router.post('/', async (req, res) => {
    const {project_id, description, notes, completed} = req.body;
    if (!project_id) {
        res.status(400).json({error: `Need to Provide Project Id`})
    } else if (!description.substr(1,128)) {
        res.status(400).json({error: `Need to Provide Description Less than 128 Characters`})
    } else if (!notes) {
        res.status(400).json({error: `Need to Provide Notes`})
    } else {
        actionDb
        .insert({project_id, description, notes, completed})
        .then(newAction => {
            res.status(200).json(newAction)
        })
        .catch(() => {
            res.status(500).json({error: `Could Not Add New Action`})
        })
    }
    // const actionData = req.body;
    // const {project_id, description, notes, completed} = req.body;
    // try {
    //     const action = await actionDb.insert({ project_id, description, notes, completed });
    //     if (!project_id) {
    //         res.status(400).json({error: `Need to Provide Project Id`})
    //     } else if (!description) {
    //         res.status(400).json({error: `Need to Provide Description Less than 128 Characters`})
    //     } else if (!notes) {
    //         res.status(400).json({error: `Need to Provide Notes`})
    //     } else {
    //         res.status(201).json(actionData)
    //     }
        // if(!actionData){
        //     res.status(400).json({ message: 'missing body of request'})
        // } else {
        //     res.status(201).json(actionData)
        // }
    // } catch (error) {
    //     res.status(500).json({
    //         message: 'Error adding the new action',
    //       });
    // }
}) 

module.exports = router;