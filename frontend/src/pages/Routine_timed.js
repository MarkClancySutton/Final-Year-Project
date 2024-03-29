import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/Footer";

const Routine_timed = () => {
    const [selectedComponent, setSelectedComponent] = useState("led"); // Default selected component is LED
    const [hours, setHours] = useState("12");
    const [minutes, setMinutes] = useState("00");
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        // Fetch routines from the database when the component mounts
        fetchRoutinesFromDatabase();
    
        const interval = setInterval(() => {
            // Check if current time matches any routine
            fetchRoutinesFromDatabase(); // Fetch routines again at interval
        }, 30000); // Check every 30 seconds
    
        // Clean up function to clear interval
        return () => clearInterval(interval);
    }, []);
    

    useEffect(() => {
        // Update routines whenever selectedComponent, hours, or minutes change
        fetchRoutinesFromDatabase();
    }, [selectedComponent, hours, minutes]);

    // Function to fetch routines from the database
    const fetchRoutinesFromDatabase = () => {
        axios.get("http://localhost:5000/routines")
            .then(response => {
                
                const parsedRoutines = response.data.map(routine => {
                    // Parse the time from each routine and return the parsed routine
                    const { _id, device, action, time, __v } = routine;
                    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
                    return { _id, device, action, hours, minutes, __v };
                });

                
                
                // Print current time (hour and minute separately)
                const currentTime = new Date();
                console.log("Current time:", currentTime.getHours(), ":", currentTime.getMinutes());

                // Update the routines state with the parsed routines
                setRoutines(parsedRoutines);

                // Check if current time matches any routine
                checkRoutines();
            })
            .catch(error => {
                console.error("Error fetching routines:", error);
            });
    };



    // Function to check if current time matches any routine and send HTTP request
    const checkRoutines = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        routines.forEach(routine => {
            const { hours, minutes, device, action } = routine;
            if (currentHour === hours && currentMinute === minutes && device === selectedComponent) {
                console.log(`Matching routine found for ${hours}:${minutes}`);
                // Here you can add any additional actions you want to take when a match is found
                // Send HTTP request for both 'on' and 'off' actions
                sendHttpRequest(device, action);
            }
        });
    };

    // Function to send HTTP request
    const sendHttpRequest = (device, action) => {
        axios.get(`http://192.168.189.135:80/${device}/${action}`)
            .then(response => {
                console.log("HTTP request sent successfully:", response.data);
            })
            .catch(error => {
                console.error("Error sending HTTP request:", error);
            });
    };


    // Function to send routine data
    const sendRoutineData = (device, action) => {
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
    };

    // Event handlers for component, hours, and minutes change
    const handleComponentChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    const handleHoursChange = (event) => {
        setHours(event.target.value);
    };

    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
    };

    // Event handlers for turning on and off
    const handleTurnOn = () => {
        sendRoutineData(selectedComponent, 'on');
    };

    const handleTurnOff = () => {
        sendRoutineData(selectedComponent, 'off');
    };

    return (
        <div className="columns mt-5">
        <div className="column is-half">
        <Header />
        <div className="Home">
        <div>
            

            <h2>24-Hour Clock Trigger</h2>
            <p>Set the trigger time:</p>
            <label htmlFor="hours">Hours:</label>
            <input type="number" id="hours" min="0" max="23" value={hours} onChange={handleHoursChange} />
            <label htmlFor="minutes">Minutes:</label>
            <input type="number" id="minutes" min="0" max="59" value={minutes} onChange={handleMinutesChange} />

            <br/>
            <label htmlFor="componentSelect">Select Component:</label>
            
            <select id="componentSelect" onChange={handleComponentChange}>
                <option value="led">LED</option>
                <option value="door">Door</option>
                <option value="fan">Fan</option>
            </select>
            <br />
            <button onClick={handleTurnOn}>Turn On</button>
            <button onClick={handleTurnOff}>Turn Off</button>

            
        </div>
        </div>
        <Footer />
        </div>
        </div>
    );
};

export default Routine_timed;

