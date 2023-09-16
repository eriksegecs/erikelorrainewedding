
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCart, delCart } from '../redux/action'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CartContent from '../components/CartContent'
import EmptyCart from '../components/EmptyCart'


export default function Cart() {

  const state = useSelector((state) => state.handleCart)
  const dispatch = useDispatch()

  const addItem = (product) => {
    dispatch(addCart(product))
  };

  const removeItem = (product) => {
    dispatch(delCart(product))
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? (
          <CartContent state={state} addItem={addItem} removeItem={removeItem} />
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  )
}