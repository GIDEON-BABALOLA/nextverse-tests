
import "../../../styles/components/Dashboard/circular-progress.css"
import {  useState, useEffect } from "react"
const CircularProgress = ({ end }) => {

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
// useEffect(() => {
// render()
// }, [])
  return (
    <section className="litenote-circular-progress">
<div className="container">
<div className="circular-progress" 
style={{background : `conic-gradient(#7380EC ${count * 3.6}deg, #ededed 0deg)`}}
>
<div className="progress-valueman">{`${count}%`}</div>
</div>

</div>
    </section>
  )
}

export default CircularProgress