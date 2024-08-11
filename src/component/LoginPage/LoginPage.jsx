import {
  Navigate,
  NavLink,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import classes from "../RegisterPage/RegisterPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../Layout/Layout";

function LoginPage() {
  const userArr = useLoaderData();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" />;
  }

  async function onSubmit(e) {
    e.preventDefault();

    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (!user.email || !user.password) {
      swal("Vui lòng điều đủ thông tin", "", "warning");
    } else if (
      userArr.findIndex(
        (e) => e.email == user.email && e.password == user.password
      ) !== -1
    ) {
      await swal("đăng nhập thành công", "", "success");
      const curUser = userArr.find((e) => e.email == user.email);

      dispatch(userSlice.actions.onLogin(curUser));

      navigate("/");
    } else {
      await swal("Tài khoản sai", "Email hoặc mật khẩu không đúng", "error");
      e.target.password.value = "";
    }
  }
  return (
    <div className={classes.registerPage}>
      <img src="banner.jpg" alt="" />
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button>SIGN IN</button>
        <span>
          Create an account? <NavLink to="/register">Sign Up</NavLink>
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
