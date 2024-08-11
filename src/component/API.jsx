import { redirect } from "react-router";
import swal from "sweetalert";

export const discount = {
  member: 10,
  vip: 20,
  svip: 30,
  ssvip: 50,
  lophatmang: 100,
};

export async function loaderHomePage() {
  const res = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );
  const data = await res.json();
  return data;
}

export function format2(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function actionRegister({ request }) {
  const formData = await request.formData();
  const userArr = JSON.parse(localStorage.getItem("userArr", "[]")) || [];

  const user = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
  };

  if (!user.fullName || !user.email || !user.password || !user.phone) {
    swal("Vui lòng điều đủ thông tin", "", "warning");
    return formData;
  } else if (user.password.length < 8) {
    swal(
      "Mật khẩu không hợp lệ",
      "Vui lòng điền mật dài từ 8 ký tự trở lên",
      "error"
    );
    return formData;
  } else if (userArr.findIndex((e) => e.email == user.email) !== -1) {
    await swal("Email đã tồn tại", "Email của bạn đã được đăng ký", "error");
    return redirect("/register");
  } else {
    await swal("Đăng ký thành công", "", "success");
    userArr.push(user);
    localStorage.setItem("userArr", JSON.stringify(userArr));
    return redirect("/login");
  }
}

export function loaderUser() {
  const userArr = JSON.parse(localStorage.getItem("userArr")) || [];
  return userArr;
}
