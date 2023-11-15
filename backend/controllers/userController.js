//import the user scheama from usermodel
import User from  "../models/userModel.js";



//get Users from the database
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {//if function failed
        res.status(500).json({message: "Cannot access the database"});
    }
}

//Login the user and check to see if the credentials are correct in the database
export const loginUser = async (req,res) =>{

    //take in values for email and password
    const {email,pass} = req.body

    //Validate the request check if the email exists
    let Userexists
    try {
        Userexists = await User.findOne({email})   ; 
    } catch (error) {
        return console.log(error);
    }
    //if user does not exist
    if(!Userexists){
        return res.status(404).json({message: "This email has not been registed yet"});
    }

    //check if the passwords are the same 
    const booleanPassword = (pass === Userexists.pass)
    //if password is not the same
    if(!booleanPassword){
        return res.status(404).json({message: "The password is incorrect "});
    }
    return res.status(200).json({message: "YOu have logged in successfully "});

}
// get the users info based on the id parameter
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {//if the function failed 
        res.status(404).json({message: error.message});
    }
}

//Save and add the users info to the database
export const saveUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const inserteduser = await user.save();
        res.status(201).json(inserteduser);
    } catch (error) {// if function failed
        res.status(400).json({message: "error inputing values into the database "});
    }
}

//Update the user based on the id of the document
export const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
    } catch (error) {//if function failed
        res.status(400).json({message: "Cannot update the user with those values"});
    }
}

//delete users document based on the id 
export const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {//if failed 
        res.status(400).json({message: "Failed to delete document make sure it exists "});
    }
}