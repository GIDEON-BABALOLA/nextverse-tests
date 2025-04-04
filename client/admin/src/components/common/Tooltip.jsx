
import "../../styles/components/common/tooltip.css"

const Tooltip = ({text}) => {
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
>Hover over me</span>
    </div>
  )
}

export default Tooltip