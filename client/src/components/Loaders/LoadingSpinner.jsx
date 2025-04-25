import {  Loader } from "lucide-react";
import "../../styles/components/Loaders/loading-spinner.css"
const LoadingSpinner = ({...props}) => {
	return (
        <Loader className="lucide-loader"  {...props}/>

	);
};

export default LoadingSpinner;