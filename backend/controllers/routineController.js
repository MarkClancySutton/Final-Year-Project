//import the routine scheama from routinemodel
import Routine from  "../models/routineModel.js";



//get Routines from the database
export const getRoutines = async (req, res) => {
    try {
        const routines = await Routine.find();
        res.json(routines);
    } catch (error) {//if function failed
        res.status(500).json({message: "Cannot access the database"});
    }
}


// get the routines info based on the id parameter
export const getRoutineById = async (req, res) => {
    try {
        const routine = await Routine.findById(req.params.id);
        res.json(routine);
    } catch (error) {//if the function failed 
        res.status(404).json({message: error.message});
    }
}

//Save and add the routines info to the database
export const saveRoutine = async (req, res) => {
    const routine = new Routine(req.body);
    try {
        const insertedroutine = await routine.save();
        res.status(201).json(insertedroutine);
    } catch (error) {// if function failed
        res.status(400).json({message: "Adding this new routine"});
    }
}

//Update the routine based on the id of the document
export const updateRoutine = async (req, res) => {
    try {
        const updatedroutine = await Routine.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedroutine);
    } catch (error) {//if function failed
        res.status(400).json({message: "Cannot update the routine with those values"});
    }
}

//delete routines document based on the id 
export const deleteRoutine = async (req, res) => {
    try {
        const deletedroutine = await Routine.deleteOne({_id:req.params.id});
        res.status(200).json(deletedroutine);
    } catch (error) {//if failed 
        res.status(400).json({message: "Failed to delete document make sure it exists "});
    }
}