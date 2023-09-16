
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../redux/action'
import Footer from './../components/Footer'
import Navbar from './../components/Navbar'
import { useParams } from 'react-router-dom'
import { stripe } from './../libs/stripe'
import { Link } from 'react-router-dom'


export default function ProductById( params ) {

  const { id } = useParams()
  const [product, setProduct] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchProductbyId() {
      try {
        const response = await stripe.products.retrieve(id, {
          expand: ['default_price']
        })
          const price = response.default_price
          const productData = {
            id: response.id,
            name: response.name,
            description: response.description,
            imageUrl: response.images,
            category: response.category || null,
            price: new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(price.unit_amount / 100)
          }
          setProduct(productData)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProductbyId()
  }, [id])

  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="container my-5 py-2">
            <div className="row">
              <div className="col-md-6 col-sm-12 py-3">
                <img
                  className="img-fluid"
                  src={product.imageUrl}
                  key={product.id} 
                  alt={product.title}
                  width="400px"
                  height="400px"
                />
          </div>
          <div className="col-md-6 col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.name}</h1>
            <h3 className="display-6  my-4">{product.price}</h3>
            <p className="lead">{product.description}</p>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
        </div>
      </div>
      <Footer />
    </>
  )
}