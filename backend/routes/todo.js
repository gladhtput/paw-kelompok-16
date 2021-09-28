const router = require('express').Router()
const Todo = require('../models/Todo')

router.get('/', async (req, res) => {
    const todos = await Todo.find({})
    res.send(todos)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id)
    res.send(todo);
})

router.post('/', async (req, res) => {
    const { desc, responsible, priority } = req.body
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newTodo = new Todo({ desc, responsible, priority, createdAt, updatedAt })
    try {
        await newTodo.save()
        res.send({
            message: 'todo added successfully',
            todo: newTodo
        })
    } catch(err) {
        res.send(err)
    }
})

router.put('/:id', async (req, res) => {
    const { desc, responsible, priority, completed } = req.body
    const { id } = req.params
    const updatedAt = new Date().toISOString()

    try {
        const newTodo = await Todo.findByIdAndUpdate(id, { desc, responsible, priority, completed, updatedAt })
        res.send({
            message: 'todo updated',
            todo: newTodo
        })
    } catch(err) {
        res.send(err)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedTodo = await Todo.findByIdAndRemove(id)
        res.send(deletedTodo)
    }
    catch(err) {
        res.send(err)
    }
})

router.put('/:id/finish', async (req, res) => {
    const { id } = req.params
    await Todo.findByIdAndUpdate(id, { completed: true })
    res.send('success')
})

module.exports = router