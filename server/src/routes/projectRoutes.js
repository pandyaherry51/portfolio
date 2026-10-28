const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { validateProject, validateUpdateProject } = require('../middleware/validationMiddleware');

router.route('/')
  .get(getProjects)
  .post(protect, validateProject, createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, validateUpdateProject, updateProject)
  .delete(protect, deleteProject);

module.exports = router;

