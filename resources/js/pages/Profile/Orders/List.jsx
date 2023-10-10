import '../profile.scss'

import { Head, Link, usePage } from "@inertiajs/react";

import Order from "@/components/app/order/Order";
import Pagination from "@/components/Pagination";
import Layout from "@/layouts/Layout";
import ProfileLayout from "@/pages/Profile/ProfileLayout";

const List = () => {

  const { orders } = usePage().props

  console.log(orders)

  return (
    <Layout>

      <Head title='Orders' />

      <ProfileLayout>
        <div className="orders-container">
          <h3 className='orders-title-main'>My Orders <span>{orders.data.length + ` order${orders.data.length > 0 ? 's' : ''}`}</span></h3>

          {orders.data.length > 0 ? (
            <>
              <div className="list-orders">
                {orders.data.map(order => (
                  <Order order={order} />
                ))}
              </div>

              <Pagination
                links={orders.links}
              />
            </>

          ) : (
            <div className="alert alert-sm alert-secondary">
              No Orders. <Link href={route('home')}>Order Page</Link>
            </div>
          )}

        </div>
      </ProfileLayout>
    </Layout>
  )
}

export default List
