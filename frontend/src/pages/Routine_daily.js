import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/Footer";

const Routine_daily = () => {
    const [selectedComponent, setSelectedComponent] = useState("led"); // Default selected component is LED
    const [hours, setHours] = useState("12");
    const [minutes, setMinutes] = useState("00");
    const [day, setDay] = useState("Monday"); // Default day is Monday
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
        // Update routines whenever selectedComponent, hours, minutes, or day change
        fetchRoutinesFromDatabase();
    }, [selectedComponent, hours, minutes, day]);

    // Function to fetch routines from the database
    const fetchRoutinesFromDatabase = () => {
        axios.get("http://localhost:5000/routines_day")
            .then(response => {
                const parsedRoutines = response.data.map(routine => {
                    const { _id, device, action, time, day, __v } = routine;
                    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
                    return { _id, device, action, day, hours, minutes, __v };
                });

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
        const currentDay = currentTime.toLocaleString('en-us', { weekday: 'long' }); // Get current day of the week as a string

        routines.forEach(routine => {
            const { day, hours, minutes, device, action } = routine;
            const routineDay = day.toLowerCase(); // Convert day from the routine to lowercase
            const currentRoutineDay = currentDay.toLowerCase(); // Convert current day to lowercase
            if (parseInt(hours) === currentHour && parseInt(minutes) === currentMinute && device === selectedComponent) {
                if (routineDay === currentRoutineDay) {
                    console.log(`Matching routine found for ${day} ${hours}:${minutes}`);
                    // Here you can add any additional actions you want to take when a match is found
                    // Send HTTP request for both 'on' and 'off' actions
                    sendHttpRequest(device, action);
                } else {
                    console.log(`Time matches but day does not for ${day} ${hours}:${minutes}`);
                }
            }
        });
    };


    // Function to send HTTP request
    const sendHttpRequest = (device, action) => {
        axios.get(`http://192.168.119.135:80/${device}/${action}`)
            .then(response => {
                console.log("HTTP request sent successfully:", response.data);
            })
            .catch(error => {
                console.error("Error sending HTTP request:", error);
            });
    };

    // Function to send routine data
    const sendRoutineData = (action) => {
        axios.post("http://localhost:5000/routines_day", {
            device: selectedComponent,
            action: action,
            time: `${hours}:${minutes}`,
            day: day
        })
        .then(response => {
            console.log("Routine data sent successfully:", response.data);
            // Fetch updated routines after adding a new routine
            fetchRoutinesFromDatabase();
        })
        .catch(error => {
            console.error("Error sending routine data:", error);
        });
    };

    // Event handlers for component, hours, minutes, and day change
    const handleComponentChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    const handleHoursChange = (event) => {
        setHours(event.target.value);
    };

    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
    };

    const handleDayChange = (event) => {
        setDay(event.target.value);
    };

    // Event handlers for turning on and off
    const handleTurnOn = () => {
        sendRoutineData('on');
    };

    // Event handlers for turning off
    const handleTurnOff = () => {
        sendRoutineData('off');
    };

    return (
        <div>
        <div className="columns mt-5">
        <div className="column is-half">
        <Header />
        <div className="Home">

            <h2>Set the time and Day of device action
            </h2>
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

            <br/>
            <label htmlFor="daySelect">Select Day:</label>
            
            <select id="daySelect" onChange={handleDayChange}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
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

export default Routine_daily;
