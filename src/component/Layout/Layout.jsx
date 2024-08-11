import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import classes from "./Layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";

const listFooter = [
  [
    "CUSTOMER SERVICES",
    "Help & Contact Us",
    "Returns & Refunds",
    "Online Stores",
    "Terms & Conditions",
  ],
  ["COMPANY", " What We Do", "Available Services", "Latest Posts", "FAQS"],
  ["SOCIAL MEDIA", "Twitter", "Instagram", "Facebook", "Pinterest"],
];

//////////////// STORE /////////////////////////////////////

export const popupSlice = createSlice({
  name: "popupProduct",
  initialState: { show: false, product: {} },
  reducers: {
    showPopup(state, action) {
      state.show = true;
      state.product = action.payload;
    },
    hidePopup(state) {
      state.show = false;
      state.product = {};
    },
  },
});
export const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    onLogin(state, action) {
      state.user = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    onLogout(state) {
      swal("Đăng xuất thành công", "Bạn đã đăng xuất tài khoản", "success");
      state.user = "";
      localStorage.removeItem("currentUser");
    },
  },
});
export const cartSlice = createSlice({
  name: "cart",
  initialState: { listCart: [], subTotal: 0, total: 0 },
  reducers: {
    LoadData(state, action) {
      state.listCart = action.payload;
      /////////////////cập nhật local/////////////////////////////////////////////
      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },
    addCart(state, action) {
      if (
        state.listCart.findIndex(
          (e) => e._id.$oid == action.payload._id.$oid
        ) == -1
      ) {
        state.listCart.push(action.payload);
        /////////////////cập nhật local/////////////////////////////////////////////
        localStorage.setItem("listCart", JSON.stringify(state.listCart));
      } else {
        const index = state.listCart.findIndex(
          (e) => e._id.$oid == action.payload._id.$oid
        );
        state.listCart[index].amount += action.payload.amount;
        /////////////////cập nhật local/////////////////////////////////////////////
        localStorage.setItem("listCart", JSON.stringify(state.listCart));
      }
    },
    deleteCart(state, action) {
      state.listCart = state.listCart.filter(
        (e) => e._id.$oid !== action.payload
      );
      /////////////////cập nhật local/////////////////////////////////////////////
      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },
    changeAmount(state, action) {
      const index = state.listCart.findIndex(
        (e) => e._id.$oid == action.payload.id
      );
      state.listCart[index].amount += action.payload.number;
      /////////////////cập nhật local/////////////////////////////////////////////
      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },
    subTotal(state) {
      state.subTotal = state.listCart.reduce(
        (cur, e) => cur + e.price * e.amount,
        0
      );
      /////////////////cập nhật local/////////////////////////////////////////////
      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },
    total(state, action) {
      state.total = state.subTotal - state.subTotal * (action.payload / 100);
      /////////////////cập nhật local/////////////////////////////////////////////
      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },
  },
});

export const detailSlice = createSlice({
  name: "detail",
  initialState: { amount: 1, showImg: "" },
  reducers: {
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setShowImg(state, action) {
      state.showImg = action.payload;
    },
  },
});

const chatslice = createSlice({
  name: "chat",
  initialState: { messageList: [] },
  reducers: {
    userChat(state, action) {
      state.messageList.push(action.payload);
    },
    SupportAuto(state, action) {
      const message = `Chào bạn ${action.payload}!!`;
      state.messageList.push({ message: message, active: true });
      state.messageList.push({
        message: " chúng tôi có thể hổ trợ gì cho bạn?",
        active: true,
      });
    },
  },
});

const store = configureStore({
  reducer: {
    popUp: popupSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    detail: detailSlice.reducer,
    chat: chatslice.reducer,
  },
});

////////////////// LAYOUT ///////////////////////////////////////////
function Layout(props) {
  return (
    <Provider store={store}>
      <div className={classes.layout}>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </Provider>
  );
}

function Navbar() {
  const user = useSelector(
    (state) => state.user.user && state.user.user.fullName
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const listCart = JSON.parse(localStorage.getItem("listCart")) || [];

  useEffect(() => {
    dispatch(userSlice.actions.onLogin(currentUser));
    dispatch(cartSlice.actions.LoadData(listCart));
  }, []);

  return (
    <div className={classes.navbar}>
      <div className={classes.navlink}>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/shop"
        >
          Shop
        </NavLink>
      </div>
      <h1>BOUTIQUE</h1>
      <div className={classes.navlink}>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/cart"
        >
          <FontAwesomeIcon
            style={{ marginRight: "5px", color: "#00000059" }}
            icon="fa-solid fa-cart-shopping"
          />
          Cart
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to={user ? "/detailUser" : "/login"}
        >
          <FontAwesomeIcon
            style={{ marginRight: "5px", color: "#00000059" }}
            icon="fa-solid fa-user"
          />
          {user ? `${user.split(" ").pop()}▾` : "Login"}
        </NavLink>
        {user && (
          <a
            onClick={() => {
              dispatch(userSlice.actions.onLogout());
              navigate("/");
            }}
          >
            ( logout )
          </a>
        )}
      </div>
    </div>
  );
}

function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  const messageList = useSelector((state) => state.chat.messageList);
  const user = useSelector(
    (state) => state.user.user && state.user.user.fullName
  );
  const dispatch = useDispatch();
  const listRef = useRef();
  const ref = useRef();
  const refImg = useRef();

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") setShowPopup(false);
      },
      false
    );
    document.addEventListener(
      "click",
      (e) => {
        if (
          ref.current &&
          !ref.current.contains(e.target) &&
          !refImg.current.contains(e.target)
        )
          setShowPopup(false);
      },
      false
    );
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const message = {
      message: e.target.message.value,
      active: false,
    };
    await dispatch(chatslice.actions.userChat(message));
    e.target.message.value = "";
    if (messageList.length == 0) {
      dispatch(
        chatslice.actions.SupportAuto(user ? user.split(" ").pop() : "")
      );
    }
    listRef.current.lastElementChild.scrollIntoView();
  }
  return (
    <>
      <div className={classes.footer}>
        <img
          ref={refImg}
          onClick={() => setShowPopup(!showPopup)}
          src="message.webp"
        />
        <div className={classes.layout}>
          {listFooter.map((e, i) => (
            <ul key={i}>
              {e.map((e, i) => (
                <li key={i}>
                  <NavLink to="#">{e}</NavLink>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <form ref={ref} onSubmit={onSubmit}>
        {showPopup && (
          <div className={classes.popup}>
            <div>
              <h4>Customes Support</h4>
              <span>Let's chat app</span>
            </div>
            <ul ref={listRef}>
              {messageList &&
                messageList.map((e, i) => (
                  <li
                    className={e.active ? classes.support : classes.userChat}
                    key={i}
                  >
                    {e.active && (
                      <FontAwesomeIcon
                        style={{ color: "black" }}
                        icon="fa-solid fa-user-tie"
                      />
                    )}
                    {e.message}
                  </li>
                ))}
            </ul>
            <FontAwesomeIcon icon="fa-solid fa-user-tie" />
            <input type="text" name="message" placeholder="Enter message!" />
            <button>
              <FontAwesomeIcon icon="fa-solid fa-paperclip" />
            </button>
            <button>
              <FontAwesomeIcon icon="fa-solid fa-face-smile" />
            </button>
            <button>
              <FontAwesomeIcon
                icon="fa-solid fa-paper-plane"
                style={{ color: "blue" }}
              />
            </button>
          </div>
        )}
      </form>
    </>
  );
}
export default Layout;
