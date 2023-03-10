const express = require("express");
const router = express.Router();

const {
  getAllBasliks,
  createBaslikImage,
  createBaslik,
  updateBaslik,
  deleteBaslik,
} = require("../controllers/baslikController");

router.route("/").get(getAllBasliks).post(createBaslik);
router.route("/image").post(createBaslikImage);
router.route("/:id").put(updateBaslik).delete(deleteBaslik);

module.exports = router;
