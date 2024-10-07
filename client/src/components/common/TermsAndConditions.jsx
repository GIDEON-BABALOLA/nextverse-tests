import "../../styles/components/common/termsandconditions.css"
import styles from "../../styles/components/common/test.module.css"
import { FaShieldAlt, FaTimes } from "react-icons/fa";
import { setCookie } from "../../helpers/CookiesConfiguration";

import { useRef } from "react"
import { useConsentContext } from "../../hooks/useConsentContext";
const TermsAndConditions = () => {
	const { termsAndConditions, showTermsAndConditions } = useConsentContext()
  const modalRef = useRef()
  const closeModal = (e) => {
	console.log(e.target.innerHTML)
	switch (e.target.innerHTML) {
		case "Accept":
			setCookie("terms-and-conditions", "accepted", 365 )
			break;
		case "Decline":
		setCookie("terms-and-conditions", "declined", 365)
		break;
	}      
	showTermsAndConditions(false)
  }
  return (
    <>{termsAndConditions && 
    <div className="litenote-terms-and-conditions-modal">
	<article 
     
  
   ref={modalRef}
   className={styles.test}>
		<header className="litenote-terms-and-conditions-modal-container-header">
			<h1 className="litenote-terms-and-conditions-modal-container-title">
			<FaShieldAlt />

				TERMS AND CONDITIONS APPLIED
			</h1>
			<button className="litenote-terms-and-conditions-icon-button"
       onClick={closeModal}>
		<FaTimes 
       
    />
			</button>
		</header>
		<section 
    className="litenote-terms-and-conditions-modal-container-body rtf">
			<p>	* This website is intended for users aged 13 and above.</p>
			<p>	* You must not use this website to engage in any illegal or unethical activities.</p>
			<p>	* We reserve the right to modify or discontinue any aspect of the website at any time without notice.</p>
			<p>* All user-generated content must be original and may not infringe on any copyright, trademark, or other intellectual property rights.</p>
			<p>* You grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and display any user content you submit to the website.</p>
			<p>* We reserve the right to remove any user content that we deem inappropriate, offensive, or illegal.</p>
			<p>* We are not responsible for any loss or damage resulting from user-generated content.</p>
		</section>
		<footer className="litenote-terms-and-conditions-modal-container-footer">
			<button className="litenote-terms-and-conditions-button is-primary"
        onClick={closeModal}>Accept</button>
		<button
		onClick={closeModal} className="litenote-terms-and-conditions-button"
		style={{backgroundColor : "#E5E5E5"}}
		>
			Decline
		</button>
		</footer>
	</article>
</div>
    }
    </>
  )
}

export default TermsAndConditions