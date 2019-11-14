const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    vehicleAssign: { type: String, required: true },
    assignUser: { type: String, required: true },
    store: { type: String, required: true },
    startDate: { type: String, required: false },
    endDate: { type: String, required: false }, 
    userName:{ type: String, required: true },
    userID: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("assignments", TaskSchema);
