const express = require('express')
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Song, Album, User, Composer } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSong = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a track title.'),
  // check('song')
  // .exists({ checkFalsy: true })
  // .withMessage('Please select a song to upload.'),
  handleValidationErrors,
];


// create song
router.post(
  '/new',
  requireAuth,
  singleMulterUpload("song"),
  validateSong,
  asyncHandler(async (req, res) => {
    const { title, albumId, composerId, firstName, lastName, description } = req.body;
    const songUrl = await singlePublicFileUpload(req.file);
    console.log("-------------------", composerId)
    const composerData = composerId ? {composerId} : {Composer: {firstName, lastName}};

    const songData = {
      title,
      songUrl,
      description,
      albumId,
      ...composerData,
    }

    const song = await Song.create(songData, {
      include: [Composer]
    });


    return res.json({song});

  }),
);

// access a single song
router.get('/:id(\\d+)', asyncHandler(async function(req, res) {
  const song = await Song.findByPk(req.params.id, {
    include: [Album, Composer]
  });
  return res.json({song});
}));

// update a single song
router.patch(
  '/:id(\\d+)',
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
router.get('/user/:id(\\d+)',
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
