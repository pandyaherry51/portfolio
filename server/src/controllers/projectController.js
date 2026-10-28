const Project = require('../models/Project');
const { getDBStatus } = require('../config/db');
const defaultProjects = require('../utils/defaultProjects');

// In-memory cache for dynamic changes when running in fallback mode
let memoryProjects = [...defaultProjects];

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (featured !== undefined) {
        query.featured = featured === 'true';
      }

      let projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

      // If DB is connected but empty, serve defaults
      if (projects.length === 0 && !category) {
        projects = memoryProjects;
      }

      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
        source: 'database',
      });
    }

    // Fallback mode
    let filtered = [...memoryProjects];
    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (featured !== undefined) {
      filtered = filtered.filter((p) => p.featured === (featured === 'true'));
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
      source: 'fallback_cache',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project by ID or slug
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);
      const query = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id };

      const project = await Project.findOne(query);
      if (project) {
        return res.status(200).json({
          success: true,
          data: project,
        });
      }
    }

    // Check memory fallback
    const project = memoryProjects.find((p) => p._id === id || p.slug === id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with identifier '${id}'`,
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Protected (Admin only)
const createProject = async (req, res, next) => {
  try {
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const project = await Project.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project,
      });
    }

    // Memory fallback create
    const newProject = {
      _id: `mem-${Date.now()}`,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryProjects.unshift(newProject);

    return res.status(201).json({
      success: true,
      message: 'Project created in memory mode (connect MongoDB for persistent storage)',
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Protected (Admin only)
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found to update',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: project,
      });
    }

    // Memory fallback update
    const index = memoryProjects.findIndex((p) => p._id === id || p.slug === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found in memory store',
      });
    }

    memoryProjects[index] = {
      ...memoryProjects[index],
      ...req.body,
      updatedAt: new Date(),
    };

    return res.status(200).json({
      success: true,
      message: 'Project updated in memory mode',
      data: memoryProjects[index],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Protected (Admin only)
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found to delete',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
      });
    }

    // Memory fallback delete
    const index = memoryProjects.findIndex((p) => p._id === id || p.slug === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found in memory store',
      });
    }

    memoryProjects.splice(index, 1);
    return res.status(200).json({
      success: true,
      message: 'Project deleted from memory store',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};

