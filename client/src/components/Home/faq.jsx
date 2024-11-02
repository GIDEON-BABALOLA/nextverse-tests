import  {useState, useRef, useEffect}from "react"
import { BiPlus, BiMinus } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import "../../styles/components/Home/faq.css"
import gsap from "gsap"
function Faq(){
  const [openAccordion, setOpenAccordion] = useState(null);
  const accordionRefs = useRef([]);
  const accordionContainer = useRef(null)
  useEffect(() => {
setOpenAccordion(Math.floor((Math.random() * 5)))
  }, [])
  const handleAccordionClick = (index) => {
    console.log(openAccordion, index);
    if (index !== openAccordion) {
        setOpenAccordion(index);
     } else {
       setOpenAccordion(null);
    }
    if (index === openAccordion) {
      gsap.to(
        accordionRefs.current[index].querySelector(".accordion__details"),
        {
          height: 0,
          duration: 1,
          ease: "power1.inOut",
         }
      );
    }
    else {
      if (openAccordion !== null) {
        gsap.to(
          accordionRefs.current[openAccordion].querySelector(
            ".accordion__details"
          ),
          {
            height: 0,
            duration: 1,
            ease: "power1.inOut",
          }
        );
      }
      setOpenAccordion(index);
      gsap.fromTo(
        accordionRefs.current[index].querySelector(".accordion__details"),
        { height: 0 },
        {
          height: "auto",
          duration: 1,
          ease: "power1.inOut",
        }
      );
    }
  };

return <div className="accorder">
<div className={`accordion__container animate`} ref={accordionContainer} id="Gideon">
<h2 className="accordion-title-faq ">Frequently Asked Questions <FaQuestion />
</h2>
   <div className={`accordion__item  ${openAccordion === 0 ? "open" : ""} `} style={{"--index" : 1}} ref={(el) => (accordionRefs.current[0] = el)} > 
      <div className="accordion__header"     onClick={() => handleAccordionClick(0)}>
      <p className="accordion__number">01</p>
            <p className="accordion__name">What is this platform for?</p>
            <p className="plus-minus">{ openAccordion === 0 ? 
            <BiPlus size={20}/> : <BiMinus />}</p>
      </div>
      <div className="accordion__details">
      <ul>
              <li>
              Our platform is designed to help writers, Bloggers of all skill levels improve their writing abilities and connect with other writers and writing enthusiasts.
              </li>
          
            </ul>
      </div>
      </div>
   <div className={`accordion__item  ${openAccordion === 1 ? "open" : ""} `} style={{"--index" : 2}}  ref={(el) => (accordionRefs.current[1] = el)}>
      <div className="accordion__header"     onClick={() => handleAccordionClick(1)}>
      <p className="accordion__number">02</p>
            <p className="accordion__name">How can I get started on the platform?</p>
            <p className="plus-minus">{ openAccordion === 1 ? 
            <BiPlus size={20}/> : <BiMinus />}</p>
      </div>
      <div className="accordion__details">
      <ul>
              <li>
              Simply create an account on our platform, and you can start posting your writing, providing feedback on others' writing, and joining writing groups and discussions.
              </li>
           
            </ul>
      </div>
   </div>
   <div className={`accordion__item   ${openAccordion === 2 ? "open" : ""}` } style={{"--index" : 3}}  ref={(el) => (accordionRefs.current[2] = el)}> 
      <div className="accordion__header"     onClick={() => handleAccordionClick(2)}>
      <p className="accordion__number">03</p>
            <p className="accordion__name">What kinds of writing can I post?</p>
            <p className="plus-minus">{ openAccordion === 2 ? 
            <BiPlus size={20}/> : <BiMinus />}</p>
      </div>
      <div className="accordion__details">
      <ul>
              <li>
              You can post your write-ups under various categories that are specified on our platform that suites the content given
              </li>
           
            </ul>
      </div>
   </div>
   <div className={`accordion__item   ${openAccordion === 3 ? "open" : ""}` } style={{"--index" : 4}}  ref={(el) => (accordionRefs.current[3] = el)}> 
      <div className="accordion__header"     onClick={() => handleAccordionClick(3)}>
      <p className="accordion__number">04</p>
            <p className="accordion__name">Are there writing contests or challenges?</p>
            <p className="plus-minus">{ openAccordion === 3 ? 
            <BiPlus size={20}/> : <BiMinus />}</p>
      </div>
      <div className="accordion__details">
      <ul>
              <li>
              Yes, we regularly host writing contests and challenges for our users. These challenges offer opportunities to showcase your writing skills, win prizes, and gain recognition in the writing community.
              </li>
           
            </ul>
      </div>
   </div>
   <div className={`accordion__item   ${openAccordion === 4 ? "open" : ""}` } style={{"--index" : 5}}  ref={(el) => (accordionRefs.current[4] = el)}> 
      <div className="accordion__header"     onClick={() => handleAccordionClick(4)}>
      <p className="accordion__number">05</p>
            <p className="accordion__name">Can I get feedback on my writing?</p>
            <p className="plus-minus">{ openAccordion === 4 ? 
            <BiPlus size={20}/> : <BiMinus />}</p>
      </div>
      <div className="accordion__details">
      <ul>
              <li>
              Yes! Our platform provides opportunities for writers to receive feedback on their work. You can post your writing in dedicated feedback forums or private groups, where other writers and editors can offer constructive criticism and advice.
              </li>
             
            </ul>
      </div>
   </div>
   
   
</div>
</div>
}
export default Faq