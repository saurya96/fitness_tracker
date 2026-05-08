const Challenge = require('../models/Challenge');

const buildChallengeFilter = (query, userId) => {
  const filter = { createdBy: userId };

  if (query.status) {
    filter.status = query.status;
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } }
    ];
  }

  return filter;
};

const createChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.create({
      ...req.body,
      createdBy: req.user._id
    });

    return res.status(201).json({
      message: 'Challenge created successfully',
      challenge
    });
  } catch (error) {
    next(error);
  }
};

const getChallenges = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    const filter = buildChallengeFilter(req.query, req.user._id);
    const sortOrder = order === 'asc' ? 1 : -1;

    const challenges = await Challenge.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Challenge.countDocuments(filter);

    return res.status(200).json({
      message: 'Challenges fetched successfully',
      total,
      page: Number(page),
      limit: Number(limit),
      challenges
    });
  } catch (error) {
    next(error);
  }
};

const getChallengeById = async (req, res, next) => {
  try {
    const challenge = await Challenge.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(200).json({
      message: 'Challenge fetched successfully',
      challenge
    });
  } catch (error) {
    next(error);
  }
};

const updateChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(200).json({
      message: 'Challenge updated successfully',
      challenge
    });
  } catch (error) {
    next(error);
  }
};

const deleteChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(200).json({
      message: 'Challenge deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge
};
