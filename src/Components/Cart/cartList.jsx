import { useDispatch, useSelector } from "react-redux";
import "./cartList.css";
import { increase, decrease, deleteItem } from "../../store/slices/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let grandTot = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotal(grandTot);
  });

  function grandTotal() {
    let grandTotal = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setTotal(grandTotal);
  }

  function checkout(e) {
    e.preventDefault();
    alert("Your items will be delivered!");
    navigate("/");
  }

  function changeQuantity(type, id) {
    if (type == "increase") {
      id && dispatch(increase(id));
    } else {
      id && dispatch(decrease(id));
    }
  }

  function deleteCartItem(index) {
    dispatch(deleteItem(index));
  }

  return (
    <div>
      {cart.length == 0 ? (
        <div>
          <div className="text-center">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?t=st=1728486914~exp=1728490514~hmac=37edaf4fe30719796b2ef97e6a682cad50db6d73281a2ada6f855e407b167a0b&w=996"
              width="30%"
            />
            <h3>Cart is empty!</h3>

            <Link className="continue" to="/">
              <button className="btn btn-success mt-3">Back to Shopping</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <Link className="continue" to="/">
                  <span className="me-2">
                    <FontAwesomeIcon icon={faLeftLong} />
                  </span>
                  Continue Shopping
                </Link>
              </div>
              <header>
                <div className="row text-center">
                  <div className="col">
                    <h3>Shopping Cart</h3>
                  </div>
                  <div className="col">
                    <h3>{cart.length + " Items"}</h3>
                  </div>
                </div>
              </header>
              <hr />
              <div className="container">
                {cart.map((x, id) => (
                  <div key={id} className="row ">
                    <div className="col">
                      <div className="card mb-2">
                        <div className="row align-items-center p-3 d-flex ">
                          <div className="col-xs-12 col-sm-6  col-md-5 ">
                            <div className="row">
                              <div className="col">
                                <div className="text-center text-secondary">
                                  {x.title}
                                </div>
                                <img
                                  className="card-img-top custom-image"
                                  src={x.image}
                                  alt={x.title}
                                />
                              </div>
                            </div>
                          </div>
                          <div className=" col-xs-12 col-sm-6 col-md-7 d-flex justify-content-between px-sm-3 px-md-3 p-2 p-lg-5">
                            <div>
                              <span
                                className="cart-quantity-ctrl"
                                onClick={() => {
                                  changeQuantity("decrease", x.id),
                                    grandTotal();
                                }}
                              >
                                -
                              </span>
                              <span className="cart-quantity">
                                {x.quantity}
                              </span>
                              <span
                                onClick={() => {
                                  changeQuantity("increase", x.id),
                                    grandTotal();
                                }}
                                className="cart-quantity-ctrl"
                              >
                                +
                              </span>
                            </div>
                            <div className="card-text">
                              {"$" + x.price}
                              <span className="suffix"> *{x.quantity}</span>
                            </div>
                            <span onClick={() => deleteCartItem(x.id)}>
                              <FontAwesomeIcon
                                className="fa-lg"
                                icon={faTrash}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="mt-4 mb-3">
                <h3>Customer Details</h3>
              </div>
              <form onSubmit={(e) => checkout(e)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      min={6}
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="pincode"
                      placeholder="Pincode"
                      min={6}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                      Checkout
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <footer className="sticky-bottom">
            <div className="text-end">
              <h4>GRAND TOTAL: ${total}</h4>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Cart;
