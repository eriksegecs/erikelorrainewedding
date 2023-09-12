
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addCart } from "../redux/action"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import weddingDress from '../assets/wedding-dress.jpg'
import weddingRings from '../assets/rings.jpeg'
import { Link, useNavigate  } from "react-router-dom"
import { stripe } from '../lib/stripe.ts'


const mockProducts = [
  {
    id: 1,
    title: "Elegante Vestido de Noiva com Renda",
    price: 999.99,
    description: "Um vestido de noiva deslumbrante com detalhes em renda e um design elegante. Perfeito para o seu grande dia.",
    category:"men's clothing",
    image: weddingDress,
    rating: { rate: 4.9, count: 150 }
  },
  {
    id: 2,
    title: "Conjunto de Alianças de Casamento em Ouro Branco",
    price: 799.99,
    description: "Um conjunto de alianças de casamento em ouro branco de alta qualidade. O símbolo perfeito do seu amor eterno.",
    category: "casamento",
    image: weddingRings,
    rating: { rate: 4.8, count: 200 }
  }
]

export default function Products() {

  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    const getProducts = () => {
      setLoading(true)
      setData(mockProducts)
      setFilter(mockProducts)
      setLoading(false)
    }
    getProducts()
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await stripe.products.list({
          expand: ['data.default_price']
        })

        const productsData = response.data.map(product => {
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
            }).format(price.unit_amount / 100)
          }
        })
        console.log(productsData)
        setData(productsData)
        setFilter(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [])

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("electronics")}>Electronics</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("camiseta")}>camiseta</button>
        </div>

        {filter.map((product) => {
          return (
            <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={product.imageUrl}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name}
                  </h5>
                  <p className="card-text">
                    {product.description}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">{product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={"/product/" + product.id}  className="btn btn-dark m-1">
                    Buy Now
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Contribua com a nossa Lua de Mel</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};