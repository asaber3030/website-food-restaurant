import { Link, usePage } from "@inertiajs/react";
import {useEffect, useState} from "react";
import { Snackbar } from "@mui/material";

import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavDropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClose, faMinus, faPlus, faShoppingCart, faSignIn, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import ShoppingCartImage from '@/assets/images/shopping.png'
import { APP_URL } from "@/helpers/constants";

import formatMoney from "@/helpers/functions/format-money";

const Navbar = () => {

  const { user } = usePage().props
  const [shoppingCart, setShoppingCart] = useState(false)

  const [cartItems, updateCartItems] = useState(JSON.parse(localStorage.getItem('cart')) ?? [])

  const [toastStatus, setToastStatus] = useState(false)

  const clearCart = () => {
    updateCartItems(items => [])
    localStorage.setItem('cart', JSON.stringify([]))
  }

  const handleIncrease = (item) => {
    updateCartItems(items => [
      ...cartItems.map(currentItem => {
        if (currentItem.id === item.id) {
          return {
            ...currentItem,
            quantity: currentItem.quantity + 1,
            price: currentItem.unitPrice * (currentItem.quantity + 1)
          }

        } else {
          return { ...currentItem }
        }

      })
    ])

    console.log(cartItems)

  }

  const handleDecrease = (item) => {
    updateCartItems(items => [
      ...items.map(currentItem => {
        if (currentItem.id === item.id) {
          if (currentItem.quantity > 0) {
            return {
              ...currentItem,
              quantity: currentItem.quantity - 1 == 0 ? 1 : --currentItem.quantity,
              price: currentItem.quantity - 1 == 0 ? 1 * currentItem.unitPrice : currentItem.price - currentItem.unitPrice
            }
          }
        }
        return { ...currentItem }
      })
    ])

    console.log(cartItems)
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  const handleRemoveItem = (item) => {
    setToastStatus(true)
    updateCartItems(items => [
      ...items.filter(x => x.id != item.id)
    ])

    console.log(cartItems)
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <nav id="app-navbar">

      <Snackbar
        ContentProps={{
          sx: { backgroundColor: '#f17171', color: '#fff' }
        }}
        open={toastStatus}
        autoHideDuration={4000}
        onClose={ () => { setToastStatus(false); } }
        message={'Item has been removed successfully!'}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />

      <div className="menu">
        <button onClick={ () => setShoppingCart(true) }><img src={ShoppingCartImage} /></button>
      </div>

      <div className="app-logo">
        <Link href='/'>Order</Link>
      </div>

      <div className="app-links">
        {user ? (
          <NavDropdown
            id="user-dropdown-list"
            title={`${user.name}`}
            menuVariant="dark"
          >
            <Link className='dropdown-item' href={route('profile.edit')}>Profile</Link>
            <Link className='dropdown-item' href={route('profile.addresses.main-page')}>Addresses</Link>
            <Link className='dropdown-item' href={route('profile.orders.main')}>Orders</Link>
            <NavDropdown.Divider />
            <Link className='dropdown-item' href="#action/3.4">Logout</Link>
          </NavDropdown>
        ) : (
          <ul className='no-dropdown-links'>
            <Link href={route('login')}><FontAwesomeIcon icon={faSignIn} /> Login</Link>
            <Link href={route('register')}><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
          </ul>
        )}
      </div>

      <Offcanvas className='shopping-cart-left' show={shoppingCart} onHide={ () => setShoppingCart(false) }>

        <Offcanvas.Header closeButton>
          <Offcanvas.Title><FontAwesomeIcon icon={faShoppingCart} /> Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>

          {cartItems.length > 0 ? (
            <div className="food-items-cart">

              {cartItems.map((item, idx) => (
                <div className="food-item" key={idx}>
                  <div
                    className="remove-item"
                    onClick={ () => handleRemoveItem(item) }
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </div>
                  <div className="left-food-item">
                    <img src={APP_URL + item.image} alt=""/>
                  </div>
                  <div className="right-food-item">
                    <h6 className='item-name'>{item.name}</h6>
                    <p className='item-ingredients'>{item.ingredients}</p>
                    <div className="flex justify-between align-items-center">
                      <p className='item-price'>{formatMoney(item.price)}</p>
                      <div className="quantity-selection">
                        <div className="action-sign" onClick={ () => handleIncrease(item) }><FontAwesomeIcon icon={faPlus} /></div>
                        <div className="value">{item.quantity}</div>
                        <div className="action-sign" onClick={ () => handleDecrease(item) }><FontAwesomeIcon icon={faMinus} /></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="actions gap-2 flex">
                <Link href={ route('place.order') } className="btn btn-warning btn-sm">Place Order</Link>
                <button onClick={clearCart} className="btn btn-danger btn-sm">Clear Cart</button>
              </div>

            </div>
          ) : (
            <h6>Empty for now!</h6>
          )}

        </Offcanvas.Body>

      </Offcanvas>

    </nav>
  )
}

export default Navbar
