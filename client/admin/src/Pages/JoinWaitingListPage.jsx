import "../styles/components/common/waiting-list.css"
const JoinWaitingListPage = () => {
    const joinWaitingList = () => {
        alert("Successfully joined our waiting list")
    }
  return (
    <section className="litenote-waiting-list-page" >
    <div className="background-logos"></div>
    <div className="container">
     
        <h1>Lite Note</h1>
        <p> 
        Lite Note! Were crafting powerful features to boost your creativity and amplify your voice  be among the first to experience the future of online publishing!</p>
        <div className="form-group">
            <input type="email" id="email" placeholder="Enter your email address" required />
        </div>
        <button
        onClick={joinWaitingList}
        >Join the Waiting List</button>
        <p className="success-message" id="successMessage">Thanks for joining! Well keep you updated.</p>
    </div>
    </section>
  )
}

export default JoinWaitingListPage