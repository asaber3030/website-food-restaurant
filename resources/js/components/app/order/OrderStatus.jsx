import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faLightbulb, faBowlFood, faTruck, faSyncAlt} from "@fortawesome/free-solid-svg-icons";

const OrderStatus = ({ order }) => {
  return (
    <div className="order-status">
      <div className="status-section">
        <div className={`bar ${(order.status == 1 || order.status > 1) ? 'active-bar' : ''}`}></div>
        <div className="text">
          {(order.status == 1 || order.status > 1) ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faLightbulb} />
          )}
          <div>Under Reviewing</div>
        </div>
      </div>
      <div className="status-section">
        <div className={`bar ${(order.status > 1) ? 'active-bar' : ''}`}></div>
        <div className="text">
          {order.status < 2 ? (
            <FontAwesomeIcon icon={faBowlFood} />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )}
          <div>Cooking!</div>
        </div>
      </div>
      <div className="status-section">
        <div className={`bar ${(order.status > 2) ? 'active-bar' : ''}`}></div>
        <div className="text">
          {order.status < 3 ? (
            <FontAwesomeIcon icon={faTruck} />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )}
          <div>Out for delivery</div>
        </div>
      </div>
      <div className="status-section">
        <div className={`bar ${(order.status > 3) ? 'active-bar' : ''}`}></div>
        <div className="text">
          {order.status < 4 ? (
            <FontAwesomeIcon icon={faSyncAlt} />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )}
          <div>Done!</div>
        </div>
      </div>
    </div>
  )
}
export default OrderStatus
