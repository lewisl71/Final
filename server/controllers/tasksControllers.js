
const Task = require('../models/Task');

exports.getAll = async (req,res) => {
    try{
        const tasks = await Task.find().sort({createdAt: -1});
        res.json(tasks);


    }catch (e) {res.status(500).json({error: e.message}); }
};

exports.create = async(req, res)=> {
    try{
        const task = new Task(req.body);
        res.status(201).json(await task.save());

    }
    catch (e) {res.status(400).json({error: e.message}); }
};

exports.update = async(req, res) => {
    try{
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updated);
    }
    catch(e){ res.status(400).json({error: e.message}); }
};

exports.remove = async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.json({message : "Deleted"});

    }
    catch(e) {res.status(400).json({error: e.message});}

};