import { useDispatch, useSelector } from "react-redux";
import classes from "./CartPage.module.css";
import { cartSlice } from "../Layout/Layout";
import { discount, format2 } from "../API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function CartPage() {
  const dispatch = useDispatch();
  const arrCart = useSelector((state) => state.cart.listCart);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const total = useSelector((state) => state.cart.total);
  useEffect(() => {
    dispatch(cartSlice.actions.subTotal());
    dispatch(cartSlice.actions.total(0));
  }, [arrCart]);

  async function onSubmit(e) {
    e.preventDefault();
    const coupon = e.target.coupon.value.toLowerCase();

    // dispatch(cartSlice.actions.total(discount[coupon] || 0));
    if (Object.keys(discount).includes(coupon)) {
      dispatch(cartSlice.actions.total(discount[coupon]));
      await swal(
        "Áp mã thành công",
        `Mã ${coupon.toUpperCase()} được giảm ${discount[coupon]}%`,
        "success"
      );
      e.target.coupon.value = "";
    } else {
      dispatch(cartSlice.actions.total(0));
      swal(
        "Mã coupon sai",
        `Mã ${coupon.toUpperCase()} không hợp lệ hoặc đã hết hạn `,
        "error"
      );
    }
  }

  return (
    <div className={classes.cartPage}>
      <header>
        <h1>CART</h1>
        <span>CART</span>
      </header>
      <h2>SHOPPING CART</h2>
      <div className={classes.cart}>
        <div>
          {arrCart.length == 0 ? (
            <img src="empty-cart.webp" alt="" />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {arrCart.map((e) => (
                  <tr key={e._id.$oid}>
                    <th>
                      <img src={e.img1} alt="" />
                    </th>
                    <th>
                      <p>{e.name}</p>
                    </th>
                    <th>
                      <span>{format2(e.price)} VND</span>
                    </th>
                    <th>
                      <button
                        onClick={() =>
                          e.amount == 1
                            ? 1
                            : dispatch(
                                cartSlice.actions.changeAmount({
                                  id: e._id.$oid,
                                  number: -1,
                                })
                              )
                        }
                      >
                        ◀
                      </button>
                      <button style={{ cursor: "initial" }} disabled>
                        {e.amount}
                      </button>
                      <button
                        onClick={() =>
                          dispatch(
                            cartSlice.actions.changeAmount({
                              id: e._id.$oid,
                              number: 1,
                            })
                          )
                        }
                      >
                        ▶
                      </button>
                    </th>
                    <th>
                      <span>{format2(e.price * e.amount)} VND</span>
                    </th>
                    <th>
                      <span
                        onClick={() =>
                          dispatch(cartSlice.actions.deleteCart(e._id.$oid))
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon="fa-regular fa-trash-can" />
                      </span>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className={classes.checkout}>
            <NavLink to="/shop">
              <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
              <span style={{ marginLeft: "10px" }}>Continue shoppping</span>
            </NavLink>
            {arrCart.length !== 0 && (
              <NavLink to="/checkout">
                <span style={{ marginRight: "10px" }}>Proceed to checkout</span>
                <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
              </NavLink>
            )}
          </div>
        </div>
        <form onSubmit={onSubmit} className={classes.total}>
          <h1>CART TOTAL</h1>
          <div>
            <p>SUBTOTAL</p>
            <span>{format2(subTotal)} VND</span>
          </div>
          <div style={{ borderBottom: "1px solid #00000060" }}>
            <p>discount (-{100 - (total / subTotal) * 100}%)</p>
            <span>{format2(total - subTotal)} VND</span>
          </div>
          <div>
            <p>TOTAL</p>
            <p>{format2(total)} VND</p>
          </div>
          <input name="coupon" type="text" placeholder="Email your coupon" />

          <button>
            <FontAwesomeIcon
              style={{ marginRight: "10px" }}
              icon="fa-solid fa-gift"
            />
            Apply coupon
          </button>
        </form>
      </div>
    </div>
  );
}

export default CartPage;
