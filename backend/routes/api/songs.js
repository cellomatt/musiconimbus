const express = require('express')
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Song, Album, User, Composer } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a track title.'),
  handleValidationErrors,
];

const router = express.Router();

// create song
router.post(
  '/new',
  requireAuth,
  singleMulterUpload("song"),
  validateSong,
  asyncHandler(async (req, res) => {
    const { title, albumId, composerId, description } = req.body;
    const songUrl = await singlePublicFileUpload(req.file);
    const song = await Song.create({ title, albumId, composerId, songUrl, description });

    return res.json({song});

  }),
);

// access a single song
router.get('/:id', asyncHandler(async function(req, res) {
  const song = await Song.findByPk(req.params.id, {
    include: [Album, Composer]
  });
  return res.json({song});
}));

// update a single song
router.patch(
  '/:id',
  validateSong,
  asyncHandler(async function (req, res) {
    const song = await Song.findByPk(req.params.id)
    if (req.file) {
      const songUrl = await singlePublicFileUpload(req.file);
      req.body.songUrl = songUrl;
    }
    await song.update(req.body);
    return res.json({song});
  })
);

// access all of a user's songs
router.get('/user/:id',
  requireAuth,
  asyncHandler(async function (req, res) {
    const songs = await Song.findAll({
      where: { userId: req.params.id },
      include: [Album, Composer]
    })
    return res.json({songs})
  })
)



module.exports = router;
