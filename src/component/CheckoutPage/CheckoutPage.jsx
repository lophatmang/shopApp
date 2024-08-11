import { NavLink, useNavigate } from "react-router-dom";
import classes from "./CheckoutPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { format2 } from "../API";
import { cartSlice } from "../Layout/Layout";

function CheckoutPage() {
  const arrCart = useSelector((state) => state.cart.listCart);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();

    await swal(
      "Đặt hàng thành công",
      `Đơn hàng của bạn sẽ sớm được giao`,
      "success"
    );

    dispatch(cartSlice.actions.LoadData([]));
    navigate("/");
  }
  return (
    <div className={classes.checkout}>
      <header>
        <h1>CHECKOUT</h1>
        <div>
          <NavLink to="/">HOME /</NavLink>
          <NavLink to="/cart">CART /</NavLink>
          <span>CHECKOUT</span>
        </div>
      </header>

      {arrCart.length == 0 ? (
        <img src="empty-cart.webp" alt="" />
      ) : (
        <>
          <h2>BILLING DETAILS</h2>
          <div className={classes.checkoutForm}>
            <form onSubmit={onSubmit}>
              <label>
                <span>FULL NAME:</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Your Full Name Here!"
              />
              <label>
                <span>EMAIL:</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email Here!"
              />
              <label>
                <span>PHONE NUMBER:</span>
              </label>
              <input
                name="phone"
                type="number"
                placeholder="Enter Your Phone Number Here!"
              />
              <label>
                <span>ADDRESS:</span>
              </label>
              <input
                name="address"
                type="text"
                placeholder="Enter Your Address Here!"
              />
              <button>Place order</button>
            </form>
            <div className={classes.checkoutTotal}>
              <h2>YOUR ORDER</h2>
              {arrCart.map((e) => (
                <div key={e._id.$oid}>
                  <p>{e.name}</p>
                  <span>
                    {format2(e.price)} vnd x {e.amount}
                  </span>
                </div>
              ))}
              <div style={{ border: "none", marginBottom: "30px" }}>
                <h3>TOTAL</h3>
                <h3>{format2(total)} vnd</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
