const express = require("express");
const router = express.Router();
var multer = require("multer");
const path = require("path");
const notificationController = require("../controllers/notificationController");


router.post("/", notificationController.save);
router.get("/", notificationController.listNotifications);
router.get("/:id", notificationController.findNotifications);
router.post("/:id", notificationController.updateNotification);
router.delete("/:id", notificationController.deleteNotification);
router.delete("/:id/images/:imageID", notificationController.deleteImageNotification);
router.post("/:id/addImages/", notificationController.addImageNotification);

module.exports = router;
