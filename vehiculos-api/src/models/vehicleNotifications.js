const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    vehicleAssign: { type: String, required: true },
    notification: { type: String, required: true },
    type: { type: String, required: true },
    userName:{ type: String, required: true },
    userID: { type: String, required: true },
    startDate: { type: String, required: false },
    endDate: { type: String, required: false }, 
    images:  [{type: String, required: false}], 
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("vehicleNotifications", TaskSchema);