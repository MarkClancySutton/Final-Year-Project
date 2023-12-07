import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/pHeader";
import Sidenav from "../components/sidebar";
import Footer from "../components/Footer";


const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [pass,setPassword]= useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
 
  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        gender,
        pass,
      });
      navigate("/");
    } catch (error) {
      setError(error.response.data.message); // Access the error response data
    }
  };
 
  return (
    <>
    <Header/>
    
    
    <div className="columns mt-5">
      <div className="column is-half">
      <div className="Home">
      <div className="form">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Pass</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={pass}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <br/>
          <div className="field">
            <div className="control">
              <button type="submit" className="newbtn">
                Register
              </button>
              {error && <p>Error: {error}</p>}
            </div>
          </div>
        </form>
       </div>
      </div>
    </div>
    <Footer/>
    </div>
    </>
  );
};
 
export default AddUser;