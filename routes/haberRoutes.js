const express = require("express");
const router = express.Router();

const {
  getAllHabers,
  createHaberImage,
  createHaber,
  updateHaber,
  deleteHaber,
} = require("../controllers/haberController");

router.route("/").get(getAllHabers).post(createHaber);
router.route("/image").post(createHaberImage);
router.route("/:id").put(updateHaber).delete(deleteHaber);

module.exports = router;
