import './sandwich.scss'
import {usePage} from "@inertiajs/react";
import formatMoney from "@/helpers/functions/format-money";

const Sandwich = ({ sandwich, children, keyD }) => {

  const { name, ingredients, image, price, id } = sandwich
  const { url } = usePage().props

  return (
    <div className="sandwich" key={keyD}>
      <div className="sandwich-image">
        <img src={url + image} alt="Sandwich Image" />
      </div>
      <div className="sandwich-description">
        <h6 className='sandwich-title'>{name}</h6>
        <div className="sandwich-ingredients">
          {ingredients.split(',').map((item, idx) => (
            <div className="ingredient" key={idx}>{item}</div>
          ))}
        </div>
        <p className="sandwich-price">{formatMoney(price)}</p>
      </div>
      <div className="sandwich-footer">
        {children}
      </div>
    </div>
  )

}

export default Sandwich
