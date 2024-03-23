import express from "express";
import { //import all the functions from the routine controller 
    getRoutines, 
    getRoutineById,
    saveRoutine,
    updateRoutine,
    deleteRoutine
  
    
} from "../controllers/routineController.js";

//set up the router to be able to configure the routes for the functions
const router = express.Router();

//Set up the routes for the functions relating to routine 
//Use post to send data, get to recieve data, patch to change data and delete to delete the data
router.get('/routines', getRoutines);
router.get('/routines/:id', getRoutineById);
router.post('/routines', saveRoutine);
router.patch('/routines/:id', updateRoutine);
router.delete('/routines/:id', deleteRoutine);


//export all the routes 
export default router;