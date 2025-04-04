import Input from "../common/Input"
import TextArea from "../common/TextArea"
const Publish = () => {
    return (
    <>
      <div className="litenote-publish-container"> 
        <form id="story-form">
          <div className="litenote-publish-form-group">
            <label htmlFor="name">Your Name</label>
            <Input className="litenote-publish-input"
            type="text" id="name" placeholder="Enter Your name"/>
          </div>
          <div className="litenote-publish-form-group">
            <label htmlFor="name">Story Title</label>
            <Input className="litenote-publish-input"
             type="text" id="name" placeholder="Title"/>
          </div>
          <div className="litenote-publish-form-group">
            <label htmlFor="name">Caption</label>
            <Input className="litenote-publish-input"
             type="text" id="name" placeholder="Caption of your Story"/>
          </div>
          <div className="litenote-publish-form-group">
            <label htmlFor="story">Your Story</label>
            <TextArea
            className="litenote-publish-textarea"
             id="publish-story" placeholder="Tell us your story"/>
          </div>
          
          <div className="litenote-publish litenote-publish-category-select">
            <select
            className="litenote-publish-select"
             id="category" required>
              <option value="">Select Category</option>
               {/* Dynamically generate category options here */}
            </select>
          </div>
          
          <button type="submit" className="litenote-publish-submit-btn">Submit</button>
        </form>
      </div>
    </>
    )
  }
  
  export default Publish