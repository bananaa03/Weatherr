import React from "react";
import "./SignUp.css";
import axios from "axios";

function SignUp() {
  const handleSignUp = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const fullName = event.target.elements.fullName.value;
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        email: email,
        fullName: fullName,
        username: username,
        password: password,
      });
      console.log(response.data); // In ra dữ liệu phản hồi từ backend
      // Xử lý dữ liệu phản hồi ở đây (ví dụ: chuyển hướng đến trang đăng nhập)
    } catch (error) {
      console.error(error.response.data); // In ra thông báo lỗi từ backend
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div>
      <div id="signup-rec1">
        <img
          src="https://img.freepik.com/free-psd/3d-icon-weather-conditions-with-rain-sun_23-2150108737.jpg?w=740&t=st=1714836832~exp=1714837432~hmac=0673e5103276c1ccb8e5a27da27d4fc598a68bd962c162491f7624d2ef53c720"
          alt="logo"
          className="logo"
        />
        <div
          className="type-signup"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input type="text" className="email" placeholder="Email" />
          <input type="text" className="fullName" placeholder="Full Name" />
          <input type="text" className="username" defaultValue="Username" />
          <input type="password" className="password" placeholder="Password" />
        </div>
        <button className="signup" onClick={handleSignUp}>
          Sign up
        </button>
      </div>

      <div id="signup-rec2">
        <p className="have-an-acc">Have an account?</p>
        <a href="./login" className="login">
          Log in
        </a>
      </div>
    </div>
  );
}

export default SignUp;
