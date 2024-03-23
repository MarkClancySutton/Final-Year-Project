import React from "react";
import Header from "../components/header";
import Footer from "../components/Footer";

const Routine = () => {
  return (
    <div>
      <Header />
      
      <h2>Routine Buttons</h2>
      <a href="/routine_timed"><button>Go to Routine Timed</button></a>
      <a href="/routine_daily"><button>Go to Routine Daily</button></a>

      <Footer />
    </div>
  );
};

export default Routine;
