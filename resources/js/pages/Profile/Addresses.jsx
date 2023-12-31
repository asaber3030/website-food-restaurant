import './profile.scss'

import Layout from "@/layouts/Layout";
import ProfileLayout from "@/pages/Profile/ProfileLayout";

import {useForm, usePage, Link, Head} from "@inertiajs/react";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Inertia} from "@inertiajs/inertia";

const Addresses = () => {

  const {addresses} = usePage().props

  const {data, setData, errors, post, recentlySuccessful} = useForm({
    address: '',
    governorate: ''
  })

  const handleAddAddress = (e) => {
    e.preventDefault();
    post(route('profile.addresses.add'))
  }

  const handleDeleteAddress = (address) => {
    Inertia.delete(route('profile.addresses.delete'), {
      address: address
    })
  }

  const handleMainAddress = (address) => {
    Inertia.post(route('profile.addresses.main'), {
      address: address
    })
  }

  return (
    <Layout>
      <Head title='Addresses' />

      <ProfileLayout>

        <div className="addresses-container">

          <h3>My Addresses</h3>

          {addresses.length > 0 ? (
            <div className="addresses">
              {addresses.map(address => (
                <div className="address">
                  <h6>{address.main == 1 ? <FontAwesomeIcon className='mr-2 text-success' icon={faCheck}/> : ''}
                    <span>{address.gove}</span> - {address.address}</h6>
                  <div className="actions">
                    <button onClick={() => Inertia.post(route('profile.addresses.delete'), {
                      address: address.id
                    })}>Delete
                    </button>
                    <button onClick={() => Inertia.post(route('profile.addresses.main'), {
                      address: address.id
                    })}>Main</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-sm alert-dark">No Addresses!</div>
          )}

          {addresses.length < 5 && (
            <form onSubmit={handleAddAddress}>
              <h4 className='mt-6'>Add New Address</h4>
              <div>
                <TextInput
                  id="address"
                  name="address"
                  value={data.address}
                  handleChange={(e) => setData('address', e.target.value)}
                  className="mt-1 block w-3/4"
                  placeholder="Address"
                />

                <InputError message={errors.address} className="mt-2"/>
              </div>
              <div className="mt-6">
                <TextInput
                  id="governorate"
                  name="governorate"
                  value={data.governorate}
                  handleChange={(e) => setData('governorate', e.target.value)}
                  className="mt-1 block w-3/4"
                  placeholder="Governorate"
                />

                <InputError message={errors.governorate} className="mt-2"/>
              </div>

              <button className="btn btn-warning mt-6">Save</button>
            </form>
          )}

        </div>

      </ProfileLayout>

    </Layout>
  )
}

export default Addresses
