import { APP_URL } from "@/helpers/constants";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DisplayCoupon from "@/components/app/display-coupon/DisplayCoupon";

import formatMoney from "@/helpers/functions/format-money";
import formatDate from "@/helpers/functions/format-date";


const Order = ({ order }) => {
  return (
    <div className="order-container" key={order.id} onClick={ () => Inertia.visit(route('profile.orders.view', order.id)) }>
      <Link><span><FontAwesomeIcon icon={faHashtag} /> Order ID: <b>{order.id}</b></span> <span>{formatDate(order.created_at)}</span></Link>
      <div className="list-sandwiches">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Sandwich</th>
              <th scope="col">Sandwich Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items.map(item => (
              <tr>
                <td><img src={APP_URL + item.sandwich.image} alt=""/></td>
                <td className="align-middle">{item.sandwich.name}</td>
                <td className="align-middle">x{item.quantity}</td>
                <td className="align-middle green-c">{formatMoney(item.unit_price)}</td>
                <td className="align-middle green-c">{formatMoney(item.price)}</td>
              </tr>
            ))}
            <tr>
              <td className="align-middle font-semibold">Used Coupon</td>
              <td className="align-middle"><DisplayCoupon coupon={order.coupon} /></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td className="align-middle font-semibold">Total Items</td>
              <td className="align-middle green-c">{order.total_items + ` item${order.total_items > 0 ? 's' : ''}`}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td className="align-middle font-semibold">Overall Price</td>
              <td className="align-middle green-c">{formatMoney(order.total_price)}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>


            <tr>
              <td className="align-middle font-semibold">Required</td>
              <td className="align-middle green-c">{formatMoney(order.required_money)}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Order
