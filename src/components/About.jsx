import React from 'react';
import '../styles/About.css';
import videoBg1 from '../assets/rain.mp4';

const About = () => {
  return (
    <div className="landing-page">
      <div className='main'>
        <div className="overlay"></div>
        <video src={videoBg1} autoPlay loop muted />  
        <div className="text-overlay">
          <h1 className="about-title">We Make a Difference</h1>
          <p className="about-description">
            At <span className="highlight">PJ TurbinePro GmbH</span>, we are dedicated to making a positive impact on the environment and addressing the climate crisis. Our mission is to contribute to a sustainable future by ensuring the optimal performance and longevity of wind turbines.
          </p>
          <p className="about-description">
            With a team of highly skilled technicians and a wealth of experience in wind turbine repair, we strive to deliver the highest quality service to our clients. We are committed to maintaining the integrity and efficiency of wind turbines, enabling them to harness the power of wind and generate clean, renewable energy.
          </p>
          <p className="about-description">
            Our company is driven by a passion for sustainability and a deep understanding of the importance of renewable energy sources. We work closely with our clients to provide tailored solutions that meet their specific needs, ensuring minimal downtime and maximizing the performance of their wind turbine systems.
          </p>
          <p className="about-description">
            By prioritizing continuous improvement, innovation, and exceptional customer service, we aim to be leaders in the wind energy industry. We are dedicated to pushing the boundaries, exploring new technologies, and implementing best practices to drive the advancement of clean, green energy.
          </p>
          
          <div className="footer-section">
          <h5 className="footer-section-title">Opening Hours</h5>
          <center>
          <table className="table text-center text-white">
            
            <tbody className="font-weight-normal">
              <tr>
                <td>Mon - Thu:</td>
                <td>8am - 9pm</td>
              </tr>
              <tr>
                <td>Fri - Sat:</td>
                <td>8am - 1am</td>
              </tr>
              <tr>
                <td>Sunday:</td>
                <td>9am - 10pm</td>
              </tr>
            </tbody>
          </table>
          </center>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;
