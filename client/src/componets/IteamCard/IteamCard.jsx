import React from 'react'
import './IteamCard.css'
import { Link } from 'react-router-dom'
function IteamCard() {
  return (
    <div className='cardboady'>
      <div className='card'>
        <div className='circle'> </div>
        <div className='contents'>
          <h2>Card Title</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
          </p>
          <Link className='btn' to="#">Buy Now</Link>
        </div>
        <img src="../pepse.png" alt="icon" />

      </div>
    </div>
  )
}

export default IteamCard