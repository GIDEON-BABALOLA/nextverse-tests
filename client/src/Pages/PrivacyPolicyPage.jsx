import { useState, useEffect } from "react";
import "../styles/PrivacyPolicy/privacy-policy.css"
const PrivacyPolicyPage = () => {
    const data = [
                      {
            title : "Introduction",
            description: "Welcome to Litenote. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and use our services.",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : []
                },
            ]
        },
        {
            title : "Information We Collect",
            description: "We collect information to provide better services to all our users. The types of information we collect include:",
            points: [
                {
                    title: "Personal Information",
                    subtitle: "When you register on Litenote, we may collect the following personal information:",
                    content : ["Account Information: Username, email address, and password.", "Profile Information: Profile picture, bio, and other details you choose to provide.", "Content: Articles, stories, comments, likes, bookmarks, and other content you create or interact with on the platform"]
                },
                {
                    title: "Usage Data",
                    subtitle: "We automatically collect information about your interactions with our website, including",
                    content : ["Device Information: IP address, browser type, operating system, and device identifiers.", "Log Data: Pages visited, time spent on pages, links clicked, and other usage statistics.", "Cookies and Tracking Technologies: We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content."]
                }
            ]
        },
            {
            title : "How We Use Your Information",
            description: "We use the collected information for various purposes, including:",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : [
                    "Providing Services: To operate and maintain Litenote, including account creation, content publication, and user interactions.",
                    "Improving User Experience: To understand how users interact with our platform and to enhance functionality and content offerings.",
                    "Communication: To send you updates, newsletters, and other information related to your use of Litenote",
                    "Security: To detect, prevent, and address technical issues, unauthorized access, and fraudulent activities.",
                    "Legal Compliance: To comply with legal obligations and enforce our terms and policies."
                ]
                }
            ]
        },
           {
            title : "Sharing Your Information",
            description: "We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : ["Service Providers: We may share information with third-party vendors who perform services on our behalf, such as hosting, analytics, and customer support.",
                         "Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.", 
                         "Business Transfers: In the event of a merger, acquisition, or asset sale, your information may be transferred as part of that transaction."]
                },
            ]
        },
              {
            title : "Data Retention",
            description: "We retain your personal information only for as long as necessary to provide you with our services and for legitimate and essential business purposes, such as maintaining the performance of Litenote, making data-driven business decisions, complying with legal obligations, and resolving disputes.",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : []
                },
            ]
        },
              {
            title : "Security of Your Information",
            description: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure.",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : []
                },
            ]
        },
            {
            title : "Your Data Protection Rights",
            description: "Depending on your location, you may have the following rights regarding your personal information:",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : ["Access: The right to request copies of your personal data.",
                         "Rectification: The right to request that we correct any information you believe is inaccurate.", 
                         "Erasure: The right to request that we erase your personal data, under certain conditions.",
                         "Restriction of Processing: The right to request that we restrict the processing of your personal data, under certain conditions.",
                        "Objection to Processing: The right to object to our processing of your personal data, under certain conditions."]
                },
            ]
        },
               {
            title : "Children's Privacy",
            description: "Litenote is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : []
                },
            ]
        },
              {
            title : "Third-Party Links",
            description: "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third parties. We encourage you to read the privacy policies of any third-party websites you visit.",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : []
                },
            ]
        },
              {
            title : "Changes to This Privacy Policy",
            description: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the Effective Date at the top. You are advised to review this Privacy Policy periodically for any changes.",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : []
                },
            ]
        },
           {
            title : "Contact Us",
            description: "If you have any questions or concerns about this Privacy Policy, please contact us at:",
            points: [
                {
                    title: "",
                    subtitle: "",
                    content : ["Email: nextverse.101@gmail.com",
                        "Email: nextverse74@gmail.com"
                    ]
                },
            ]
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
<span className="privacy-policy-original-title">Privacy Policy For Litenote</span>
<span style={{fontWeight : "700", fontSize : "1.5rem"}}>Effective Date: May 28, 2025</span>
 <a href="/litenote privacy policy.pdf" download style={{ textDecoration: 'none' }}>
<div style={{fontSize : "1.3rem", color: "#ff7163", cursor : "pointer"}}>
       
        Download a copy of this Privacy Policy (PDF)
   
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
 

    <div  className="privacy-policy-accordion-content">
    <p>{section.description}</p>

    {section.points.map((point, idx) => (
      <div key={idx} style={{ marginTop: "15px" }}>
        <h4>{point.title}</h4>
        <p>{point.subtitle}</p>
        <ol>
          {point.content.map((item, i) => (
            <li key={i} style={{padding : "5px 2px"}}>
                <b>{item.split(":")[0]}:</b>  {item.split(":")[1]  }</li>
            
          ))}
        </ol>
      </div>
    ))}
    </div>

  </div>
))}



    </div>

  </div>
</div>


</>
}
export default PrivacyPolicyPage