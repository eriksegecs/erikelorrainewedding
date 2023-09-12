
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addCart } from "../redux/action"
import { Footer, Navbar } from "../components"
import { Link, useParams } from "react-router-dom"

export default function Product() {

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const YOUR_STRIPE_SECRET_KEY = '';
  const PRODUCT_ID = id

  function fetchProduct(productId) {
    return fetch(`https://api.stripe.com/v1/products/${productId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${YOUR_STRIPE_SECRET_KEY}`,
      },
    })
    .then(response => response.json());
  }

  function fetchPrice(priceId) {
    return fetch(`https://api.stripe.com/v1/prices/${priceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${YOUR_STRIPE_SECRET_KEY}`,
      },
    })
    .then(response => response.json());
  }

  function formatCurrency(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100);
  }

  useEffect(() => {
    async function getProduct() {
      try {
        const productData = await fetchProduct(PRODUCT_ID);
        const priceData = await fetchPrice(productData.default_price);
        setProduct({
          id: productData.id,
          name: productData.name,
          description: productData.description,
          category: productData.metadata.category,
          imageUrl: productData.images[0],
          price: formatCurrency(priceData.unit_amount),
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    getProduct();
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));

  };

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
  );  
}