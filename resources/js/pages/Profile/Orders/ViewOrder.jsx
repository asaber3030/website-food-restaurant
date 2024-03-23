import '../profile.scss'

import Layout from "@/layouts/Layout";
import ProfileLayout from "@/pages/Profile/ProfileLayout";
import OrderStatus from "@/components/app/order/OrderStatus";

import { Head, useForm, usePage } from "@inertiajs/react";
import { APP_URL } from "@/helpers/constants";
import formatDate, { fullDateOptions } from "@/helpers/functions/format-date";
import formatMoney from "@/helpers/functions/format-money";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDollar, faListNumeric, faPercentage, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const ViewOrder = () => {

  const { order } = usePage().props
  const { post, processing } = useForm({
    id: order.id
  })

  const [orderStatus, setOrderStatus] = useState(false)

  const handleCancel = (e) => {
    e.preventDefault();
    post(route('profile.orders.cancel', order.id))
  }

  return (
    <Layout>

      <Head title={`View Order - #${order.id}`} />

      <ProfileLayout>

        <div className="order-view-container">
          <div className="order-title">
            <h4>Order Review ID: #{order.id}</h4>
            <p>{ formatDate(order.created_at, fullDateOptions) }</p>
          </div>
          <OrderStatus order={order} />
          <div className="order-details">
            <ul>
              <li><span><FontAwesomeIcon fixedWidth={true} icon={faPercentage} /> Coupon</span> <span className='green-c'>{order.coupon.id == 1 ? 'Not Used' : <span className='green-c'>{order.coupon.code} -{order.coupon.value}%</span>}</span></li>
              {order.coupon.id !== 1 && (
                <li><span><FontAwesomeIcon fixedWidth={true} icon={faDollar} /> Coupon Discount Value</span> <span className='green-c'>{formatMoney(order.coupon_discount)}</span></li>
              )}
              <li><span><FontAwesomeIcon fixedWidth={true} icon={faListNumeric} /> Number or items</span> <span className='green-c'>{order.total_items} item(s)</span></li>
              <li><span><FontAwesomeIcon fixedWidth={true} icon={faDollar} /> Total Money</span> <span className='green-c'>{formatMoney(order.total_price)}</span></li>
              <li><span><FontAwesomeIcon fixedWidth={true} icon={faDollar} /> After Discount (Required)</span> <span className='green-c'>{formatMoney(order.required_money)}</span></li>
            </ul>
          </div>

          <div className="list-items">
            {order.order_items.map(item => (
              <div className="item">
                <div className="item-image">
                  <img src={APP_URL + item.sandwich.image} alt=""/>
                </div>
                <div className="item-description">
                  <h6 className='item-name text-center'>{item.sandwich.name}</h6>
                </div>
                <div className="item-footer">
                  {formatMoney(item.price)}
                </div>
              </div>
            ))}
          </div>

          {order.status === 1 && (
            <div className="cancel-order mt-2 flex gap-1">
              {orderStatus && (
                <form onSubmit={handleCancel}>
                  <button type={'submit'} disabled={processing} className="btn btn-warning text-black">
                    {processing && (
                      <FontAwesomeIcon className={'mr-4 text-black animate-spin'} icon={faSpinner} />
                    )}
                    Confirm Cancel
                  </button>
                </form>
              )}
              <button onClick={ () => setOrderStatus(!orderStatus) } className="btn btn-danger">
                Cancel Order?
              </button>
            </div>
          )}
        </div>

      </ProfileLayout>

    </Layout>
  )
}

export default ViewOrder
