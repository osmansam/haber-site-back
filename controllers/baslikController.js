const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Baslik = require("../models/Baslik");

//Get all Basliks
const getAllBasliks = async (req, res, next) => {
  const basliks = await Baslik.find();
  res.status(StatusCodes.OK).json({
    success: true,
    basliks,
  });
};

//create Baslik Image
const createBaslikImage = async (req, res) => {
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

//create Baslik
const createBaslik = async (req, res, next) => {
  const { type, title } = req.body;
  if (!type || !title) {
    throw new CustomError.BadRequestError("Please provide type and title");
  }
  const baslik = await Baslik.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    baslik,
  });
};

//update Baslik
const updateBaslik = async (req, res) => {
  const baslik = await Baslik.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!baslik) {
    throw new CustomError.NotFoundError("Haber not found");
  }
  res.status(StatusCodes.OK).json({
    baslik,
  });
};

//delete Baslik
const deleteBaslik = async (req, res) => {
  const baslik = await Baslik.findOneAndDelete({ _id: req.params.id });
  if (!baslik) {
    throw new CustomError.NotFoundError("Haber not found");
  }
  res.status(StatusCodes.OK).json({
    baslik,
  });
};

module.exports = {
  getAllBasliks,
  createBaslikImage,
  createBaslik,
  updateBaslik,
  deleteBaslik,
};

// Path: routes/baslikRoutes.js
