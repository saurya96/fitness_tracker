const express = require('express');
const { body } = require('express-validator');
const {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge
} = require('../controllers/challengeController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validate');

const router = express.Router();

const patchChallengeValidationRules = [
  body('title').optional().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description').optional().trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('target').optional().isInt({ min: 1 }).withMessage('Target must be a number greater than 0'),
  body('unit').optional().trim().notEmpty().withMessage('Unit cannot be empty'),
  body('status').optional().isIn(['planned', 'active', 'completed']).withMessage('Status must be planned, active, or completed'),
  body('progress').optional().isInt({ min: 0 }).withMessage('Progress cannot be negative'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid date')
];

const putChallengeValidationRules = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('target').isInt({ min: 1 }).withMessage('Target must be a number greater than 0'),
  body('unit').trim().notEmpty().withMessage('Unit is required'),
  body('status').optional().isIn(['planned', 'active', 'completed']).withMessage('Status must be planned, active, or completed'),
  body('progress').optional().isInt({ min: 0 }).withMessage('Progress cannot be negative'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid date')
];

router.use(protect);

router.post(
  '/',
  [
    body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
    body('target').isInt({ min: 1 }).withMessage('Target must be a number greater than 0'),
    body('unit').trim().notEmpty().withMessage('Unit is required')
  ],
  validateRequest,
  createChallenge
);

router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.patch('/:id', patchChallengeValidationRules, validateRequest, updateChallenge);
router.put('/:id', putChallengeValidationRules, validateRequest, updateChallenge);
router.delete('/:id', deleteChallenge);

module.exports = router;
