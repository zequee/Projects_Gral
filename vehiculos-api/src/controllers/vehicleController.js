const Vehicle = require("../models/vehicles");
const Assignment = require("../models/assignments");

const controller = {};
// var format = require('date-fns/format')

//add
controller.save = async (req, res) => {
  const assign = req.body.data.selectedValueAssign;
  // console.log("assign", assign.value);
  let vehicle = null;
  let assignment = null;
  
  if (assign != null) {
      vehicle = new Vehicle({
      store: req.body.data.selectedValueStore.value,
      assign: req.body.data.selectedValueAssign.value,
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
      chassisNumber:req.body.data.chassisNumber,
      hoursWorked: req.body.data.hoursWorked,
      type: req.body.data.type,
      route: req.body.data.route,
      fireExtinguisher: req.body.data.fireExtinguisher,
      warranty: req.body.data.warranty,
      electronicTollCollection: req.body.data.electronicTollCollection,
      greenCard: req.body.data.greenCard,
      observation: req.body.data.observation,
      removeDate: null
    });
  } else {
      vehicle = new Vehicle({
      store: req.body.data.selectedValueStore.value,
      assign: null,
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
      chassisNumber:req.body.data.chassisNumber,
      hoursWorked: req.body.data.hoursWorked,
      type: req.body.data.type,
      route: req.body.data.route,
      fireExtinguisher: req.body.data.fireExtinguisher,
      warranty: req.body.data.warranty,
      electronicTollCollection: req.body.data.electronicTollCollection,
      greenCard: req.body.data.greenCard,
      observation: req.body.data.observation,
      removeDate: null
    });
  }
  try {
    // console.log( format(new Date(vehicle.vtv),'DD/MM/YYYY'));
    // console.log("llegue al controller",vehicle);
      let saveVeh = await vehicle.save();
    // console.log("saveVeh", saveVeh);

    if (assign != null) {
        assignment = new Assignment({
        vehicleAssign: saveVeh._id,
        assignUser: req.body.data.selectedValueAssign.value,
        store: req.body.data.selectedValueStore.value,
        userName:req.body.data.userName,
        userID: req.body.data.userID,
        startDate: new Date(),
        endDate: null
      });
      try {
        await assignment.save();
        res.json({ status: "Assignment Saved" });
      } catch (error) {
        console.log(error);
        res.status(500).send("the vehicle was not added");
      }
    }

    res.json({ status: "Vehicle Saved" });
  } catch (error) {
    console.log(error);
    res.status(500).send("the vehicle was not added");
  }
};
//List Vehicles
controller.listVehicles = async (req, res) => {
  try {
    // console.log("LISTADO");
    const vehicle = await Vehicle.find(req.params.id);
    // console.log(vehicle);
    res.json(vehicle);
  } catch (error) {
    res.status(500).send("the vehicle is not found");
  }
};

//Find Vehicle
controller.FindVehicle = async (req, res) => {
  try {
    // console.log("vehicle",req.params.id);
    const vehicle = await Vehicle.findById(req.params.id);
    // console.log("edit back vehicle",vehicle);
    res.json(vehicle);
  } catch (error) {
    res.status(500).send("the vehicle is not found");
  }
};

//update Vehicle
controller.UpdateVehicle = async (req, res) => {
  const updateVehicle = {
    store: req.body.selectedValueStore.value,
    assign: req.body.selectedValueAssign.value,
    brand: req.body.brand,
    model: req.body.model,
    kmCurrent: req.body.kmCurrent,
    kmService: req.body.kmService,
    service: req.body.vtv,
    vtv: req.body.vtv,
    insurance: req.body.insurance,
    state: req.body.state,
    numberPlate: req.body.numberPlate,
    internalCode: req.body.internalCode,
    chassisNumber:req.body.chassisNumber,
    hoursWorked: req.body.hoursWorked,
    type: req.body.type,
    route: req.body.route,
    fireExtinguisher: req.body.fireExtinguisher,
    warranty: req.body.warranty,
    electronicTollCollection: req.body.electronicTollCollection,
    greenCard: req.body.greenCard,
    observation: req.body.observation,
    removeDate: req.body.removeDate
  };
  try {
    console.log("llegue al controller update vehicle",updateVehicle);
    // console.log(req.params.id);
    await Vehicle.findByIdAndUpdate(req.params.id, updateVehicle);
    res.json({ status: "Vehicle Updated" });
  } catch (error) {
    res.status(500).send("The vehicle was not updated");
  }
};

//update Assign Vehicle
controller.UpdateAssignVehicle = async (req, res) => {
  const updateAssignVehicle = {
    assign: req.body.selectedValue.value
  };
  try {
    // console.log("vehicle controller", { updateAssignVehicle });
    await Vehicle.findByIdAndUpdate(req.params.id, updateAssignVehicle);
    res.json({ status: "Assign User Updated" });
  } catch (error) {
    res.status(500).send("The Assign User was not updated");
  }
};

// delete
controller.delete = async (req, res) => {
  const newVehicle = {
    removeDate: new Date()
  };
  try {
    console.log("delete", req.params.id);
    // await Vehicle.findByIdAndRemove(req.params.id);
    await Vehicle.findOneAndUpdate({ _id: req.params.id }, newVehicle);
    res.json({ status: "Vehicle Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("The vehicle was not deleted");
  }
};

// var query = {'username':req.user.username};
// req.newData.username = req.user.username;
// MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){ if (err) return res.send(500, { error: err });
// return res.send("succesfully saved"); });
// controller.delete = (req,res) => {
//   const id = req.params.id;
//   req.getConnection((err,conn) => {
//       conn.query('delete from wharehouse where id_wh = ?',[id],(err, rows) =>{
//           res.redirect('/');
//       })
//   })
// };

module.exports = controller;

// router.get("/:id", async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find();
//     res.json(vehicles);
//   } catch (error) {
//     res.status(500).send("something is wrong!");
//   }
// });

//get a single vehicle
// router.get("/", async (req, res) => {
//   try {
//     alert('controller');
//     const vehicle = await Vehicle.findById(req.params.id);
//     res.json(vehicles);
//   } catch (error) {
//     res.status(500).send("the vehicle is not found");
//   }
// });
