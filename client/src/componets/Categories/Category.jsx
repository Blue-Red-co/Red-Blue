import React, { useState } from 'react';
import './Category.css';
import IteamCard from '../IteamCard/IteamCard';
const testData = [
  {
    name: "Someone",
    role: "SEO Expert",
    img: "../img1.jpg",
    data: "clr1",
    bgColor: "#162527"
  },
  {
    name: "Someone",
    role: "SEO Expert",
    img: "../img1.jpg",
    data: "clr2",
    bgColor: "#202011"
  }
];


function Category() {
  const [hoveredColor, setHoveredColor] = useState(null);

  return (
    <div
      className="body"
      style={{
        background: hoveredColor ? hoveredColor : "#fff",
        transition: "background 0.3s"
      }}
    >
      <div className="containers">
        {testData.map((item, index) => (
          <div
            key={index}
            className="box"
            data-color={item.data}
            onClick={() => setHoveredColor(item.bgColor)}
            // onMouseLeave={() => setHoveredColor(null)}
          >
            <div className="imgBx">
              <img alt="img" src={item.img} />
            </div>
            <div className="glass">
              <h3>{item.name}<br /><span>{item.role}</span></h3>
            </div>
          </div>
        ))}
        <br />
        <IteamCard />
      </div>
    </div>
  );
}

export default Category;
