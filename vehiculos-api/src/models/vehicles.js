const mongoose = require("mongoose");
const { Schema } = mongoose;


const TaskSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  kmCurrent : { type: Number, required: true },
  kmService: { type: Number, required: false },
  service: { type: Date, required: true },
  vtv: { type: Date, required: true },
  insurance: { type: Date, required: true },
  state: { type: String, required: true },
  store: { type: String, required: true },
  assign: { type: String, required: false },
  numberPlate:{ type: String, required: true },
  internalCode:{ type: Number, required: true },
  chassisNumber:{ type: String, required: false },
  type:{ type: String, required: true },
  hoursWorked:{ type: Number, required: false },
  electronicTollCollection:{ type: String, required: false },
  observation:{ type: String, required: false },
  route:{ type: Date, required: true },
  fireExtinguisher:{ type: Date, required: true },
  warranty:{ type: Date, required: true },
  greenCard:{ type: Date, required: true },  
  removeDate:{ type: Date, required: false }, 
},
{
  timestamps:true
}

);

module.exports = mongoose.model("vehicles", TaskSchema);
