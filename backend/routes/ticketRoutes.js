const express = require('express');
const router = express.Router();
const {
  getTickets,
  createTicket,
  getUserTicket,
  updateUserTicket,
  deleteUserTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTickets).post(protect, createTicket);
router
  .route('/:id')
  .get(protect, getUserTicket)
  .put(protect, updateUserTicket)
  .delete(protect, deleteUserTicket);

module.exports = router;
