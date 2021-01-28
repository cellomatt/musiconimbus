const express = require('express')
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Album, Song, Composer } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an album title.'),
  check('releaseDate')
    .exists({ checkFalsy: true })
    .isLength({ min:4, max:4 })
    .isInt({ min: 1890 })
    .withMessage('Please enter a valid year.'),
  handleValidationErrors,
];

// create album
router.post(
  '/new',
  requireAuth,
  // singleMulterUpload("image"),
  // validateAlbum,
  asyncHandler(async (req, res) => {
    console.log("------------", req.body)
    const { title, artistId, releaseDate, description } = req.body;
    if (req.file) {
    const imageUrl = await singlePublicFileUpload(req.file);
    const album = await Album.create({ title, artistId, releaseDate, imageUrl, description });
    } else {
      const album = await Album.create({ title, artistId, releaseDate, description });
    }

    return res.json({
      album,
    });
  }),
);

// access a single album
router.get('/:id', asyncHandler(async function(req, res) {
  const album = await Album.findByPk(req.params.id);
  return res.json(album);
}));

// update a single album
router.patch(
  '/:id',
  validateAlbum,
  asyncHandler(async function (req, res) {
    const album = await Album.findByPk(req.params.id)
    if (req.file) {
      const imageUrl = await singlePublicFileUpload(req.file);
      req.body.imageUrl = imageUrl;
    }
    await album.update(req.body);
    return res.json({album});
  })
);

// access all of a user's albums
router.get('/user/:id',
  requireAuth,
  asyncHandler(async function (req, res) {
    const albums = await Album.findAll({
      where: { artistId: req.params.id },
      include: {
        model: Song,
        include: Composer
      }
    })
    return res.json({albums})
  })
)

module.exports = router;
