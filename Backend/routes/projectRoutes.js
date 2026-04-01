const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/authMiddleware');
const upload = require('../config/upload'); // Import your Multer config

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST (Create) a new project - Handles the 'image' file upload
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // FormData sends arrays as a single comma-separated string, so we split it
    let processedTechStack = req.body.techStack;
    if (typeof req.body.techStack === 'string') {
      processedTechStack = req.body.techStack.split(',').map(s => s.trim());
    }

    const projectData = {
      title: req.body.title,
      description: req.body.description,
      techStack: processedTechStack,
      githubLink: req.body.githubLink,
      liveLink: req.body.liveLink,
      // If a file was uploaded, save the local path to the database
      image: req.file ? `/uploads/${req.file.filename}` : '' 
    };

    const newProject = new Project(projectData);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) { 
    console.error("Project Upload Error:", err);
    res.status(400).json({ message: err.message }); 
  }
});

// PUT (Update) a project
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    // Parse techStack if updated
    if (typeof req.body.techStack === 'string') {
      updateData.techStack = req.body.techStack.split(',').map(s => s.trim());
    }

    // Update image path only if a new file is uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProject);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// DELETE a project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;




