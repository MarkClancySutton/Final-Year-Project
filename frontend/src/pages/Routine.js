import React, { useState } from "react";
import Backbutton from "../components/button";
import Back from "../components/Backdrop";
import Header from "../components/header";
import Footer from "../components/Footer";

const Routine = () => {
    function sendHttpRequestWithDelay() {
        var delayInput = document.getElementById("delayInput").value;
        var delayUnit = document.getElementById("delayUnit").value;

        // Convert delay to milliseconds
        var delayInMilliseconds;
        switch (delayUnit) {
            case "seconds":
                delayInMilliseconds = delayInput * 1000;
                break;
            case "minutes":
                delayInMilliseconds = delayInput * 60 * 1000;
                break;
            case "hours":
                delayInMilliseconds = delayInput * 60 * 60 * 1000;
                break;
            default:
                delayInMilliseconds = 0;
                break;
        }

        setTimeout(function() {
            // Make HTTP request after the specified delay
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://192.168.104.135:80/led/off", true);
            xhr.send();
        }, delayInMilliseconds);
    }

  return (
    <div>
      <Header />

      <h2>Delayed HTTP Request</h2>
        <label htmlFor="delayInput">Delay:</label>
        <input type="number" id="delayInput" min="1" step="1" defaultValue="1"></input>
        <select id="delayUnit">
        <option value="seconds">Seconds</option>
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
        </select>
        <button onClick={sendHttpRequestWithDelay}>Send HTTP Request</button>

      <Footer />
    </div>
  );
};

export default Routine;
