var mongoose = require("mongoose");
const Workplace = require("../models/Workplace");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

// @route         GET /api/user/workplace/:id
// @description   Get workplace
// @access        Private
const getWorkplace = asyncHandler(async (req, res, next) => {
  const workplace = await Workplace.findById(
    mongoose.Types.ObjectId(req.params.id)
  );

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

  const userId = req.params.userId === String ? mongoose.Types.ObjectId(req.params.userId) : req.params.userId;
  const workplace = new Workplace({
    ...req.body,
    userId: userId,
  });

  const createdWorkplace = await workplace.save();

  const user = await User.findById(
    userId
  ).select("-password");

  if (user) {
    const newWorkplace = {
      workplaceId: createdWorkplace._id,
      name: createdWorkplace.workplaceName,
    };
    user.workplacesIds = [...user.workplacesIds, newWorkplace];

    const updatedUser = await user.save();

    res.status(201).json({ createdWorkplace, updatedUser });
  } else {
    return next(new ErrorHandler("Cannot find user.", 404));
  }
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

    const user = await User.findById(
      mongoose.Types.ObjectId(workplace.userId)
    ).select("-password");
    const newWorkplaces = user.workplacesIds.map((nw) => {
      if (nw.workplaceId.equals(workplace._id)) {
        nw.name = workplaceName || nw.name;
      }
      return nw;
    });

    user.workplacesIds = newWorkplaces || user.workplacesIds;
    await user.save();

    res.json(updatedWorkplace);
  } else {
    return next(new ErrorHandler("Workplace not found.", 404));
  }
});

// @route         Delete /api/workplace/:id
// @description   Delete workplace
// @access        Private
const deleteWorkplace = asyncHandler(async (req, res, next) => {
  const workplace = await Workplace.findById(req.params.id);

  if (workplace) {
    await workplace.remove();

    const user = await User.findById(
      mongoose.Types.ObjectId(workplace.userId)
    ).select("-password");
    const newWorkplaces = user.workplacesIds.filter(
      (item) => !item.workplaceId.equals(workplace._id)
    );
    user.workplacesIds = newWorkplaces || user.workplacesIds;
    await user.save();

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
