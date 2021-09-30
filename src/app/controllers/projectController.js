const express = require('express');
const authMiddleware = require('../middlewares/auth'); //middleware

const Project = require('../models/project');
const Task = require('../models/task');

const router = express.Router();

router.use(authMiddleware);

//lists all projects
router.get('/', async (req, res) =>{
    try{
        //bringing all projects from the database
        const projects = await Project.find().populate(['user', 'tasks']);

        return res.send({ projects });
    }
    catch (err){
        return res.status(400).send({ error: 'Error loading projects'})
    }
});

//show a specific project
router.get('/:projectId', async (req, res) => {
    try{
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

        return res.send({ project });
    }
    catch (err){
        return res.status(400).send({ error: 'Error loading projects'})
    }
})

//create a project
router.post('/', async (req, res) => {
    try{
        const { title, description, tasks } = req.body;

        //creating a new project
        const project = await Project.create({ title, description, user: req.userId });

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });  //creating new task

            await projectTask.save();  //saving the task

            project.tasks.push(projectTask);  //pushing tasks in the project
        }));

        await project.save();

        return res.send({ project });
    }
    catch (err){
        return res.status(400).send({ error: 'Error creating new project'})
    }
})

//update a project
router.put('/:projectId', async (req, res) => {
    try{
        const { title, description, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
            description,
        }, {new: true});


        project.tasks = [];

        await Task.remove({ project: project._id })

        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });

            await projectTask.save();

            project.tasks.push(projectTask);
        }));

        await project.save();

        return res.send({ project });
    }
    catch (err){
        return res.status(400).send({ error: 'Error updating project'})
    }
})

//delete a project
router.delete('/:projectId', async (req, res) => {
    try{
        await Project.findByIdAndRemove(req.params.projectId);

        return res.send();
    }
    catch (err){
        return res.status(400).send({ error: 'Error deleting projects'})
    }
})

module.exports = app => app.use('/projects', router);
