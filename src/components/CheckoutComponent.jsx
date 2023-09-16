
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function CheckoutComponent() {

  const cart = useSelector((state) => state.handleCart)

  const EmptyCart = () => {
    return (
      <div className="container">
      </div>
    )
  }

  const ShowCheckout = () => {
    let subtotal = 0
    //let shipping = 30.0
    let totalItems = 0
    
    cart.forEach((item) => {
      subtotal += item.price * item.qty
      totalItems += item.qty
    })

    return (
        <div className="container py-5">
        </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {cart.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  )
}