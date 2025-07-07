import { useState } from 'react' 
import './IteamCard.css'
// import { Link } from 'react-router-dom'
import AddToCart from '../AddToCart/AddToCart'
function IteamCard() {
  const [activeToggel, setActiveToggle] = useState(false)
  const obj = [
    {
    "heading":"test",
    "para": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.`,
    "img": "../pepse.png",
    "circle":"red",
    "card": "red"        
  },
   {
    "heading":"test",
    "para": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.`,
    "img": "../pepse.png",
    "circle":"red",
    "card": "red"        
  },
   {
    "heading":"test",
    "para": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.`,
    "img": "../pepse.png",
    "circle":"red",
    "card": "red"        
  },
  {
    "heading":"test",
    "para": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.`,
    "img": "../pepse.png",
    "circle":"red",
    "card": "red"        
  },
  {
    "heading":"test",
    "para": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.`,
    "img": "../pepse.png",
    "circle":"red",
    "card": "red"        
  },{
    "heading":"test",
    "para": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.`,
    "img": "../pepse.png",
    "circle":"red",
    "card": "red"        
  }
]
  
  
  return (
    <div className='cardboady'>
     {obj.map((item , i ) => (

       <div key={i} className = {`card ${activeToggel === i? 'active' : ''}`} onClick={() => setActiveToggle(prev => (prev === i ? null : i))} >
         <div className= "circle"  > </div>
        <div className='contents'>
          <h2>{item.heading}</h2>
          <p>{item.para}</p>
          <AddToCart />
        </div>
        <img src= {item.img} alt="icon" />

      </div>
      
     ) )}
    </div>
  )
}

export default IteamCard