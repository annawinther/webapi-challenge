const express = require('express');
const actionDb = require('../helpers/actionModel');
const projectDb = require('../helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await actionDb.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: 'Error getting all actions' })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const action = await actionDb.get(id)
        if(action){
            res.status(200).json(action)  
        } else{
            res.status(404).json({ message: 'The action with that id not found' })
        }
    } catch (error){
        res.status(500).json({ message: 'Error getting action with that id' })
    }
})

router.post('/', async (req, res) => {
    const actionData = req.body;
    // const project_id = req.params.id;
    try {
        const newAction = await actionDb.insert(actionData);
        if(!actionData.project_id){
            res.status(400).json({ message: 'please add action to an existing project' })
        } 
        else {
            res.status(201).json(newAction)
        }
    } catch (error) {
        res.status(500).json({
             message: 'Error adding the action to this project. Make sure to add to an existing project'
             });
    }
        // const project = await projectDb.get(project_id);
        // if(!project){
        //     res.status(400).json({ message: 'please add action to an existing project'})
        // }
        // const newAction = await actionDb.insert(actionData)
        
        // else if(!description) {
        //     res.status(400).json({ message: 'please add descriptionto action'})
        // } else if(!notes){
        //     res.status(400).json({ message: 'please add a note to actiont'})
        // } 
        
        // const id = req.params.id;
    // const description = req.body.description;
    // // const notes = req.body.notes;
    // try {
    //   const project = await projectDb.get(id);
    //   if (!project) {
    //     return res.status(404).json({
    //       message: "Project does not exist"
    //     });
    //   }
    // //   if(!description){
    // //     return res.status(400).json({
    // //         message: "dscription is required"
    // //       });
    // //   }
    // //   if (!notes) {
    // //     res.status(400).json({
    // //       message: "Text is required"
    // //     });
    //    else {
    //     const newAction = await actionDb.insert({
    //       project_id: id,
    //       description,
    //     //   notes,
    //     });
    //     res.status(201).json(newAction);
    //   }
    // } catch (err) {
    //   res.status(500).json({
    //     message: err.toString()
    //   });
    // }
}); 

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await actionDb.remove(id);
        if( count > 0 ){
            res.status(200).json({ message: `Action with id ${id} has been deleted `})
        } else {
            res.status(404).json({ message: 'The action with that id could not be found' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error removing the action',
          });
    }
});

router.put('/:id', async (req, res) => {
    const actionData = req.body;
    const { id } = req.params;

    try {
        const action = await actionDb.update(id, actionData);
        if(action) {
            res.status(200).json(actionData)
        } else {
            res.status(404).json({ message: 'The action could not be found' });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Error updating the action',
          });
    }
});


    


module.exports = router;