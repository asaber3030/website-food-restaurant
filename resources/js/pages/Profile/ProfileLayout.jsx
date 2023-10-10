import ProfileSidebar from "@/pages/Profile/ProfileSidebar";

const ProfileLayout = ({ children }) => {
  return (
    <div className="profile-layout">
      <ProfileSidebar />
      <div className="profile-content">
        {children}
      </div>
    </div>
  )
}

export default ProfileLayout
