import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Category from '../Categories/Category';

const fruitImages = [
  { name: 'Apple', src: '../red.png', background: "#fc4a55" },
  { name: 'Banana', src: '../blue.png', background: "#ffcc02" },
  { name: 'Orange', src: '../red.png', background: "#92ba3c" },
  { name: 'Peach', src: '../red.png', background: "#fb6cb2" },
  { name: 'Mango', src: '../red.png', background: "#ffb42b" }
];

function Home() {
  const [activeClass, setActiveClass] = useState(0);
  const [activeIndex, setActiveIndex] = useState(fruitImages[0]);
  const [activeToggel, setActiveToggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveClass((prev) => {
        const nextIndex = (prev + 1) % fruitImages.length;
        setActiveIndex(fruitImages[nextIndex]);
        return nextIndex;
      });
    }, 5000); // change every 1000ms = 1 second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className='home'>
      <div className='section'>
        <div className='bg' style={{ background: activeIndex.background }}></div>
        <div className="header">
          <Link to='#' className='logo'> logo </Link>
          <div  className={`toggle ${activeToggel? 'active' : ''}`} onClick={() => setActiveToggle(prev => !prev)}> </div>
          <ul  className= {` navigation ${activeToggel ? 'active' : ''}`}> 
            <li className='nav-item'><Link to='#' className='active'>Home</Link></li>
            <li className='nav-item'><Link to='#'>Profile</Link></li>
            <li className='nav-item'><Link to='#'>Cart</Link></li>
          </ul>
        </div>
        <div className='content'>
          <div className='textbox'>
            <h2>Welcome to our store</h2>
            <p>Discover the best products at unbeatable prices.</p>
            <Link to='#' className='btn'>Shop Now</Link>
          </div>
          <div className='imgbox'>
            <img src={activeIndex.src} alt='store' />
          </div>
        </div>
        <ul className='thumb'>
          {fruitImages.map((item, index) => (
            <li
              key={index}
              data-text={item.name}
              className={`${index === activeClass ? 'active' : ''}`}
              onClick={() => {
                setActiveClass(index);
                setActiveIndex(item);
              }}
            >
              <img src={item.src} alt={`Thumb ${index}`} />
            </li>
          ))}
        </ul>
      </div>
      <Category />
    </div>
  );
}

export default Home;
