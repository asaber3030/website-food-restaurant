import './profile.scss'

import { Head } from '@inertiajs/react';

import Layout from "@/layouts/Layout";
import ProfileLayout from "@/pages/Profile/ProfileLayout";
import UpdatePasswordForm from "@/pages/Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformation from "@/pages/Profile/Partials/UpdateProfileInformationForm";
import DeleteUserForm from "@/pages/Profile/Partials/DeleteUserForm";

export default function Profile() {
  return (
    <Layout>
      <Head title="Profile" />
      <ProfileLayout>

        <UpdateProfileInformation className='default-form-section' />
        <UpdatePasswordForm className='default-form-section' />
        <DeleteUserForm className='default-form-section' />
      </ProfileLayout>
    </Layout>
  );
}
