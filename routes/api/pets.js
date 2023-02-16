const express = require('express');
const router = express.Router();

const currentUser = require('../../middlwares/auth');
const {
  validateBody,
  tryCatchWrapper,
  HttpError,
} = require('../../helpers/index');
const { petValidation } = require('../../validate/index');
const {
  addPet,
  getPetById,
  removePet,
  listPets,
  updatePet,
  updatePetAvatar,
} = require('../../controllers/pets');
const { upload } = require('../../middlwares/avatar');

router.post(
  '/',
  currentUser,
  validateBody(petValidation),
  tryCatchWrapper(async (req, res, next) => {
    res.status(201).json(await addPet(req));
  }),
);

router.delete(
  '/:petId',
  currentUser,
  tryCatchWrapper(async (req, res, next) => {
    const petById = req.params.petId;
    const searchedPet = await getPetById(petById);

    if (!searchedPet) {
      return next(HttpError(404, `Pet with id ${petById} can't be found`));
    }

    await removePet(petById);
    res.status(200).json({ message: 'Successful Operation' });
  }),
);

router.get(
  '/:petId',
  currentUser,
  tryCatchWrapper(async (req, res, next) => {
    const searchedPet = await getPetById(req.params.petId);
    if (!searchedPet) {
      return next(
        HttpError(404, `Pet with id ${req.params.petId} can't be found`),
      );
    }
    res.status(200).json(searchedPet);
  }),
);

router.get(
  '/',
  currentUser,
  tryCatchWrapper(async (req, res, next) => {
    res.status(200).json(await listPets(req, res));
  }),
);

router.put('/:petId/update', currentUser, tryCatchWrapper(updatePet));

router.patch('/avatars/:petId',   currentUser, upload.single('avatar'),
tryCatchWrapper(updatePetAvatar) )

module.exports = router;
