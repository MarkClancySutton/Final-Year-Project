import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";

const EditRoutine = () => {
  const [device, setDevice] = useState("");
  const [action, setAction] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getRoutineById();
  }, []);

  const getRoutineById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/routines/${id}`);
      const { device, action, time } = response.data;
      const [h, m] = time.split(":");
      setDevice(device);
      setAction(action);
      setHours(h);
      setMinutes(m);
    } catch (error) {
      console.error("Error fetching routine:", error);
    }
  };

  const updateRoutine = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/routines/${id}`, {
        device,
        action,
        time: `${hours}:${minutes}`,
      });
      navigate("/Routine_List");
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="columns mt-5">
        <div className="form">
          <div className="Home">
            <form onSubmit={updateRoutine}>
              <div className="field">
                <label className="label">Device</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    placeholder="Device"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Action</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    placeholder="Action"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Hour</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="Hour"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Minutes</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="Minutes"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditRoutine;
