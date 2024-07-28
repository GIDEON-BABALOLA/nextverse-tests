
import "../../styles/components/common/tooltip.css"

const Tooltip = ({text}) => {
    const show = (e) => {
        console.log(e.clientX)
    }
  return (
    <div className='litenote-tooltip'

    >
<span className="litenote-tooltip-text"
style={{
    left : "50%"
}}

>
{text}
</span>
<span
onMouseOver={show}
>Hover over me</span>
    </div>
  )
}

export default Tooltip