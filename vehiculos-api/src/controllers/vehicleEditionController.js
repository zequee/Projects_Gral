const VehicleEdit = require("../models/vehicleEditions");
const controller = {};

//add
controller.save = async (req, res) => {
  vehicleEdit = new VehicleEdit({
    vehicleAssign: req.body.data._id,
    store: req.body.data.store,
    assign: req.body.data.assign,
    brand: req.body.data.brand,
    model: req.body.data.model,
    kmCurrent: req.body.data.kmCurrent,
    kmService: req.body.data.kmService,
    service: req.body.data.vtv,
    vtv: req.body.data.vtv,
    insurance: req.body.data.insurance,
    state: req.body.data.state,
    numberPlate: req.body.data.numberPlate,
    internalCode: req.body.data.internalCode,
    hoursWorked: req.body.data.hoursWorked,
    type: req.body.data.type,
    route: req.body.data.route,
    fireExtinguisher: req.body.data.fireExtinguisher,
    warranty: req.body.data.warranty,
    electronicTollCollection: req.body.data.electronicTollCollection,
    greenCard: req.body.data.greenCard,
    observation: req.body.data.observation,
    removeDate: req.body.data.removeDate,
    chassisNumber: req.body.data.chassisNumber,
    userName:req.body.data.userName,
    userID: req.body.data.userID,
  });

  try {
    console.log("llegue a vehicleEdition Controller", vehicleEdit);
    await vehicleEdit.save();
    res.json({ status: "Edition Saved" });
  } catch (error) {
    console.log(error);
    res.status(500).send("the Edition was not added");
  }
};

module.exports = controller;
