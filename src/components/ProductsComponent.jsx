
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../redux/action'
import { Link } from 'react-router-dom'
import { stripe } from '../libs/stripe'


export default function ProductsComponent() {

  const [data, setData] = useState([])
  const [filter, setFilter] = useState([])
  const dispatch = useDispatch()

  const addProductToCart = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await stripe.products.list({
          expand: ['data.default_price']
        })

        const productsData = response.data.map((product) => {
          const price = product.default_price

          return {
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.metadata.category,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(price.unit_amount / 100),
            priceId: price.id
          }
        })

        setData(productsData)
        setFilter(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const filterProducts = (category) => {
    const filteredProducts = data.filter((product) =>
      product.category === category
    );
    setFilter(filteredProducts)
  }

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="buttons text-center py-5">
            <button
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => setFilter(data)}
            >
              All
            </button>
            <button
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => filterProducts("men's clothing")}
            >
              Men's Clothing
            </button>
            <button
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => filterProducts("women's clothing")}
            >
              Women's Clothing
            </button>
            <button
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => filterProducts("jewelery")}
            >
              Jewelery
            </button>
            <button
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => filterProducts("electronics")}
            >
              Electronics
            </button>
            <button
              className="btn btn-outline-dark btn-sm m-2"
              onClick={() => filterProducts("camiseta")}
            >
              Camiseta
            </button>
          </div>
        </div>
        <div className="row">
          {filter.map((product) => (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.imageUrl}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">{product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProductToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}