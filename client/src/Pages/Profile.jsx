
import Profile from "../components/Profile/Profile"
import "../styles/components/Profile/profile.css"
import { useAuthContext } from "../hooks/useAuthContext"
import RotationLoader from "../components/Loaders/RotationLoader"
const ProfilePage = () => {
  const { user } = useAuthContext();
  return (
  <>
    { user ? <Profile /> :   <div className="profile-rotation-parent-container">
      <RotationLoader />
      </div>}
  </>
  )
}

export default ProfilePage