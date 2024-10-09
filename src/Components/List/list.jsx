import { useSelector, useDispatch } from "react-redux";
import "./list.css";
import { addDress } from "../../store/slices/cart";

function List() {
  const dresses = useSelector((state) => state.dresses);
  const dispatch = useDispatch();

  function addToCart(details) {
    if (details != {}) {
      const newObject = Object.assign({}, details, { quantity: 1 });
      dispatch(addDress(newObject));
    }
  }
  return (
    <div>
      <div className="row p-3 text-center">
        {dresses.map((x, id) => (
          <div key={id} className=" col-sm-6 mt-2 col-md-4 col-lg-3">
            <div className="card custom-card">
              <img
                className="card-img-top custom-image"
                src={x.image}
                alt={x.title}
              />
              <div className="card-body">
                <h5 className="card-title">{x.title}</h5>
                <p className="card-text">{"$" + x.price}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(x)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
