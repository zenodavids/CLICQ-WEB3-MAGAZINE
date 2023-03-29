import React, { Component } from 'react'
import Link from 'next/link'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { GrMail } from 'react-icons/gr'
import { FaMapMarkerAlt } from 'react-icons/fa'

const date = new Date().getFullYear()

class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <footer>
          <div className='main-content'>
            <div className='left box'>
              <h2>About us</h2>
              <div className='content'>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid dicta officiis eos voluptatum, veritatis rem quaerat,
                  libero eum quos sint officia saepe quam, deserunt earum cum
                  enim a adipisci ducimus ad nisi sunt nostrum iste? Distinctio
                  libero officia error eum?
                </p>
              </div>
            </div>
            <div className='center box'>
              <h2>Address</h2>
              <div className='content'>
                <div className='place'>
                  <span className='fas fa-map-marker-alt'>
                    {' '}
                    {<FaMapMarkerAlt />}
                  </span>
                  <span className='text'>
                    1881 SW 164th Avenue Miramar, FL 33027, USA.
                  </span>
                </div>
                <div className='phone'>
                  <span className='fas fa-phone-alt'>
                    {<BsFillTelephoneFill />}
                  </span>
                  <span className='text'>+1 (571) 413 0960</span>
                </div>
                <div className='email'>
                  <span className='fas fa-envelope'>{<GrMail />}</span>
                  <span className='text'>info@himarkacademy.tech</span>
                </div>
              </div>
            </div>
            <div className='right box'>
              <h2>Contact us</h2>
              <div className='content'>
                <form action='#'>
                  <div className='email'>
                    <div className='text'>Email *</div>
                    <input type='email' required />
                  </div>
                  <div className='msg'>
                    <div className='text'>Message *</div>
                    <textarea rows='2' cols='25' required></textarea>
                  </div>
                  <div className='btn'>
                    <button type='submit' style={{ color: '#202020' }}>
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='bottom'>
            <center>
             
              <span className='far fa-copyright'></span>
              <span> {date} All rights reserved.</span>
            </center>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer
