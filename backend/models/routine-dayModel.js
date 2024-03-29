import mongoose from "mongoose";

//Creates the scheam for the book database 
const routine_daySchema = mongoose.Schema({
  device: {
    type: String,
    required: [true, "Please fill in a title"] //validate that they have entered a value 
}, 
  action:{
    type: String,
    required: [true, "Please fill in a Author"] //validate that they have entered a value 
},
  time: {
    type: String,
    required: [true, "Please fill in a Quantity and make sure it is a number"] //validate that they have entered a value 
},

    day:{
        type: String,
        required: [true, "Please fill in a Quantity and make sure it is a number"] //validate that they have entered a value 
},


  
  
})
//Exports the scheama for the book database
export default mongoose.model("Routine-day", routine_daySchema)