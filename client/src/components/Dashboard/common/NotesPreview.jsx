import { FaPlus, FaEdit,  FaReadme } from "react-icons/fa" 
import { FaEllipsis } from "react-icons/fa6"
import { MdDelete, MdSend } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import "../../../styles/components/Dashboard/notes-preview-page.css"
import SpecialModal from "../../common/SpecialModal"
import NoteCard from "./NoteCard"
import SearchCircle from "./SearchCircle"
import { useState } from "react"
import { FaEllipsisV } from "react-icons/fa"
import Dots from "../../../styles/components/common/Icons/Dots"
const NotesPreview = () => {
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] =  useState("")
    const [modalContent, setModalContent] =  useState("")
    const navigate = useNavigate()
    const searchForNotes = () => {
        setModalTitle("Search Notes")
        setModalContent(<div className="user-sticky-search-wrapper">

            <div className="field">
               <input type="text" placeholder="Search Sticky Notes"/>
               <label htmlFor="click" className="btn-2">Search</label>
            </div>
            </div>)
setOpenModal(true)
    }
    const dummyNotes = [
        {
            title : "Automata Computability",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3",
            size : 125,
            time : "11:58am",
            author : "Gideon Babalola"
        },
        {
            title : "Logical Reasoning",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3",
            size : 125,
            time : "11:58am",
            author : "Gideon Babalola"
        },
        {
            title : "Machine Learning",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3",
            size : 125,
            time : "11:58am",
            author : "Gideon Babalola"
        },
        {
            title : "Chemistry Note",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3, 2022",
            size : 125,
            time : "11:58am",
            author : "Gideon Babalola"
        },
        {
            title : "Financial Studies",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3",
            size : 125,
            time : "11:58am",
            author : "Gideon Babalola"
        },
        {
            title : "Dynamic Programming",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3",
            size : 125,
            time : "11:58am",
            author : "Gideon Babalola"
        },
        {
            title : "Obect Oriented Programming",
            content : "Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...",
            date : "April 3",
            size : 125,
            time : "11:58am",
            author : "Gideon Babalola"
        },
    ]

return <>
    <section className="litenote-dashboard-notes-preview" >

    <SearchCircle clickMe={searchForNotes}/>
    <SpecialModal openModal={openModal} setOpenModal={setOpenModal} title={modalTitle} content={modalContent} width={450}/>
    <div className="user-notes-search-wrapper">

<div className="field">
   <input type="text" placeholder="Search Sticky Notes"/>
   <label htmlFor="click" className="btn-2">Search</label>
</div>
</div>
<div className="wrapper">

<li className="add-box" onClick={() => {
    navigate("/note/gideonbabalola69@gmail.com/283938") //This is just a test
}}>
<div className="icon"><FaPlus /></div>
<p>Add new note</p>
</li>
{dummyNotes.map((content,index) => (
    <NoteCard key={index}
     title={content.title}
    time={content.time}
    date={content.date}
    author={content.author}
    setModalTitle={setModalTitle}
    setModalContent={setModalContent}
    setOpenModal={setOpenModal}
    />
))}
</div>
    </section>
</>
}
export default NotesPreview