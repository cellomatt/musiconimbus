const express = require('express')
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Song, Album, User, Composer } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateComposer = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name.'),
  handleValidationErrors,
];

const router = express.Router();

// create composer
router.post(
  '/new',
  requireAuth,
  validateComposer,
  asyncHandler(async (req, res) => {
    const { firstName, lastName } = req.body;
    const composer = await Composer.create({ firstName, lastName});

    return res.json({composer});

  }),
);

// get all composers
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const composers = await Composer.findAll();
    return res.json({composers});
  }),
)

module.exports = router;
