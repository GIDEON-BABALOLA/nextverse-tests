const Percentage = ({ trend, value}) => {
  return (
    <>
    {
      trend == "uptrend" ?
    <span className='litenote-dashboard-success litenote-dashboard-h-five'>+{value}%</span>
    :
    <span className='litenote-dashboard-danger litenote-dashboard-h-five'>-{value}%</span>
    }
    </>

  )
}

export default Percentage