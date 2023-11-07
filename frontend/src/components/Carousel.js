import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';




function MyCarousel() {
  return (
    <Link to="/AllBooks"><Carousel>
      {/*Clicking the Carousel will link to all books*/}
      <Carousel.Item>
        <img
          className="d-block mx-auto "
          src="Caterpillar.jpeg" alt="Hungry Hungry Caterpillar" height='300px' 
        />{/*Image in the Carousel */}
      
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src="The-Catcher-in-the-Rye.jpg" alt="Rye Cover" height='300px' 
        />{/*Image in the Carousel */}

       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src="1984.jpg" alt="1984 Cover" height='300px'/>{/*Image in the Carousel */}
      </Carousel.Item>
    </Carousel></Link>
  );
}

export default MyCarousel;