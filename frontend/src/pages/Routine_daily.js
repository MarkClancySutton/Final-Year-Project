import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/Footer";

const Routine_daily = () => {
    const [selectedComponent, setSelectedComponent] = useState("led"); // Default selected component is LED
    const [hours, setHours] = useState("12");
    const [minutes, setMinutes] = useState("00");

    useEffect(() => {
        const interval = setInterval(() => {
            if (isTimesMatched()) {
                sendRoutineData(selectedComponent, 'on');
            }
        }, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [selectedComponent, hours, minutes]);

    function sendRoutineData(device, action) {
        axios.post("http://localhost:5000/routines", {
            device,
            action,
            time: `${hours}:${minutes}`
        })
        .then(response => {
            console.log("Routine data sent successfully:", response.data);
        })
        .catch(error => {
            console.error("Error sending routine data:", error);
        });
    }

    function isTimesMatched() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        return currentHour === parseInt(hours, 10) && currentMinute === parseInt(minutes, 10);
    }

    const handleComponentChange = (event) => {
        setSelectedComponent(event.target.value);
    }

    const handleHoursChange = (event) => {
        setHours(event.target.value);
    }

    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
    }

    const handleTurnOn = () => {
        sendRoutineData(selectedComponent, 'on');
    }

    const handleTurnOff = () => {
        sendRoutineData(selectedComponent, 'off');
    }

    return (
        <div>
            <Header />

            <h2>24-Hour Clock Trigger</h2>
            <p>Set the trigger time:</p>
            <label htmlFor="hours">Hours:</label>
            <input type="number" id="hours" min="0" max="23" value={hours} onChange={handleHoursChange} />
            <label htmlFor="minutes">Minutes:</label>
            <input type="number" id="minutes" min="0" max="59" value={minutes} onChange={handleMinutesChange} />

            <label htmlFor="componentSelect">Select Component:</label>
            <select id="componentSelect" onChange={handleComponentChange}>
                <option value="led">LED</option>
                <option value="door">Door</option>
                <option value="fan">Fan</option>
            </select>
            <br />
            <button onClick={handleTurnOn}>Turn On</button>
            <button onClick={handleTurnOff}>Turn Off</button>

            <Footer />
        </div>
    );
};

export default Routine_daily;
