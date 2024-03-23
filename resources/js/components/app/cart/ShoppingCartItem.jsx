import formatMoney from "@/helpers/functions/format-money";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { APP_URL } from "@/helpers/constants";

const CartItem = ({ item }) => {
  return (
    <div className="food-item">
      <div className="left-food-item">
        <img src={APP_URL + item.image} alt=""/>
      </div>
      <div className="right-food-item">
        <h6 className='item-name'>{item.name}</h6>
        <p className='item-ingredients'>{item.ingredients}</p>
        <div className="flex justify-between align-items-center">
          <p className='item-price'>{formatMoney(item.price)}</p>
          <div className="quantity-selection">
            <div className="action-sign"><FontAwesomeIcon icon={faPlus} /></div>
            <div className="value">{item.quantity}</div>
            <div className="action-sign"><FontAwesomeIcon icon={faMinus} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
