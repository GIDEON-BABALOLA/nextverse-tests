import { FaPlus, FaEdit,  FaReadme } from "react-icons/fa" 
import { FaEllipsis } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import "../../../styles/components/Dashboard/notes-preview-page.css"
import useWindowSize from "../../../hooks/useWindowSize"
import { MdReadMore } from "react-icons/md"
import SpecialModal from "../../common/SpecialModal"
import { useState } from "react"

const NotesPreview = () => {
    const [openModal, setOpenModal] = useState(false)
    const triggerNoteDelete = () => {
        setOpenModal(true)
    }
    const dummyNotes = [
        {
            title : "This is a Title",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3, 2022"
        },
        {
            title : "This is a Title",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3, 2022"
        },
        {
            title : "This is a Title",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3, 2022"
        },
        {
            title : "This is a Title",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3, 2022"
        },
        {
            title : "This is a Title",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3, 2022"
        },
        {
            title : "This is a Title",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3, 2022"
        },
        {
            title : "This is a Title",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3, 2022"
        },
    ]

return <>
    <section className="litenote-dashboard-notes-preview" >
    <SpecialModal openModal={openModal} setOpenModal={setOpenModal} title="Delete Note" content="Are you sure you want to delete this note"/>
<div className="wrapper">
<li className="add-box">
<div className="icon"><FaPlus /></div>
<p>Add new note</p>
</li>
{dummyNotes.map((content, index) => (
    <li className = "note" key={index}>
<div className="details">
<p>{content.title}</p>
<span>{content.content}</span>

</div>
<div className="bottom-content">
<span>April 3, 2022</span>
<div className = "settings">
<FaEllipsis size={20}/>
<ul className = "menu">
<li style={{whiteSpace : "nowrap"}}><FaReadme size={20} /> Read More</li>
<li><FaEdit size={20} />Edit</li>
<li onClick={triggerNoteDelete}><MdDelete size={20}/>Delete</li>
</ul>
</div>
</div>
</li>
))}
</div>
    </section>
</>
}
export default NotesPreview