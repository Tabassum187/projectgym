const express = require('express');
const router = express.Router();
const Support = require('../Models/Support');
const { body, validationResult } = require('express-validator');

// POST - submit new support feedback/complaint
router.post('/', 
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Validation failed',
          details: errors.array(),
          receivedData: req.body
        });
      }

      const { name, email, message } = req.body;

      // Create new support ticket
      const newSupport = new Support({
        name,
        email,
        message
      });

      // Save to database
      const savedTicket = await newSupport.save();
      
      // Emit socket event if you want real-time updates
      req.app.get('io').emit('new_support_ticket', savedTicket);

      res.status(201).json({ 
        success: true,
        message: 'Feedback submitted successfully', 
        data: {
          id: savedTicket._id,
          name: savedTicket.name,
          email: savedTicket.email,
          createdAt: savedTicket.createdAt
        }
      });

    } catch (err) {
      console.error('Support submission error:', err);
      
      // Handle duplicate submissions or other DB errors
      if (err.code === 11000) {
        return res.status(400).json({ 
          error: 'Duplicate submission detected',
          details: 'This feedback appears to have been submitted already'
        });
      }

      res.status(500).json({ 
        error: 'Failed to save feedback',
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      });
    }
  }
);

// GET - get all support feedbacks (for admin panel)
router.get('/', async (req, res) => {
  try {
    // Add pagination and filtering in production
    const allFeedbacks = await Support.find()
      .sort({ createdAt: -1 })
      .select('-__v'); // exclude version key

    res.json({
      success: true,
      count: allFeedbacks.length,
      data: allFeedbacks
    });
  } catch (err) {
    console.error('Error fetching support feedbacks:', err);
    res.status(500).json({ 
      error: 'Failed to fetch support feedbacks',
      message: err.message
    });
  }
});

// GET - get single ticket by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ticket ID' });
    }

    const ticket = await Support.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({
      success: true,
      data: ticket
    });
  } catch (err) {
    console.error('Error fetching ticket:', err);
    res.status(500).json({ 
      error: 'Failed to fetch ticket',
      message: err.message
    });
  }
});

module.exports = router;