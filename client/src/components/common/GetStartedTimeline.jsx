import "../../styles/components/common/get-started-timeline.css"
import pic from  "../../assets/29.jpg"
const GetStartedTimeline = () => {
  return (
  <section className="get-started-timeline">
        <div className="timeline">
        <div className="container jobs left-container">
        <img src={pic} alt="" />
            <div className="text-box">
              <h2>Step 1</h2>
              <small><b>Create An Account</b></small>
              <p>Navigate to the navbar of the application, click on the avatar illustration, a context menu will appear with several options, click on Sign In. </p>
              <span className="left-container-arrow"></span>
            </div>
        </div>
        
        <div className="container right-container">
            <img src={pic} alt="" />
            <div className="text-box">
              <h2>Step 2</h2>
              <small><b>Fill In Your Details</b></small>
              <p>After Clicking on the login button, It will take you to a page where you are required to enter a username, an email, password and a phone number, after this you are required to click on the register button</p>
              <span className="right-container-arrow"></span>
            </div>
        </div>
        <div className="container left-container">
            <img src={pic} alt="" />
            <div className="text-box">
              <h2>Step 3</h2>
              <small><b>Verify Your Account</b></small>
              <p>After cliking the register button on the register page, if your credentials are correct, then you will be routed to another page to login with your email and password, if your credentials matched what your registered with, then you will be routed back to the home pag, now you are logged in.</p>
              <span className="left-container-arrow"></span>
            </div>
        </div>
        <div className="container right-container">
            <img src={pic} alt="" />
            <div className="text-box">
              <h2>Step 4</h2>
              <small><b>Take A Tour Of Our App</b></small>
              <p>Now that you are back to the home page, you can take a tour of our application, by checking out the homepage, and other sections of our application like the explore, feed, and you can check out your newly created profile on the profile page.</p>
              <span className="right-container-arrow"></span>
            </div>
        </div>
       
        <div className="container left-container">
            <img src={pic} alt="" />
            <div className="text-box">
              <h2>Step 5</h2>
              <small><b>Visiting Your Dashboard</b></small>
              <p>The Dashboard Is Where the main action takes place</p>
              <span className="left-container-arrow"></span>
            </div>
        </div>
       
       
    </div>

  </section>
  )
}

export default GetStartedTimeline