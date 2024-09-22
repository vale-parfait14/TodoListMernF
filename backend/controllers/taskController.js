// backend/controllers/taskController.js
const Task = require('../models/Task');

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
  try {
    // Assurez-vous que title est présent dans le corps de la requête
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Créez la tâche avec le titre et l'utilisateur
    const task = await Task.create({
      title: req.body.title,
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/*
exports.createTask = async (req, res) => {
  const task = await Task.create({ title: req.body.title, user: req.user.id });
  res.status(201).json(task);
};
---------------------------
exports.createTask = async (req, res) => {
  try {
    // Assurez-vous que title est présent dans le corps de la requête
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Créez la tâche avec le titre et l'utilisateur
    const task = await Task.create({
      title: req.body.title,
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



*/

// Obtenir toutes les tâches de l'utilisateur
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  task.title = req.body.title;
  task.completed = req.body.completed;
  await task.save();
  res.json(task);
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await task.deleteOne()
  res.json({ message: 'Task removed' });
};
