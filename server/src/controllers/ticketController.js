const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      entityType,
      entityName,
      units,
      creatorEmail
    } = req.body;

    // Find or create user
    let user = await User.findOne({ email: creatorEmail });
    if (!user) {
      const password = Math.random().toString(36).slice(-8);
      user = new User({
        email: creatorEmail,
        password: await bcrypt.hash(password, 10),
        role: 'user'
      });
      await user.save();
      // TODO: Send email with credentials
    }

    const ticket = new Ticket({
      title,
      description,
      creator: user._id,
      entity: {
        type: entityType,
        name: entityName
      },
      units
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const { status, assignedTo } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;

    const tickets = await Ticket.find(query)
      .populate('creator', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email')
      .sort('-createdAt');

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addResponse = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { content, authorId } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.responses.push({
      content,
      author: authorId
    });
    ticket.updatedAt = Date.now();

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};