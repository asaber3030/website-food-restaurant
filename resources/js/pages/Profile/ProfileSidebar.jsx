import { Link } from "@inertiajs/react";

const ProfileSidebar = () => {
  return (
    <div className="profile-sidebar">
      <Link href={ route('profile.edit') }>Profile</Link>
      <Link href={ route('profile.addresses.main-page') }>Addresses</Link>
      <Link href={ route('profile.orders.main') }>Orders</Link>
    </div>
  )
}

export default ProfileSidebar
