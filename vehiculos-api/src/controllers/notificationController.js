const Notification = require("../models/vehicleNotifications");
const controller = {};
var multer = require("multer");
const path = require("path");
var fs = require("fs");

//set storage engine
var storage = multer.diskStorage({
  destination: "./public/ImagesNotifications/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
//add
controller.save = async (req, res) => {
  var upload = multer({ storage: storage }).array("images", 5);
  var ph = "";
  var nph = "";
  upload(req, res, async err => {
    const notifications = new Notification({
      vehicleAssign: req.body.id,
      notification: req.body.notification,
      type: req.body.selectedValueNotification,
      startDate: new Date(),
      endDate: null,
      userName: req.body.userName,
      userID: req.body.userID,
      // images: req.files.map(a => {
      //   // console.log("TT: ", a.path.replace(/\\/g, "/"));
      //   return a.path.replace(/\\/g, "/");
      // })
      images: req.files.map(a => {
        console.log("nph: ", nph);
        ph = a.path.replace(/\\/g, "/");
        nph = ph.replace("public", "");
        return nph;
      })
    });

    try {
      console.log("notifications", notifications);
      await notifications.save();
      res.json({ status: "notification Saved" });
    } catch (error) {
      console.log(error);
      res.status(500).send("the notification was not added");
    }
  });
};

controller.listNotifications = async (req, res) => {
  try {
    // console.log("llegue al controller get notifications");
    const notification = await Notification.find();
    res.json(notification);
  } catch (error) {
    res.status(500).send("the notifications is not found");
  }
};

//Find Notification (EDIT)
controller.findNotifications = async (req, res) => {
  try {
    console.log("notification", req.params.id);
    const notification = await Notification.findById(req.params.id);
    // console.log("edit back vehicle",vehicle);
    res.json(notification);
  } catch (error) {
    res.status(500).send("the notification is not found");
  }
};

//update Notification
controller.updateNotification = async (req, res) => {
  const notifi = {
    notification: req.body.notification
  };
  try {
    // console.log("llegue al controller update notification",notifi);
    // console.log(req.params.id);
    await Notification.findByIdAndUpdate(req.params.id, notifi);
    res.json({ status: "Notification Updated" });
  } catch (error) {
    res.status(500).send("The notification was not updated");
  }
};

// delete notification
controller.deleteNotification = async (req, res) => {
  const newNotifi = {
    endDate: new Date()
  };
  try {
    console.log("controller delete", req.params.id);
    await Notification.findOneAndUpdate({ _id: req.params.id }, newNotifi);
    res.json({ status: "Notification Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("The notification was not deleted");
  }
};

// delete Image
controller.deleteImageNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    for (var i = 0; i < notification.images.length; i += 1) {
      if (
        notification.images[i].replace("/ImagesNotifications/", "") ===
        req.params.imageID
      ) {
        // console.log("En el índice '" + i + "' hay este valor: " + notification.images[i].replace("/ImagesNotifications/",""));

        fs.unlink(
          "./public/ImagesNotifications/" +
            notification.images[i].replace("/ImagesNotifications/", "")
        );
        notification.images.splice(i, 1);
        // console.log("a", notification.images);
        const notifi = {
          images: notification.images
        };
        await Notification.findByIdAndUpdate(req.params.id, notifi);
      }
    }

    res.json({ status: "Image Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("The image was not deleted");
  }
};

//ADD IMAGE (EDIT NOTIFICATION)
controller.addImageNotification = async (req, res) => {
  var upload = multer({ storage: storage }).array("images", 5);
  var ph = "";
  var nph = "";
  upload(req, res, async err => {
    const noti = new Notification({
      images: req.files.map(a => {
        ph = a.path.replace(/\\/g, "/");
        nph = ph.replace("public", "");
        // console.log("ph: ", ph);
        // console.log("nph: ", nph);
        return nph;
      })
    });
    // console.log("controller noti", noti.images);
    try {
      const notification = await Notification.findById(req.params.id);
      notification.images.push(noti.images.toString());
      const notifi = {
        images: notification.images
      };
      //en la respuesta de axios devuelve las imagenes viejas y las nuevas {new: true}
      const resp = await Notification.findByIdAndUpdate(req.params.id, notifi, {
        new: true
      });
      // res.json({ status: "images Saved" });
      res.json(resp);
    } catch (error) {
      console.log(error);
      res.status(500).send("the images was not added");
    }
  });
};

module.exports = controller;
