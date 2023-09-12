
export default function Home() {

  return (
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 overflow-hidden" style={{ maxHeight: '75vh', margin: '0 100px 0 100px'}}>
          <img
            className="img-fluid w-100"
            src="./assets/wts.jpeg"
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">Lorraine & Erik</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              Come to celebrate this happy marriage party with us. Your presence will be our greatest gift.
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}