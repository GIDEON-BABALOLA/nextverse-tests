import { MdCloudDownload } from "react-icons/md"
import axiosConfig from "./axiosConfig";
const Download = () => {
const downloadZipFile = () => {
    axiosConfig({
      url: '/download-waiting-list-error',
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ErrorFiles.zip'); // or any other file name you want
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch((error) => {
      console.error("Error occurred during file download", error);
    });
  };
  return (
    <div style={{color : "white", cursor : "pointer"}}
    onClick={downloadZipFile}
    >
    <MdCloudDownload /> Download Error Logs
   </div>
  )
}

export default Download