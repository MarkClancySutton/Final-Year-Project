import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/header";

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get("http://localhost:5000/routines");
      setRoutines(response.data);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };

  const deleteRoutine = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/routines/${id}`);
      fetchRoutines();
    } catch (error) {
      console.error("Error deleting routine:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="columns mt-5">
        <div className="column is-half">
          <div className="Home">
            <h1>Routines Time based:</h1>
            <br />
            
            <Link to="/Home" className="newbtn">
              Home
            </Link>
            <table className="table is-striped is-fullwidth mt-2">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Device</th>
                  <th>Action</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routines.map((routine, index) => (
                  <tr key={routine._id}>
                    <td>{index + 1}</td>
                    <td>{routine.device}</td>
                    <td>{routine.action}</td>
                    <td>{routine.time}</td>
                    <td>
                      <Link
                        to={`edit/${routine._id}`}
                        className="button is-info is-small mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteRoutine(routine._id)}
                        className="button is-danger is-small"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoutineList;
