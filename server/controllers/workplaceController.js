const Workplace = require("../models/Workplace");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const { updateUserWithWorkplace } = require("./userController");

// @route         GET /api/user/workplace/:id
// @description   Get workplace
// @access        Private
const getWorkplace = asyncHandler(async (req, res, next) => {
  const workplace = await Workplace.findById(req.params.id);

  if (workplace) {
    res.json({
      ...workplace._doc,
    });
  } else {
    return next(new ErrorHandler("Invalid", 401));
  }
});

// @route         POST /api/user/workplace/:userId
// @description   Create workplace
// @access        Private
const createWorkplace = asyncHandler(async (req, res, next) => {
  const workplaceExists = await Workplace.find({
    workplaceName: req.body.workplaceName,
  });
  if (workplaceExists.length !== 0) {
    return next(new ErrorHandler("Workplace already exists.", 400));
  }

  const workplace = new Workplace({
    ...req.body,
    userId: req.body.userId,
    schemaVersion: "1.0.0",
  });

  const createdWorkplace = await workplace.save();
  updateUserWithWorkplace({
    params: {
      userId: req.body.userId,
      workplaceId: createdWorkplace._id,
      workplaceName: createdWorkplace.workplaceName,
    },
  });

  res.status(201).json(createdWorkplace);
});

// @route         PATCH /api/user/workplace/:id
// @description   Update workplace
// @access        Private
const updateWorkplace = asyncHandler(async (req, res, next) => {
  const { workplaceName, collections, favorites } = req.body;
  const workplace = await Workplace.findById(req.params.id);

  if (workplace) {
    workplace.workplaceName = workplaceName || workplace.workplaceName;
    workplace.collections = collections
      ? [...workplace.collections, ...collections]
      : workplace.collections;
    workplace.favorites = favorites
      ? [...workplace.favorites, ...favorites]
      : workplace.favorites;

    const updatedWorkplace = await workplace.save();
    res.json(updatedWorkplace);
  } else {
    return next(new ErrorHandler("Profile not found.", 404));
  }
});

// @route         Delete /api/workplace/:id
// @description   Delete workplace
// @access        Private
const deleteWorkplace = asyncHandler(async (req, res, next) => {
  const workplace = await Workplace.findById(req.params.id);

  if (workplace) {
    await workplace.remove();
    res.json({ message: "Workplace removed" });
  } else {
    return next(new ErrorHandler("Workplace not found.", 404));
  }
});

module.exports = {
  getWorkplace,
  createWorkplace,
  updateWorkplace,
  deleteWorkplace,
};
