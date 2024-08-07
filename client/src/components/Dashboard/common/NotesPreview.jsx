import { FaPlus, FaEdit } from "react-icons/fa" 
import { FaEllipsis } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import "../../../styles/components/Dashboard/notes-preview-page.css"
import useWindowSize from "../../../hooks/useWindowSize"
const NotesPreview = () => {
    const { width } = useWindowSize()
    console.log(width)
return <>
    <section className="litenote-dashboard-notes-preview" >
<div className="wrapper">
<li className="add-box">
<div className="icon"><FaPlus /></div>
<p>Add new note</p>
</li>
<li className = "note">
<div className="details">
<p>This is a Title</p>
<span>Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...</span>

</div>
<div className="bottom-content">
<span>April 3, 2022</span>
<div className = "settings">
<FaEllipsis />
</div>
</div>
</li>
<li className = "note">
<div className="details">
<p>This is a Title</p>
<span>Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...</span>

</div>
<div className="bottom-content">
<span>April 3, 2022</span>
<div className = "settings">
<FaEllipsis />
</div>
</div>
</li>
<li className = "note">
<div className="details">
<p>This is a Title</p>
<span>Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...</span>

</div>
<div className="bottom-content">
<span>April 3, 2022</span>
<div className = "settings">
<FaEllipsis />
</div>
</div>
</li>
<li className = "note">
<div className="details">
<p>This is a Title</p>
<span>Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...</span>

</div>
<div className="bottom-content">
<span>April 3, 2022</span>
<div className = "settings">
<FaEllipsis />
</div>
</div>
</li>
<li className = "note">
<div className="details">
<p>This is a Title</p>
<span>Download the perfect boulders pictures. Find over 100+ of the best free boulders images. Free for commercial use ✓ No attribution required ✓ Copyright ...</span>

</div>
<div className="bottom-content">
<span>April 3, 2022</span>
<div className = "settings">
<FaEllipsis />
<ul className = "menu">
<li style={{whiteSpace : "nowrap"}}><FaEdit size={20} /> Read More</li>
<li><FaEdit size={20} />Edit</li>
<li><MdDelete size={20}/>Delete</li>
</ul>
</div>
</div>
</li>
</div>
    </section>
</>
}
export default NotesPreview