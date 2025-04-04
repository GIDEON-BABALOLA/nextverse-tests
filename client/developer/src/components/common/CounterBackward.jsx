// src/Counter.js
import { useEffect, useState } from 'react';

const Counter = ({ start }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const duration = 2000; // Duration of the animation in milliseconds
    const decrement = start / (duration / 10); // Calculate the decrement

    const counter = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(counter);
          return 0;
        }
        return Math.floor(prevCount - decrement);
      });
    }, 1000); // seconds

    return () => clearInterval(counter); // Cleanup interval on component unmount
  }, [start]);

  return <div>{count.toLocaleString()}</div>;
};

export default Counter;
