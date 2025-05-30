import { useState, useEffect } from "react";
import "../styles/PrivacyPolicy/privacy-policy.css"
import { FaShieldAlt } from "react-icons/fa";
const TermsAndConditionsPage = () => {
    const data = [
                      {
            title : "Age Restriction",
            description: "This website is intended for users aged 13 and above.",
        },
        {
            title : "Prohibited Activities",
            description: "You must not use this website to engage in any illegal or unethical activities.",
        },
            {
            title : "Modification of Services",
            description: "We reserve the right to modify or discontinue any aspect of the website at any time without notice.",
        },
           {
            title : "Intellectual Property Compliance",
            description: "All user-generated content must be original and may not infringe on any copyright, trademark, or other intellectual property rights.",
        },
              {
            title : "License to Use User Content",
            description: "You grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and display any user content you submit to the website.",
        },
              {
            title : "Content Moderation Rights",
            description: "We reserve the right to remove any user content that we deem inappropriate, offensive, or illegal.",
        },
            {
            title : "Disclaimer of Liability",
            description: "We are not responsible for any loss or damage resulting from user-generated content.",
        },
    ]
        const [openSections, setOpenSections] = useState({});
   const showCurrentPrivacyPolicy = (e, index) => {
  setOpenSections((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));

  // Ensure we get the correct section DOM element
  const sectionElement = e.currentTarget.parentElement;
  const content = sectionElement.querySelector(".privacy-policy-accordion-content");

  if (content) {
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
};

return <>
<div className="privacy-policy-section-container">
    <div style={{display : "flex", flexDirection : "column", alignItems : "center", marginBottom : "10px", justifyContent : "space-between", gap : "5px"}} >
<span className="privacy-policy-original-title"><FaShieldAlt color="#FF5E62"/> Terms And Conditions Applied</span>
<span style={{fontWeight : "700", fontSize : "1.5rem"}}>Effective Date: May 28, 2025</span>
 <a href="/litenote terms and conditions.pdf" download style={{ textDecoration: 'none' }}>
<div style={{fontSize : "1.3rem", color: "#ff7163", cursor : "pointer"}}>
       
        Download a copy of this Terms and Conditions (PDF)
   
</div>
   </a>
    </div>
  <div className="privacy-policy-box">
    <div>
{data.map((section, index) => ( 
  <div key={index} style={{ marginTop: "20px" }}>
      <hr />
    <div style={{display: "flex", flexDirection: "row", justifyContent : "space-between", cursor : "pointer", alignItems : "center", padding : "20px 5px"}} 
    onClick={(e) => {showCurrentPrivacyPolicy(e, index);}} className="headings-po">
    <span  className="privacy-policy-accordion-title" >{section.title}</span>
         {openSections[index] ? <span  className="privacy-policy-accordion-symbol" >-</span> : 
         <span  className="privacy-policy-accordion-symbol" >+</span> }
    </div>
 

    <div  className="privacy-policy-accordion-content" style={{fontSize : "2rem"}}>
    <p>{section.description}</p>
    </div>

  </div>
))}



    </div>

  </div>
</div>


</>
}
export default TermsAndConditionsPage