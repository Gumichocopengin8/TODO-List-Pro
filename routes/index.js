const express = require('express');
const router = express.Router();
const Task = require('../modules/mongodb.js');


// show the tasks
router.get('/', function (req, res) {
    Task.find({}, function (err, tasks) {
        res.render('index', {
            tab_title: 'TODO List',
            title: 'Home',
            csrfToken: req.csrfToken(),
            tasks: tasks,
        })
    })
});

// add task
router.get('/add', function (req, res) {
    res.render('add', {
        tab_title: 'TODO List: Add Task',
        title: 'Add Task',
        csrfToken: req.csrfToken(),
    })
});

// create task
// after the add function, create task on database
router.post('/create', function (req, res) {
    const task = new Task();
    task.title = req.body.title;
    task.task = req.body.task;
    task.status = req.body.status;
    task.priority_level = req.body.priority_level;
    task.save(function (err) {
        if(!err){ // if not error
            console.log('MESSAGE: success create');
            res.redirect('/');
        } else { // if there's error
            console.log('MESSAGE: create error', err);
            req.flash('MESSAGE: ', err.errors);
            res.redirect('/add');
        }
    })
});

// edit task
router.get('/edit/:id', function (req, res, next) {
    Task.findById(req.params.id, function (err, task) {
        if(err) {
            console.log('MESSAGE: edit error');
            return next();
        }
        res.render('edit', {
            tab_title: 'TODO List: Edit Task',
            title: 'Edit Task',
            csrfToken: req.csrfToken(),
            task: task
        })
    })
});

// update task
// after the edit function, update task on database
router.put('/update', function (req, res, next) {
    Task.findById(req.body._id, function (err, task) {
        if(err) // if error
            return next();
        task.title  = req.body.title;
        task.task = req.body.task;
        task.status = req.body.status;
        task.priority_level = req.body.priority_level;
        task.updated = Date.now();
        task.save(function (err) {
            if(!err){ // if not error
                console.log('MESSAGE: success update');
                res.redirect('/');
            } else{ // if error
                console.log('MESSAGE: update error', err);
                req.flash('error', err.errors);
                res.redirect('/edit/' + req.body._id);
            }
        })
    })
});

// delete task
router.delete('/delete', function (req, res, next) {
    Task.findById(req.body._id, function (err, task) {
        if(err) { // if error
            console.log('MESSAGE: delete error', err);
            return next();
        }
        console.log('MESSAGE: success delete');
        task.remove();
        res.redirect('/');
    })
});


module.exports = router;
