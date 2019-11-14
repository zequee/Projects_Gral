const Assignment = require("../models/assignments");
const controller = {};


//add
controller.save = async (req, res) => {
  const assignment = new Assignment({
    vehicleAssign: req.body.data.id,
    assignUser: req.body.data.selectedValue.value, 
    store:req.body.data.store, 
    userName:req.body.data.userName,
    userID: req.body.data.userID,
    startDate: new Date(),
    endDate:null
  });
  try {
    console.log("assignment controller",assignment);
    await assignment.save();
    res.json({ status: "assignment Saved" });
  } catch (error) {
    console.log(error);
    res.status(500).send("the assignment was not added");
  }
};

controller.listAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).send("the assignments is not found");
  }
};

controller.UpdateEndDateAssignment = async (req, res) => {
  const updateEndDateAssignment = {
    endDate:new Date()
  };
  try {
    await Assignment.findOneAndUpdate({ _id: req.params.id }, updateEndDateAssignment);
    res.json({ status: "End Date Assignments Updated" });
  } catch (error) {
    res.status(500).send("The End Date Assignments was not updated");
  }
};

module.exports = controller;