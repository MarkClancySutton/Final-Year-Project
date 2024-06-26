//Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/userRoute.js";
import RoutineRoute from "./routes/routineRoute.js";
import Routine_dayRoute from "./routes/routine_dayRoute.js";


const app = express();
//Connect to the mongodb atlas server 
mongoose.connect('mongodb+srv://C20437052:Scampidog12@cluster0.5nq8pul.mongodb.net/FYP',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
//if you dont connect 
db.on('error', (error) => console.log(error));
//if connection works
db.once('open', () => console.log('Database Connected...'));

//Set up the app to use all the routes and express 
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(RoutineRoute);
app.use(Routine_dayRoute);

//set the server to port 5000 
app.listen(5000, ()=> console.log('Server up and running...'));