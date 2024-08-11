import { Form, NavLink } from "react-router-dom";
import classes from "./RegisterPage.module.css";

function RegisterPage() {
  return (
    <div className={classes.registerPage}>
      <img src="banner.jpg" alt="" />
      <Form method="post">
        <h1>Sign Up</h1>
        <input type="text" name="fullName" placeholder="Full Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="number" name="phone" placeholder="Phone" />
        <button>SIGN UP</button>
        <span>
          Login? <NavLink to="/login">Click</NavLink>
        </span>
      </Form>
    </div>
  );
}

export default RegisterPage;
