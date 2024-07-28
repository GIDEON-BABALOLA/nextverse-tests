import "../../styles/components/Home/testimonial.css"
import { useRef } from "react"
// var slide = document.getElementById("slide");
// var upArrow = document.getElementById("upArrow");
// var downArrow = document.getElementById("downArrow");

// let x = 0;
// upArrow.onclick = function(){
//     if(x > "-900"){
//         x = x - 300;
//    slide.style.top = x + "px";
// }
//     }
  
// downArrow.onclick = function(){
//     if(x < 0){
//         x = x + 300;
//    slide.style.top = x + "px";
// }

//     }
const Testimonial = () => {
    const slide = useRef();
    const upArrow = useRef();
    const downArrow = useRef();
    let x = 0;
    const upSlide = () => {
            if(x > "-900"){
        x = x - 300;
   slide.current.style.top = x + "px";
}

    }
    const downSlide = () => {
    if(x < 0){
        x = x + 300;
   slide.current.style.top = x + "px";
}
    }
  return (
  <>
      <div className="litenote-testimonial-hero">
  <h1 className="litenote-testimonial-h-one">User Reviews</h1>
  <div className="litenote-testimonial-box">
   <div id="litenote-testimonial-slide" ref={slide} style={{top: 0 }}>
    <div className="litenote-testimonial-card">
        <div className="litenote-testimonial-profile">
        <img 
        src="https://res.cloudinary.com/doctr0fct/image/upload/v1717878232/Testimonial/peqinlywmeymqxvdrxgb.jpg" />
        <div>
            <h3>Jenny Brown</h3>
            <p>Blogger</p>
        </div>
    </div>
    <p className="litenote-testimonial-content">LiteNote has been a lifesaver for my blogging routine. The apps user friendly interface and robust writing features make it easy to draft, edit, and publish my blog posts🔥🔥. 
        I can keep all my ideas and drafts in one place, ensuring I never lose track of my work. 
        LiteNote has made my blogging process more efficient and enjoyable, helping me stay consistent with my content.
    </p>
    </div>
    <div className="litenote-testimonial-card">
        <div className="litenote-testimonial-profile">
        <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1717878250/Testimonial/ybw2xs60oyvju4kwdqj7.jpg" />
        <div>
            <h3>Sophia Adeseun</h3>
            <p>Web designer</p>
        </div>
    </div>
    <p className="litenote-testimonial-content"> 
        As a beginner writer, I found this platform incredibly helpful. Not only did I get to connect with other writers, 
        but I also received valuable feedback on my work that allowed me to improve my writing skills. 
         I would highly recommend this platform to anyone who wants 
        to grow as a writer and be part of a supportive community.
    </p>
    </div>
    <div className="litenote-testimonial-card">
        <div className="litenote-testimonial-profile">
        <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1717878255/Testimonial/dtcuwxirewkj4a4lxvxw.png" />
        <div>
            <h3>Fitness Zone</h3>
            <p>YouTube channel</p>
        </div>
    </div>
    <p className="litenote-testimonial-content"> 
        This Platform has helped us create more awareness about health and fitness with the aim of promoting better living
        helping both young and old people live right and Fit 
    </p>
    </div>
    <div className="litenote-testimonial-card">
        <div className="litenote-testimonial-profile">
        <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1717878265/Testimonial/qxc2cycfxko2cmd7gc4z.jpg" />
        <div>
            <h3>Daniel James</h3>
            <p>Software Engineer</p>
        </div>
    </div>
    <p className="litenote-testimonial-content"> 
        I have learned and grown as a writer on this platform. The feedback, 
        contests, and community support made me a better writer.
    </p>
    </div>
   </div>


   <div className="litenote-testimonial-sidebar">
    <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1717878236/Testimonial/cprdbm2o7czr3kadvagr.png" id="upArrow" ref={upArrow} onClick={
        () =>{
            upSlide();
        }}/>
    <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1717878241/Testimonial/dfiteywiutneewldyumt.png" id="downArrow"  ref={downArrow} onClick={() => {
        downSlide();
    }}/>
</div>
  </div>
    </div>
  </>
  )
}

export default Testimonial