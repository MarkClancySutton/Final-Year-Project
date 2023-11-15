import React,{useState} from "react";




import Backbutton from "../components/button";
import Back from "../components/Backdrop";
import Header from '../components/header';
import Footer from '../components/Footer';



const Home = () => {
  const [Open,setOpen] = useState(false);
  
  function MoreInfo() {
    setOpen(true);
  }

  function GoBack() {
    setOpen(false);
  }

  
    return(
      <div >

      <Header/>
      
      
      
      <div className="Home">
      





      
  
      {/*Display more info button + backgroud using UseState funtions*/}    
      {Open && <Backbutton onClick={GoBack}/>}
      {Open && <Back onClick={GoBack}/>}
      
     </div>
     
    
      <Footer/>
      </div>
  )
}

export default Home
