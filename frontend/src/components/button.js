import React from 'react'
import {Link} from 'react-router-dom';

const Backbutton = (props) => {
  return (
    <div className='Backbutton' onClick={props.onClick}>
        <Link to='Plistbooks'><button className='newbtn'>More Info</button></Link>
    </div>
  )
}

export default Backbutton;
