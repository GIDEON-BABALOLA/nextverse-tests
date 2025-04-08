
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
export default function SimpleBadge({ fontSize, badgeColor, iconColor, number}) {
  return (
    <Badge badgeContent={number} 
    showZero={true}
    sx={{
      '& .MuiBadge-badge': {
        backgroundColor: badgeColor,  // Custom background
        color: 'white',              // Text color
        fontSize: '12px',
        height: '20px',
        minWidth: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 0 2px ${badgeColor}',
      }
    }}
    >
      <NotificationsNoneOutlinedIcon color="action" sx={{ fontSize: fontSize, color : iconColor }} />
    </Badge>
  )
}
