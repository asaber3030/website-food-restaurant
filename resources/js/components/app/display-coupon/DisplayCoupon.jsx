const DisplayCoupon = ({ coupon }) => {

  return (
    coupon.id == 1 ? 'Not Used' : <span className='yellow-c code-font'>{coupon.code} -{coupon.value}%</span>
  )

}

export default DisplayCoupon
