const express = require('express');
const actionDb = require('../helpers/actionModel');
const projectDb = require('../helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await actionDb.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: 'error getting all actions'})
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
    const actionData = req.body;
    try{
        const action = await actionDb.insert(actionData);
        res.status(201).json(actionData)
    } catch (error) {
        res.status(500).json({
            message: 'Error adding the user',
          });
    }
}); 

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await actionDb.remove(id);
        if( count > 0 ){
            res.status(200).json({ message: `post with id ${id} has been deleted `})
        } else {
            res.status(404).json({ message: 'The post with that id could not be found' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error removing the post',
          });
    }
});

router.put('/:id', async (req, res) => {
    const actionData = req.body;
    const id = req.params.id
    try {
        const action = await actionDb.update(id, actionData);
        if(action) {
            res.status(200).json(actionData)
        } else {
            res.status(404).json({ message: 'The hub could not be found' });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Error updating the hub',
          });
    }
});


    


module.exports = router;