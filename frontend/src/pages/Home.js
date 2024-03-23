import React, { useState } from "react";
import Backbutton from "../components/button";
import Back from "../components/Backdrop";
import Header from "../components/header";
import Footer from "../components/Footer";

const Home = () => {
  const [open, setOpen] = useState(false);

  function moreInfo() {
    setOpen(true);
  }

  function goBack() {
    setOpen(false);
  }

  function light_on() {
    fetch("http://192.168.189.135:80/led/on", {
      method: "GET", // You can change the method as needed (GET, POST, etc.)
      headers: {
        // You can add headers if necessary
      },
    })
      .then((response) => {
        // Handle the response as needed
        console.log("HTTP request successful");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during HTTP request:", error);
      });
  }

  function light_off() {
    fetch("http://192.168.189.135:80/led/off", {
      method: "GET", // You can change the method as needed (GET, POST, etc.)
      headers: {
        // You can add headers if necessary
      },
    })
      .then((response) => {
        // Handle the response as needed
        console.log("HTTP request successful");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during HTTP request:", error);
      });
  }
  function fan_on() {
    fetch("http://192.168.189.135:80/fan/on", {
      method: "GET", // You can change the method as needed (GET, POST, etc.)
      headers: {
        // You can add headers if necessary
      },
    })
      .then((response) => {
        // Handle the response as needed
        console.log("HTTP request successful");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during HTTP request:", error);
      });
  }
  function fan_off() {
    fetch("http://192.168.189.135:80/fan/off", {
      method: "GET", // You can change the method as needed (GET, POST, etc.)
      headers: {
        // You can add headers if necessary
      },
    })
      .then((response) => {
        // Handle the response as needed
        console.log("HTTP request successful");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during HTTP request:", error);
      });
  }
  function door_open() {
    fetch("http://192.168.189.135:80/door/on", {
      method: "GET", // You can change the method as needed (GET, POST, etc.)
      headers: {
        // You can add headers if necessary
      },
    })
      .then((response) => {
        // Handle the response as needed
        console.log("HTTP request successful");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during HTTP request:", error);
      });
  }
  function door_closed() {
    fetch("http://192.168.189.135:80/door/off", {
      method: "GET", // You can change the method as needed (GET, POST, etc.)
      headers: {
        // You can add headers if necessary
      },
    })
      .then((response) => {
        // Handle the response as needed
        console.log("HTTP request successful");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during HTTP request:", error);
      });
  }

  return (
    <div>
      <Header />

      <div className="Home">
        {/* Display more info button + background using useState functions */}
        {open && <Backbutton onClick={goBack} />}
        {open && <Back onClick={goBack} />}

        {/* Button to send HTTP request */}
        <div>
          <h2>Connected Devices</h2>    
          
          
          <img src="light.png" width="150" height="200" />
          
          <img src="fan.png" width="150" height="200" />
          
          <img src="door.png" width="150" height="200" />
          
          <br/>
          <a onClick={light_on}><img src="light-on.png" width="75" height="100" /></a>
          <a onClick={light_off}><img src="light-off.png" width="75" height="100" /></a>
        

       
          
          
          <a onClick={fan_on}><img src="fan-on.png" width="75" height="100" /></a>
          <a onClick={fan_off}><img src="fan-off.png" width="75" height="100" /></a>
        

        
          
          
          <a onClick={door_open}><img src="door-open.png" width="75" height="100" /></a>
          <a onClick={door_closed}><img src="door-closed.png" width="75" height="100" /></a>
        

        </div>
        
        
        <br />
      
        
      </div>

      <Footer />
    </div>
  );
};

export default Home;
