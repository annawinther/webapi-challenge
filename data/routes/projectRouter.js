const express = require('express');
const actionDb = require('../helpers/actionModel');
const projectDb = require('../helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await projectDb.get();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'error getting all projects'})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const project = await projectDb.get(id)
        if(project){
            res.status(200).json(project);  
        } else{
            res.status(404).json({ message: 'project with that id not found'})
        }
    } catch (error){
        res.status(500).json({ message: 'error getting project with that id'})
    }
});


router.post('/', async (req, res) => {
    const projectData = req.body;
    try{
        const project = await projectDb.insert(projectData);
        res.status(201).json(projectData)
    } catch (error) {
        res.status(500).json({
            message: 'Error adding the project',
          });
    }
}); 


module.exports = router;