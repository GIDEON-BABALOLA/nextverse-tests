
import { Backdrop, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
const SidebarItem = ({ icon, title }) => {

  return (
    <Tooltip title={title} placement="right" arrow={true}  enterDelay={0}
  
    slotProps={{
      popper: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -14],
              Backdrop : "red"
            },
          },
        ],
      },
      tooltip : {
        sx: {
          fontSize : "1rem",
          fontFamily : "Poppins",
          padding : "7px",
          // backgroundColor : "black",
          // color : "white"
        }
      }
    }}
    >
    <IconButton>
   {icon}
    </IconButton> 
    </Tooltip>
  )
}

export default SidebarItem