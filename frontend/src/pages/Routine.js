import React from "react";
import Header from "../components/header";
import Footer from "../components/Footer";

const Routine = () => {
  return (
    <div className="columns mt-5">
        <div className="column is-half">
        <Header />
        <div className="Home">
      
      <h2>Routine Buttons</h2>
      
      <br/>
      
      <a href="/routine_timed"><img src="clock.png" alt="Clock Image" style={{ width: 250, height: 250 }} /></a>



      <a href="/routine_daily"><img src="calender.png" alt="Calender Image" style={{ width: 250, height: 250 }} /></a>
      <a href="/routine_list"><img src="clock-list.png" alt="Clock Image" style={{ width: 250, height: 250 }} /></a>
      <a href="/Routine_List_day"><img src="calender-list.png" alt="Calender Image" style={{ width: 250, height: 250 }} /></a>

      <Footer />
    </div>
    </div>
    </div>

  );
};

export default Routine;
