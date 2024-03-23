import Layout from "@/layouts/Layout";
import Sandwich from "@/components/app/sandwich/Sandwich";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, usePage, Link } from "@inertiajs/react";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";

const Welcome = () => {

  const { sections, user } = usePage().props

  const [cart, updateCart] = useState(JSON.parse(localStorage.getItem('cart')) ?? [])
  const [toastStatus, setToastStatus] = useState(false)
  const [toastMessage, setToastMessage] = useState('New item has been added to my cart!')

  const handleAddItem = (sandwich) => {
    if (cart.find(as => as.id == sandwich.id)) {
      setToastMessage('This item already added!')
    } else {
      updateCart((items) => [
        ...items,
        {
          id: sandwich.id,
          quantity: 1,
          price: sandwich.price,
          name: sandwich.name,
          ingredients: sandwich.ingredients,
          image: sandwich.image,
          unitPrice: sandwich.price,
          sizes: JSON.parse(sandwich.sizes),
          additions: JSON.parse(sandwich.additions),
          additionsPrice: 0,
          sizesPrice: 0,
          choosedSize: 'Small',
          choosedAddition: 0
        }
      ])
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    setToastStatus(status => true)
  }

  const handleRemoveItem = (sandwich) => {
    updateCart((cart) => cart.filter(x => x.id != sandwich.id))
    setToastMessage(`Sandwich ${sandwich.name} has been removed from cart!`)
    setToastStatus(true)
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <Layout>

      <Head title='Order' />

      <div className="food-sections">

        {sections.map(section => (

          <div className="food-section">

            <h1 className='food-section-title'>{section.title}</h1>

            <Snackbar
              ContentProps={{
                sx: { backgroundColor: '#407221', color: '#fff' }
              }}
              open={toastStatus}
              autoHideDuration={4000}
              onClose={ () => { setToastStatus(false); } }
              message={toastMessage}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />

            <div className="food-section-items">
              {section.sandwiches.map(sandwich => (
                <Sandwich sandwich={sandwich} keyD={sandwich.id}>
                  {cart.find(x => x.id === sandwich.id) ? (
                    <Link href='#' onClick={ () => handleRemoveItem(sandwich) } className='checked'><FontAwesomeIcon icon={faCheck} /></Link>
                  ) : (
                    <Link href='#' onClick={ () => handleAddItem(sandwich) } >
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                  )}
                </Sandwich>
              ))}
            </div>
          </div>
        ))}

      </div>

    </Layout>
  )
}

export default Welcome
