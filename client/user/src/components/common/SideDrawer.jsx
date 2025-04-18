import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { MdClose } from 'react-icons/md';
import Box from '@mui/material/Box';
export default function SideDrawer({ open, toggleDrawer, anchor}) {
  console.log(open);
  
  return (
    <div>
      <SwipeableDrawer 
      className= "swipe-drawer"
       sx={{ width: 250, }} 
      open={open} onClose={() => {toggleDrawer(false)}} anchor={anchor}>
      <Box sx={{ width: 300, padding : "20px 10px" }}>
        <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
        <span style={{fontSize : "2rem", fontWeight : 600}}>Report A User</span>
        <MdClose onClick={() => toggleDrawer(false) } style={{cursor : "pointer"}} size={30}/>
        </div>
      </Box>

      </SwipeableDrawer>
    </div>
  );
}
