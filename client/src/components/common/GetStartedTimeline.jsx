import "../../styles/components/common/get-started-timeline.css"
import { FaUserPlus, FaCheckCircle, FaEdit, FaTachometerAlt } from 'react-icons/fa';
import { useRef, useEffect, useState } from "react"
import pic from  "../../assets/29.jpg"
import anotherpic from  "../../assets/Great.jpg"
import woman from "../../assets/30.jpg"
import picSecond from "../../assets/19.jpg"
import picThird  from "../../assets/3.jpg"
const GetStartedTimeline = () => {
const elementRef = useRef()
const firstSection =  useRef()
const secondSection =  useRef()
const thirdSection =  useRef()
const fourthSection =  useRef()
const fifthSection = useRef()
useEffect(() => {
  const secondObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (entry.target.id) {
case "firstSection":
firstSection.current.classList.add("active")
break
case "secondSection":
              secondSection.current.classList.add("active")
  break
  case "thirdSection":
  
    thirdSection.current.classList.add("active")
    break
    case "fourthSection":
    
      fourthSection.current.classList.add("active")
      break
      case "fifthSection":
      
        fifthSection.current.classList.add("active")
        break
              
            default:
              break;
          }
          // observer.unobserve(entry.target);
        }
      })
    },
    { threshold: 1 } // 10% of the element needs to be visible
  );
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        elementRef.current.classList.add("active")
        // observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1 } // 10% of the element needs to be visible
  );


  if (elementRef.current) {
    observer.observe(elementRef.current);
    secondObserver.observe(firstSection.current);
    secondObserver.observe(secondSection.current);
    secondObserver.observe(thirdSection.current);
    secondObserver.observe(fourthSection.current);
    secondObserver.observe(fifthSection.current);
  }

  return () => {
    if (elementRef.current) {
      observer.unobserve(elementRef.current);
    }
  };
}, []);
  return (
  <section className="get-started-timeline">
        <div className="timeline" ref={elementRef} id="elementRef">
        <div className="container jobs left-container" id="firstSection" ref={firstSection}>
        <img src={pic} alt="" />
            <div className="text-box">
              <h2>Step 1</h2>
              <small><b>Create An Account</b></small>
              <p>Navigate to the navbar of the application, click on the avatar illustration, a context menu will appear with several options, click on Sign In.</p>
              <span className="left-container-arrow"></span>
            </div>
        </div>
        
        <div className="container  right-container" id="secondSection" ref={secondSection}>
            <img src={anotherpic} alt="" />
            <div className="text-box">
              <h2>Step 2</h2>
              <small><b>Fill In Your Details</b></small>
              <p>After Clicking on the login button, It will take you to a page where you are required to enter a username, an email, password and a phone number, after this you are required to click on the register button.</p>
              <span className="right-container-arrow"></span>
            </div>
        </div>
        <div className="container left-container" id="thirdSection" ref={thirdSection}>
            <img src={woman} alt="" />
            <div className="text-box">
              <h2>Step 3</h2>
              <small><b>Verify Your Account</b></small>
              <p>After cliking the register button on the register page, if your credentials are correct, then you will be routed to another page to login with your email and password, if your credentials matched what your registered with, then you will be routed back to the home pag, now you are logged in.</p>
              <span className="left-container-arrow"></span>
            </div>
        </div>
        <div className="container right-container" id="fourthSection" ref={fourthSection}>
            <img src={picSecond} alt="" />
            <div className="text-box">
              <h2>Step 4</h2>
              <small><b>Take A Tour Of Our App</b></small>
              <p>Now that you are back to the home page, you can take a tour of our application, by checking out the homepage, and other sections of our application like the explore, feed, and you can check out your newly created profile on the profile page.</p>
              <span className="right-container-arrow"></span>
            </div>
        </div>
       
        <div className="container left-container" id="fifthSection" ref={fifthSection}>
            <img src={picThird} alt="" />
            <div className="text-box">
              <h2>Step 5</h2>
              <small><b>Visiting Your Dashboard</b></small>
              <p>The Dashboard Is Where the main action takes place, inside your dashboard you get to edit your profile, you also get to write your notes with our powerful editor, I wont tell you everythink now more features are waiting for you in the dashboard.</p>
              <span className="left-container-arrow"></span>
            </div>
        </div>
       
       
    </div>

  </section>
  )
}

export default GetStartedTimeline