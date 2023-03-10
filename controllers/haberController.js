const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Haber = require("../models/Haber");

//Get all Habers
const getAllHabers = async (req, res, next) => {
  const habers = await Haber.find();
  res.status(StatusCodes.OK).json({
    success: true,
    habers,
  });
};
//create Haber Image
const createHaberImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "news-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

//create Haber
const createHaber = async (req, res, next) => {
  const { type, title } = req.body;
  if (!type || !title) {
    throw new CustomError.BadRequestError("Please provide type and title");
  }
  const haber = await Haber.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    haber,
  });
};

//update Haber
const updateHaber = async (req, res) => {
  const haber = await Haber.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!haber) {
    throw new CustomError.NotFoundError("Haber not found");
  }
  res.status(StatusCodes.OK).json({
    haber,
  });
};

//delete Haber
const deleteHaber = async (req, res) => {
  const haber = await Haber.findOneAndDelete({ _id: req.params.id });
  if (!haber) {
    throw new CustomError.NotFoundError("Haber not found");
  }
  res.status(StatusCodes.OK).json({
    haber,
  });
};

module.exports = {
  getAllHabers,
  createHaberImage,
  createHaber,
  updateHaber,
  deleteHaber,
};
