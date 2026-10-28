const Message = require('../models/Message');
const { getDBStatus } = require('../config/db');
const { sendContactNotification } = require('../config/mailer');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public (Rate-limited)
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress || '';
    const dbStatus = getDBStatus();

    let savedMessage = null;

    if (dbStatus.connected) {
      savedMessage = await Message.create({
        name,
        email,
        subject: subject || 'Portfolio Contact Inquiry',
        message,
        ipAddress,
      });
    }

    // Attempt to send email notification
    let emailResult = null;
    try {
      emailResult = await sendContactNotification({
        name,
        email,
        subject: subject || 'Portfolio Contact Inquiry',
        message,
      });
    } catch (mailErr) {
      console.error('⚠️ [Contact] Mail notification failed:', mailErr.message);
      // We do not fail the request if the email dispatch failed, since the message was recorded
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received successfully.',
      data: {
        id: savedMessage ? savedMessage._id : `msg-${Date.now()}`,
        name,
        email,
        sentAt: new Date().toISOString(),
        emailDelivered: Boolean(emailResult),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact
// @access  Protected (Admin only)
const getContactMessages = async (req, res, next) => {
  try {
    const dbStatus = getDBStatus();

    if (dbStatus.connected) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
      });
    }

    return res.status(200).json({
      success: true,
      count: 0,
      data: [],
      message: 'MongoDB is running in memory fallback mode.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactForm,
  getContactMessages,
};

