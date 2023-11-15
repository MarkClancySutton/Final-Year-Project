import express from "express";
import { //import all the functions from the user controller 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    loginUser,
    
} from "../controllers/UserController.js";

//set up the router to be able to configure the routes for the functions
const router = express.Router();

//Set up the routes for the functions relating to user 
//Use post to send data, get to recieve data, patch to change data and delete to delete the data
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login',loginUser)

//export all the routes 
export default router;