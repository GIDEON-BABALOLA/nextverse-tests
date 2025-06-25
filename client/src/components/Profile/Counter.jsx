// src/Counter.js
import  { useEffect, useState } from 'react';

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Duration of the animation in milliseconds
    const increment = end / (duration / 10); // Calculate the increment

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 10);

    return () => clearInterval(counter); // Cleanup interval on component unmount
  }, [end]);

  return <div className='special-modal-client'>{count.toLocaleString()}</div>;
};

export default Counter;
