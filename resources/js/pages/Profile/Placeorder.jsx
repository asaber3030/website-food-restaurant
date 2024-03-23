import './profile.scss'

import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState} from "react";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Layout from "@/layouts/Layout";
import formatMoney from "@/helpers/functions/format-money";
import FloatingButton from "@/components/FloatingButton";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import { unitPrice } from "@/helpers/functions/unitPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Snackbar, Tooltip } from "@mui/material";

const PlaceOrder = () => {

  const { currentUser, coupons, flash } = usePage().props

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  const [coupon, setCoupon] = useState()
  const [couponObj, setCouponObj] = useState()
  const [couponBtnStatus, setBtnStatus] = useState(false)
  const [couponInputStatus, setInputStatus] = useState(false)
  const [couponMsg, setCouponMsg] = useState('')
  const [couponMsgStatus, setCouponMsgStatus] = useState(false)
  const [orderOverAll, setOrderOverAll] = useState(0)


  console.log({currentUser})

  let sum = 0;
  let totalQuantity = 0;

  let prices = cart.map(item => {
    sum += (item.unitPrice + +item.additionsPrice + +item.sizesPrice) * +item.quantity
    totalQuantity += +item.quantity
  })

  console.log(sum)

  const increaseQty = (item) => {
    setCart(items => [
      ...items.map(currentItem => {
        if (currentItem.id === item.id) {
          return {
            ...currentItem,
            quantity: ++currentItem.quantity,
          }
        } else {
          return {...currentItem}
        }
      })
    ])

    localStorage.setItem('cart', JSON.stringify(cart))
  }
  const decreaseQty = (item) => {
    setCart(items => [
      ...items.map(currentItem => {
        if (currentItem.id === item.id) {
          if (currentItem.quantity > 0) {
            return {
              ...currentItem,
              quantity: currentItem.quantity - 1 == 0 ? 1 : --currentItem.quantity,
            }
          }
        }
        return {...currentItem}
      })
    ])

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const sizeChangedHandler = (params) => {
    setCart(items => [
      ...items.map(currentItem => {
        if (currentItem.id === params.itemID) {
          return {
            ...currentItem,
            sizesPrice: +params.sizePrice,
            choosedSize: params.sizeName,
            newUnitPrice: currentItem.unitPrice + +params.sizePrice + +currentItem.additionsPrice
          }
        }
        return {...currentItem}
      })
    ])

  }
  const additionChangedHandler = (params) => {
    setCart(items => [
      ...items.map(currentItem => {
        if (currentItem.id === params.itemID) {
          return {
            ...currentItem,
            additionsPrice: +params.additionPrice,
            choosedAddition: params.additionName,
            newUnitPrice: currentItem.unitPrice + +params.additionPrice + +currentItem.sizesPrice
          }
        }

        return {...currentItem}
      })
    ])

  }

  const searchCouponHandler = () => {
    const couponFound = coupons.find(x => x.code === coupon)
    if (couponFound) {
      setCoupon(couponFound.code)
      setCouponObj(couponFound)
      setBtnStatus(true)
      setInputStatus(true)
      setCouponMsg('Coupon has been applied successfully!')
      setCouponMsgStatus(true)
      localStorage.setItem('coupon', couponFound.code)
    } else {
      setCouponMsg("Couldn't found this coupon with provided code!")
      setCouponMsgStatus(true)
    }
  }
  const removeCouponApplied = () => {
    localStorage.removeItem('coupon')
    setCoupon('')
    setBtnStatus(false)
    setInputStatus(false)
    setCouponMsg('Coupon has been removed!')
    setCouponMsgStatus(true)
  }

  const placeOrderHandler = () => {
    Inertia.post(route('place.order'), {
      'cart': cart,
      'coupon': coupon
    })
    localStorage.setItem('cart', JSON.stringify([]))
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    cart.forEach(item => {
      setOrderOverAll(x => x + unitPrice(item.newUnitPrice, item.unitPrice) * item.quantity)
    })
  }, [cart])

  useEffect(() => {
    if (localStorage.getItem('coupon') && localStorage.getItem('coupon') != '') {
      setInputStatus(true)
      setBtnStatus(true)
      setCoupon(localStorage.getItem('coupon'))
      setCouponObj(coupons.find(x => x.code == localStorage.getItem('coupon')))
    }

  }, [])

  if (cart.length > 0) {
    return (
      <Layout>

        <Head title='Place order!' />

        <div className="place-order-page">

          <div className="header">
            <h4>Place Order</h4>
            <p>{totalQuantity} items</p>
          </div>

          <div className="content">

            <div className="list-cart-items">

              {cart.map((item, idx) => (
                <div key={idx} className="cart-item">

                  <div className="left">
                    <img src={item.image} alt=""/>
                    <div className="quantity-selection">
                      <div onClick={() => increaseQty(item)} className="action-sign"><FontAwesomeIcon icon={faPlus}/>
                      </div>
                      <div className="value">{item.quantity}</div>
                      <div onClick={() => decreaseQty(item)} className="action-sign"><FontAwesomeIcon icon={faMinus}/>
                      </div>
                    </div>

                  </div>

                  <div className="center">

                    <div className="item-details">

                      <h6 className='item-title-main'>{item.name}</h6>
                      <p className='text-green-600 text-lg'>{ formatMoney(item.unitPrice) }</p>

                      <div className="item-additions">
                        {item.sizes.length > 0 && (
                          <div className="addition-section">
                            <h6 className='addition-title'>Sizes</h6>
                            <div className="ad-list">
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={cart.find(x => x.id == item.id).sizesPrice}
                                name="radio-buttons-group"
                              >
                                {item.sizes.map((size, idx) => (
                                  <FormControlLabel
                                    key={idx}
                                    value={size.price} control={
                                    <Radio
                                      color='success'
                                      onChange={
                                        (e) => sizeChangedHandler({
                                          sizeName: size.size,
                                          sizePrice: e.target.value,
                                          itemID: item.id
                                        })
                                      }
                                    />
                                  }
                                    label={`${size.size} (${formatMoney(size.price)})`}
                                  />
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        )}

                        {item.additions.length > 0 && (
                          <div className="addition-section">

                            <h6 className='addition-title'>Additions</h6>

                            <div className="ad-list">

                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={cart.find(x => x.id == item.id).additionsPrice ?? 0}
                                name="radio-buttons-group"
                              >
                                {item.additions.map((add, idx) => (
                                  <FormControlLabel
                                    key={idx}
                                    value={add.price}
                                    control={
                                      <Radio
                                        onChange={
                                          e => additionChangedHandler({
                                            additionPrice: e.target.value,
                                            additionName: add.name,
                                            itemID: item.id
                                          })
                                        }
                                      />
                                    }
                                    label={`${add.name} (${formatMoney(add.price)})`}
                                  />
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>

                  <div className="right">
                    <h6 className='font-bold text-lg'>{formatMoney((item.unitPrice + +item.additionsPrice + +item.sizesPrice) * item.quantity)}</h6>
                  </div>

                </div>
              ))}

            </div>

          </div>

          <div className="apply-coupon">
            <Snackbar
              ContentProps={{
                sx: { backgroundColor: '#333', color: '#fff' }
              }}
              open={couponMsgStatus}
              autoHideDuration={4000}
              onClose={ () => { setCouponMsgStatus(false); } }
              message={couponMsg}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />

            <h5>Do you have any coupons for discount?</h5>

            <div className="form-group">

              <label htmlFor="couponCode">Coupon</label>

              <input
                type="text"
                className="form-control"
                id="couponCode"
                placeholder="Coupon Code"
                value={coupon}
                disabled={couponInputStatus}
                onChange={ e => setCoupon(c => e.target.value) }
              />

              {coupon && couponBtnStatus == true && (
                <div className="coupon-details">

                  <h6>-{couponObj.value}%</h6>

                </div>
              )}

              <div className="flex gap-1">

                {couponBtnStatus && (
                  <button onClick={removeCouponApplied} className="btn btn-danger">Remove Coupon</button>
                )}
                <button disabled={couponBtnStatus} onClick={searchCouponHandler} className="btn btn-primary">Apply</button>
              </div>

            </div>

          </div>

          <div className="order-money-details">

            <ul>

              <li><span>Total Items</span><span>{totalQuantity}</span></li>

              {coupon && couponObj && (
                <li><span>Applied Coupon</span><span>{couponObj.code} / <b className='green-c'>-{couponObj.value}%</b></span></li>
              )}

              <li>
                <span>Amount</span>
                <span className='green-c'>{formatMoney(sum)}</span>
              </li>

              {coupon && couponObj && (
                <>
                  <li>
                    <span>Coupon Discount value</span>
                    <span className='green-c'>{formatMoney((couponObj.value / 100) * sum)}</span>
                  </li>
                  <li>
                    <span>After Discount</span>
                    <span className='green-c'>{formatMoney((sum - (couponObj.value / 100) * sum))}</span>
                  </li>
                </>
              )}

            </ul>

          </div>

          <div className="submit-order">
            {(currentUser.phone && currentUser.addresses.length !== 0) ? (
              <div className='submit-order-form-container'>
                <button onClick={placeOrderHandler} className='btn btn-warning'>Place Order</button>
              </div>
            ) : (
              <div className="alert alert-warning">
                You may haven't added your phone or your main address.
                <Link href={route('profile.addresses.main-page')}> Add Address </Link>
                <Link href={route('profile.edit')}>Add Phone Number.</Link>
              </div>
            )}
          </div>

          <FloatingButton url={ route('home') } badge={cart.length} />

        </div>

      </Layout>
    )
  }

  return (
    <Layout>

      <Head title='Place order!' />

      <div className="alert alert-info">No Items in the cart!</div>

    </Layout>
  )


}

export default PlaceOrder;
