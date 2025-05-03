
import "../../../styles/components/Dashboard/circular-progress.css"
import Percentage from "./Percentage"
import {  useState, useEffect } from "react"
const CircularProgress = ({ end, trend, value, storyMetricsLoading }) => {
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
  return (
    <section className="litenote-circular-progress">
<div className="container">
<div className="circular-progress" 
style={{
  background: `conic-gradient(
    ${trend == "uptrend" ? '#7380EC' : '#ff7782ec'} ${count * 3.6}deg,
    #ededed 0deg
  )`,
}}
>
 <>
 {
  storyMetricsLoading ? 
  <div className="recent-stories-loader" style={{width : "30px", height : "10px", position : "relative"}}></div> 
  :
  <>
  {trend == "uptrend" ? <div className="progress-valueman" style={{color : "#41f1b5"}}>+{value}%</div> : 
<div className="progress-valueman" style={{color : "#ff7782ec"}}>-{value}%</div>
}</>
 }
 </>

</div>

</div>
    </section>
  )
}

export default CircularProgress